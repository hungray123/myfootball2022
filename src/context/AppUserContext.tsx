import React, { useCallback, useEffect, useMemo, useState } from 'react';
import RNDeviceInfo from 'react-native-device-info';
import { useInterval, useEffectOnce, useAppSelector } from 'app/hooks';
import { createAppError, handleException, isNullOrEmpty, translate } from 'utils';
import { useDialog } from 'components/dialog/AppDialogContext';
import { getItem, setItem } from 'utils/AsyncStorageHelper';
import { apiClient } from 'api/APIClient';
import { config, sessionConfig } from 'constants/config';
import { loginAPI, logoutApi } from 'features/login/loginApi';
import { AppError, BasicUserInfo, DetailUserInfo, DeviceInfo, PrevUser } from 'app/type';
import { appConstants } from 'constants/const';
import { useTheme } from 'react-native-paper';
import { AppViewWithFullScreenLoading } from 'components';
import { StyleSheet } from 'react-native';
import { useCommon } from './AppCommonContext';
import { useDispatch } from 'react-redux';
import { hideDialog } from 'components/dialog/DialogSlice';

export interface IUserLogin {
  username: string;
  password: string;
}
export interface IUserContext {
  onLogin: (user: IUserLogin) => Promise<boolean>;
  resetLocalTimeOut: () => void;
  onLogout: () => Promise<boolean>;
  resetTimeOut: () => void;
  getDetailUserLoginInfo: () => DetailUserInfo | undefined;
  getBasiclUserLoginInfo: () => BasicUserInfo | undefined;
  changeUserLogin: () => void;
  getPrevUserLogin: () => PrevUser | undefined;
}

const AppUserContext = React.createContext<IUserContext>({} as IUserContext);

