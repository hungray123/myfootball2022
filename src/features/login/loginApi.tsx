import { createAppError, getBasicAuthenApigee, urlEncodedBody } from 'utils/Utils';
import { keycloakConfig } from 'constants/config';
import { authenConfig } from 'constants/config';
import { apiClient, AppApiRequestConfig } from 'api/APIClient';
import { translate } from 'utils';
import { BlocksRecord } from 'app/type';
import API_METHOD from 'constants/api';
import { appConstants } from 'constants/const';
import _ from 'lodash';

import {
  BasicUserInfo,
  CheckDeviceActiveResponse,
  CommonResponse,
  DetailUserInfo,
  DeviceInfo,
  GetTokenParams,
  GetTokenResponse,
  IndustryResponse,
  LogoutParams,
  RsIdItem,
} from 'app/type';

/* Xử lý Login */
export const loginAPI = {
  getToken(userName: string, password: string): Promise<GetTokenResponse> {
    const returnPromise = new Promise<GetTokenResponse>((resolve, reject) => {
      // the resolve / reject functions control the fate of the promise
      const params: GetTokenParams = {
        username: userName,
        password: password,
        client_id: keycloakConfig.CLIENT_ID,
        client_secret: keycloakConfig.CLIENT_SECRET,
        grant_type: keycloakConfig.GRANT_TYPE,
      };
      const basicAuthenApiGee = getBasicAuthenApigee();
      const encodedBody = urlEncodedBody(params);
      const apiConfig: AppApiRequestConfig = {
        headers: {
          'Content-Type': authenConfig.APPLICATION_URL_ENCODED,
          Authorization: `Basic ${basicAuthenApiGee}`,
        },
      };
      apiClient
        .post<GetTokenResponse>(API_METHOD.MS_AUTH.LOGIN, encodedBody, apiConfig)
        .then(response => {
          const { access_token, token_type, refresh_token, expires_in } = response;
          apiClient.setAuthorization(access_token, token_type, expires_in, refresh_token);
          resolve(response);
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
    return returnPromise;
  },
  checkDeviceActive(deviceInfo: DeviceInfo): Promise<CheckDeviceActiveResponse> {
    return new Promise<CheckDeviceActiveResponse>((resolve, reject) => {
      // the resolve / reject functions control the fate of the promise
      apiClient
        .post<CheckDeviceActiveResponse>(API_METHOD.MS_CATEGORY.CHECK_AUTHEN_DEVICE, deviceInfo)
        .then(response => {
          //Kiểm tra thông tin active thiết bị ở đây luôn.
          const { isActive } = response;
          if (isActive) {
            //đã được active
            resolve(response);
          } else {
            //Không được active
            reject(createAppError('API_ERROR', new Error(translate('device_not_active'))));
          }
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  },
  getBasicUserInfo(userName: string, externalData: number): Promise<BasicUserInfo> {
    return new Promise<BasicUserInfo>((resolve, reject) => {
      // the resolve / reject functions control the fate of the promise
      const params = {
        externalData,
      };
      apiClient
        .get<BasicUserInfo>(API_METHOD.MS_RM_PROFILE.BASIC_USER_INFO + userName, params)
        .then(response => {
          //Kiểm tra thông tin mã HRisCode của nhân viên
          //Nếu không có thì thông báo lỗi
          const { hrsCode } = response;
          if (hrsCode) {
            resolve(response);
          } else {
            reject(createAppError('API_ERROR', new Error(translate('hris_code_notfound'))));
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getDetailUserInfoByHrisCode(hrisCode: string): Promise<DetailUserInfo> {
    return new Promise<DetailUserInfo>((resolve, reject) => {
      apiClient
        .get<DetailUserInfo>(API_METHOD.MS_RM_PROFILE.DETAIL_USER_INFO + hrisCode)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getBlockByRm() {
    return new Promise((resolve, reject) => {
      apiClient
        .get(API_METHOD.MS_CATEGORY.BLOCK_USER_INFO)
        .then(response => {
          const data = response as [];
          const isSme = _.some(data, [appConstants.OTHERS.CODE, appConstants.BLOCK.SME]);
          const isIndiv = _.some(data, [appConstants.OTHERS.CODE, appConstants.BLOCK.INDIV]);
          if (isSme) {
            resolve(response);
          } else if (isIndiv && !isSme) {
            reject(createAppError('APP_ERROR', new Error(translate('transfer_app'))));
          } else {
            reject(createAppError('APP_ERROR', new Error(translate('not_permission_app'))));
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  refreshToken(refreshToken: string): Promise<GetTokenResponse> {
    return new Promise<GetTokenResponse>((resolve, reject) => {
      const body = {
        refresh_token: refreshToken,
        grant_type: keycloakConfig.GRANT_TYPE,
        client_id: keycloakConfig.CLIENT_ID,
      };
      const encodedBody = urlEncodedBody(body);
      const apiConfig: AppApiRequestConfig = {
        headers: {
          'Content-Type': authenConfig.APPLICATION_URL_ENCODED,
        },
      };
      apiClient
        .post<GetTokenResponse>(API_METHOD.MS_AUTH.REFRESH_TOKEN, encodedBody, apiConfig)
        .then(response => {
          resolve(response);
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  },

  getCommon(size: number, value?: string, commonCategoryCode?: string): Promise<CommonResponse> {
    return new Promise<CommonResponse>((resolve, reject) => {
      const params = {
        size,
        value,
        commonCategoryCode,
      };
      apiClient
        .get<CommonResponse>(API_METHOD.MS_CATEGORY.COMMON, params)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getIndustry(): Promise<IndustryResponse> {
    return new Promise<IndustryResponse>((resolve, reject) => {
      apiClient
        .get<IndustryResponse>(API_METHOD.MS_CATEGORY.INDUSTRY)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getBlocks(): Promise<Array<BlocksRecord>> {
    return new Promise<Array<BlocksRecord>>((resolve, reject) => {
      const request = {
        page: 0,
        size: 20,
      };
      apiClient
        .get<Array<BlocksRecord>>(API_METHOD.MS_CATEGORY.BLOCKS, request)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  userPermission(): Promise<Array<RsIdItem>> {
    return new Promise<Array<RsIdItem>>((resolve, reject) => {
      const params = {
        audience: keycloakConfig.AUDIENCE,
        response_mode: 'permissions',
        grant_type: 'urn:ietf:params:oauth:grant-type:uma-ticket',
      };
      const apiConfig: AppApiRequestConfig = {
        headers: {
          'Content-Type': authenConfig.APPLICATION_URL_ENCODED,
        },
      };
      apiClient
        .post<Array<RsIdItem>>(API_METHOD.MS_AUTH.USER_PERMISSION, urlEncodedBody(params), apiConfig)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
};

/* Xử lý Logout */
export const logoutApi = {
  revokeToken() {
    const returnPromise = new Promise((resolve, reject) => {
      apiClient.refresh_token;
      const body: LogoutParams = {
        refresh_token: apiClient.refresh_token,
        client_secret: keycloakConfig.CLIENT_SECRET,
        client_id: keycloakConfig.CLIENT_ID,
      };
      const basicAuthenApiGee = getBasicAuthenApigee();
      const encodedBody = urlEncodedBody(body);
      const apiConfig: AppApiRequestConfig = {
        headers: {
          'Content-Type': authenConfig.APPLICATION_URL_ENCODED,
          Authorization: `Basic ${basicAuthenApiGee}`,
        },
      };
      apiClient
        .post(API_METHOD.MS_AUTH.LOGOUT, encodedBody, apiConfig)
        .then(response => {
          resolve(response);
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
    return returnPromise;
  },
};
