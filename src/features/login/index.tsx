import React, { useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, ImageSourcePropType } from 'react-native';
import { useAppUser } from 'context/AppUserContext';
import { useDialog } from 'components/dialog/AppDialogContext';
import { translate } from 'utils';
import { AppError, PrevUser } from 'app/type';
import { AppImage, AppView, AppViewWithFullScreenLoading } from 'components';
import LoginDialog from 'features/login/components/LoginDialog';
import { appConstants } from 'constants/const';
import image from 'assets/icons';
import styles from 'features/login/style';
import { useTheme } from 'react-native-paper';

export interface LoginProps {
  prevUser?: PrevUser;
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
  onLogin: (userName: string, password: string) => void;
}

const Login: React.FC = () => {
  const { showDialog } = useDialog();
  const { getPrevUserLogin, onLogin } = useAppUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const prevUserLogin = getPrevUserLogin();
  const theme = useTheme();

  const _logger = () => {
    setLoading(false);
  };

  const _onLogin = (userName: string, password: string) => {
    Keyboard.dismiss();
    setLoading(true);

    onLogin({ username: userName, password: password })
      .then(() => {})
      .catch(error => {
        setLoading(false);
        const status = (error as AppError).code;
        const message = (error as AppError).message as string;
        if (status === appConstants.APP_CODE.INVALID_ERROR_CODE) {
          setErrorMessage(message);
        } else if (status === appConstants.API_STATUS_CODE.BAD_REQUEST) {
          setErrorMessage(translate('account_disable'));
        } else if (status === appConstants.API_STATUS_CODE.UNAUTHORIZED) {
          setErrorMessage(translate('invalid_mail_or_password'));
        } else if (status === appConstants.API_STATUS_CODE.FORBIDDEN) {
          setErrorMessage(translate('forbidden_error'));
        } else if (status === appConstants.API_STATUS_CODE.REQUEST_TIMEOUT) {
          setErrorMessage(translate('request_time_out'));
        } else if (
          status === appConstants.API_STATUS_CODE.NOT_IMPLEMENTED ||
          status === appConstants.API_STATUS_CODE.BAD_GATEWAY ||
          status === appConstants.API_STATUS_CODE.SERVICE_UNAVAILABLE ||
          status === appConstants.API_STATUS_CODE.GATEWAY_TIMEOUT
        ) {
          setErrorMessage(translate('error_call_api'));
        } else if (status === appConstants.APP_CODE.PERMISSION_ERROR_CODE) {
          showDialog({
            dialogType: 'info',
            title: translate('notification'),
            message: message,
            description: 'description',
            buttonCancel: { onPress: () => {}, label: translate('close'), color: theme.colors.clearBlue },
          });
        } else {
          showDialog({
            dialogType: 'warning',
            title: translate('notification'),
            message: message,
            description: 'description',
            buttonCancel: { onPress: () => {}, label: translate('close'), color: theme.colors.clearBlue },
          });
        }
      });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        _logger();
        Keyboard.dismiss();
      }}>
      <AppViewWithFullScreenLoading style={styles.container} isLoading={loading} textLoading={translate('loading')}>
        <AppView style={styles.container}>
          <AppImage style={styles.backgroundImage} source={image.BG_LOGIN as ImageSourcePropType} />
          <AppView style={styles.content}>
            <AppView style={styles.leftContent}>
              <LoginDialog
                prevUser={prevUserLogin}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                onLogin={_onLogin}
              />
            </AppView>
            <AppView style={styles.rightContent}>
              <AppView style={styles.logoCrmSmart}>
                <AppImage style={styles.imgCrmSmart} source={image.IC_CRM_SMART as ImageSourcePropType} />
              </AppView>
              <AppView style={styles.logoCrmOverlay}>
                <AppImage style={styles.imgCrmOverlay} source={image.IC_CRM_OVERLAY as ImageSourcePropType} />
              </AppView>
            </AppView>
          </AppView>
        </AppView>
      </AppViewWithFullScreenLoading>
    </TouchableWithoutFeedback>
  );
};

export default Login;