const AppUserProvider: React.FC = props => {
  const { showDialog } = useDialog();
  const { getCommon, getRsId, getIndustry, getBlocks } = useCommon();
  const isShowDialog = useAppSelector(state => state.dialogState.isShowDialog);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [basicUserInfo, setBasicUserInfo] = useState<BasicUserInfo>();
  const [detailUserInfo, setDetailUserInfo] = useState<DetailUserInfo>();
  const [localTimeOutCount, setLocalTimeOutCount] = useState<number>(0);
  const [serverTimeOutCount, setServerTimeOutCount] = useState<number>(0);
  const [prevUser, setPrevUser] = useState<PrevUser>();
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    deviceName: '',
    deviceId: '',
    deviceToken: '',
    manufacturer: '',
    appCode: '',
    brand: '',
    systemName: '',
    systemVersion: '',
    type: '',
    userAgent: '',
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffectOnce(() => {
    //Lấy thông tin người đăng nhập lần trước
    _getPrevUserFromStorage()
      .then(() => {})
      .catch(err => {
        handleException(err);
      });
    //Lấy thông tin Device
    _getDeviceInfo()
      .then(() => {})
      .catch(err => {
        handleException(err);
      });
  });

  const localSessionExpired = (): boolean => {
    if (localTimeOutCount < sessionConfig.TIME_OUT) {
      return false;
    }
    return true;
  };
  const serverSessionExpired = (): boolean => {
    if (serverTimeOutCount < sessionConfig.TIME_GET_TOKEN) {
      return false;
    }
    return true;
  };

  const handleLogoutWhenLocalSessionExpired = useCallback(() => {
    if (!loading) {
      setLoading(true);
      _onLogout()
        .then(() => {
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          handleException(error);
          //Chỗ này không show lỗi mà bắt buộc phải logout
          setBasicUserInfo(undefined);
          setDetailUserInfo(undefined);
        });
    }
  }, [loading]);

  /* Xử lý local timeout */
  useInterval(
    () => {
      setLocalTimeOutCount(localTimeOutCount + 1);
      if (localTimeOutCount === sessionConfig.TIME_OUT - 1) {
        _actionTimeOut();
      }
    },
    detailUserInfo && !localSessionExpired() ? 1 : undefined,
  );

  const _actionTimeOut = useCallback(() => {
    showDialog({
      dialogType: 'info',
      title: translate('notification'),
      message: translate('local_timeout'),
      description: '',
      buttonAccept: {
        onPress: handleLogoutWhenLocalSessionExpired,
        label: translate('close'),
        color: theme.colors.primaryBlue,
      },
    });
  }, [handleLogoutWhenLocalSessionExpired, showDialog, theme.colors.primaryBlue]);

  useEffect(() => {
    if (isShowDialog) {
      _actionTimeOut();
      dispatch(hideDialog());
    }
  }, [_actionTimeOut, dispatch, isShowDialog]);

  /* Xử lý server timeout */
  useInterval(
    () => {
      setServerTimeOutCount(serverTimeOutCount + 1);
      if (serverTimeOutCount === sessionConfig.TIME_GET_TOKEN - 1) {
        setServerTimeOutCount(0);
      }
    },
    detailUserInfo && !serverSessionExpired() ? 1 : undefined,
  );

  const _getPrevUserFromStorage = async () => {
    try {
      const prevUserNameFromAsyncStorage = await getItem(appConstants.ASYNC_STORAGE_KEY.PREV_USER_NAME);
      if (prevUserNameFromAsyncStorage) {
        setPrevUser(JSON.parse(prevUserNameFromAsyncStorage) as PrevUser);
      } else {
        setPrevUser(undefined);
      }
    } catch (err) {
      handleException(err);
      setPrevUser(undefined);
    }
  };

  const _savePrevUserToStorage = async (userName: string, fullName: string, gender?: string) => {
    const prevUserSave: PrevUser = {
      userName,
      fullName,
      gender,
    };
    setPrevUser(prevUserSave);
    try {
      await setItem(appConstants.ASYNC_STORAGE_KEY.PREV_USER_NAME, JSON.stringify(prevUserSave));
    } catch (err) {
      handleException(err);
    }
  };

  const _getDeviceInfo = async () => {
    const deviceName = RNDeviceInfo.getDeviceNameSync();
    const manufacturer = RNDeviceInfo.getManufacturerSync();
    let deviceToken = '';
    const appCode = appConstants.DEVICE_CONFIG.APP_CODE;
    const brand = RNDeviceInfo.getBrand();
    const deviceId = RNDeviceInfo.getUniqueId();
    const systemName = RNDeviceInfo.getSystemName();
    const systemVersion = RNDeviceInfo.getSystemVersion();
    const type = RNDeviceInfo.getTypeSync();
    const userAgent = RNDeviceInfo.getUserAgentSync();

    setDeviceInfo({
      deviceName,
      deviceId,
      deviceToken,
      manufacturer,
      appCode,
      brand,
      systemName,
      systemVersion,
      type,
      userAgent,
    });
  };

  const _validateUserNameAndPassword = (userName: string, password: string): AppError | undefined => {
    if (isNullOrEmpty(userName)) {
      return createAppError(
        'APP_ERROR',
        new Error(translate('username_invalid')),
        appConstants.APP_CODE.INVALID_ERROR_CODE,
      );
    }
    if (isNullOrEmpty(password)) {
      return createAppError(
        'APP_ERROR',
        new Error(translate('password_invalid')),
        appConstants.APP_CODE.INVALID_ERROR_CODE,
      );
    }
    return undefined;
  };

  const _loginWithUserNameAndPassword = async (userName: string, password: string) => {
    const validatedError: AppError | undefined = _validateUserNameAndPassword(userName, password);
    if (!validatedError) {
      try {
        //1. Call API lấy token
        await loginAPI.getToken(userName, password);
        apiClient.startActionRefreshToken();

        //2. Lấy thông tin cơ bản của User
        const getBasicUserInfo = await loginAPI.getBasicUserInfo(userName, 1);

        //3. Lấy thông tin chi tiết của User
        const { hrsCode, fullName, gender } = getBasicUserInfo;
        const getDetailUserInfo = await loginAPI.getDetailUserInfoByHrisCode(hrsCode);

        //4. Lấy khối của User Đăng nhập
        await Promise.all([loginAPI.getBlockByRm(), getCommon(), getIndustry(), getRsId(), getBlocks()]);

        //5. Check Active thiết bị
        if (config.IS_UAT === '0') {
          await loginAPI.checkDeviceActive(deviceInfo);
        }

        //6. Lưu thông tin User Info
        setBasicUserInfo(getBasicUserInfo);
        setDetailUserInfo(getDetailUserInfo);

        //7. Run localSessionExpired
        setLocalTimeOutCount(0);
        setServerTimeOutCount(0);
        await _savePrevUserToStorage(userName, fullName, gender);
      } catch (err) {
        throw err;
      }
    } else {
      apiClient.stopActionRefreshToken();
      throw validatedError;
    }
  };

  /* Xử lý Logout */
  const _onLogout = async () => {
    apiClient.stopActionRefreshToken();
    try {
      await logoutApi.revokeToken();
      setBasicUserInfo(undefined);
      setDetailUserInfo(undefined);
    } catch (err) {
      throw err;
    }
  };

  /* Xử lý Login */
  const _onLogin = (userLogin: IUserLogin): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      _loginWithUserNameAndPassword(userLogin.username, userLogin.password)
        .then(() => {
          resolve(true);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  const userContext = useMemo<IUserContext>(() => {
    return {
      onLogin: _onLogin,
      onLogout: _onLogout,
      resetTimeOut: () => {
        setLocalTimeOutCount(0);
      },
      getBasiclUserLoginInfo: () => {
        return basicUserInfo;
      },
      getDetailUserLoginInfo: () => {
        return detailUserInfo;
      },
      changeUserLogin: () => {
        setPrevUser(undefined);
      },
      getPrevUserLogin: (): PrevUser | undefined => {
        return prevUser;
      },
    };
  }, [basicUserInfo, detailUserInfo, prevUser, deviceInfo]);

  return (
    <AppViewWithFullScreenLoading style={styles.container} isLoading={loading} textLoading={translate('logging_out')}>
      <AppUserContext.Provider value={userContext} {...props} />
    </AppViewWithFullScreenLoading>
  );
};

const useAppUser = () => {
  const context = React.useContext<IUserContext>(AppUserContext);
  return context;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export { AppUserProvider, AppUserContext, useAppUser };
