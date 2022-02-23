import RNConfig from 'react-native-config';
export const config = {
  BASE_URL: RNConfig.BASE_URL,
  VER_1_0: RNConfig.API_VERSION_1_0,
  VER_1_1: RNConfig.API_VERSION_1_1,
  VER_2_0: RNConfig.API_VERSION_2_0,
  VER_2_1: RNConfig.API_VERSION_2_1,
  IS_UAT: RNConfig.IS_UAT,
  DEFAULT_LANGUAGE_CODE: RNConfig.DEFAULT_LANGUAGE_CODE,
  DEFAULT_LANGUAGE: RNConfig.DEFAULT_LANGUAGE_CODE,
  MS_AUTH: RNConfig.MS_AUTH,
  MS_ADMIN: RNConfig.MS_ADMIN,
  MS_CATEGORY: RNConfig.MS_CATEGORY,
  MS_BUSSINESS: RNConfig.MS_BUSSINESS,
  MS_RM_PROFILE: RNConfig.MS_RM_PROFILE,
  MS_SALESP: RNConfig.MS_SALESP,
  MS_CUSTOMER: RNConfig.MS_CUSTOMER,
  MS_RM_RELATIONSHIP: RNConfig.MS_RM_RELATIONSHIP,
  MS_ACTIVITY: RNConfig.MS_ACTIVITY,
  MS_SALE: RNConfig.MS_SALE,
  MS_WORKFLOW: RNConfig.MS_WORKFLOW,
  MS_CUSTOMER_ORG: RNConfig.MS_CUSTOMER_ORG,
  MS_REPORT: RNConfig.MS_REPORT,
};

export const authenConfig = {
  APPLICATION_URL_ENCODED: 'application/x-www-form-urlencoded',
  URN_IETF: 'urn:ietf:params:oauth:grant-type:uma-ticket',
};

export const keycloakConfig = {
  CLIENT_ID: RNConfig.CLIENT_ID,
  GRANT_TYPE: RNConfig.GRANT_TYPE,
  GRANT_TYPE_REFRESH_TOKEN: RNConfig.REFRESH_TOKEN,
  CLIENT_SECRET: RNConfig.CLIENT_SECRET,
  AUDIENCE: RNConfig.AUDIENCE,
};

export const sessionConfig = {
  PERCENTAGE: 80,
  TIME_GET_TOKEN: 240,
  TIME_OUT: 300,
};

export const apiServiceConfig = {
  TIME_OUT: 15 * 1000,
  NUMBER_RETRY_REFRESH_TOKEN: 3,
};

export const apiGeeConfig = {
  username: RNConfig.APIGEE_USERNAME,
  password: RNConfig.APIGEE_PASSWORD,
};

export const errorMessageConfig = (error: any) => {
  switch (error) {
    case 'CLIENT_ERROR':
      return 'CLIENT_ERROR';
    case 'SERVER_ERROR':
      return 'SERVER_ERROR';
    case 'TIMEOUT_ERROR':
      return 'TIMEOUT_ERROR';
    case 'CONNECTION_ERROR':
      return 'CONNECTION_ERROR';
    case 'NETWORK_ERROR':
      return 'NETWORK_ERROR';
    case 'CANCEL_ERROR':
      return 'CANCEL_ERROR';
    default:
      return null;
  }
};

export const apiServiceErrorConfig = (error: any) => {
  switch (error) {
    case 'CLIENT_ERROR':
      return 'Có lỗi trong quá trình xử lý, vui lòng thử lại!';
    case 'SERVER_ERROR':
      return 'Có lỗi trong quá trình xử lý phía server, vui lòng thử lại sau!';
    case 'TIMEOUT_ERROR':
      return 'Hết thời gian chờ kết nối đến Server, vui lòng thử lại!';
    case 'CONNECTION_ERROR':
      return 'Có lỗi trong quá trình xử lý, vui lòng thử lại!';
    case 'NETWORK_ERROR':
      return 'Có lỗi trong quá trình xử lý phía server, vui lòng thử lại sau!';
    case 'CANCEL_ERROR':
      return 'Có lỗi trong quá trình xử lý, vui lòng thử lại!';
    default:
      return 'Có lỗi trong quá trình xử lý, vui lòng thử lại!';
  }
};

const serviceErrorConfig = (error: any) => {
  switch (error) {
    case 400:
      return 'Có lỗi trong quá trình xử lý, vui lòng thử lại!';
    case 401:
      return 'Thông tin xác thực người dùng không đúng, vui lòng thử lại!';
    case 403:
      return 'Không có quyền truy cập thông tin, vui lòng kiểm tra lại!';
    case 404:
      return 'Không tìm thấy tài nguyên, vui lòng thử lại!';
    case 408:
      return 'Hết thời gian chờ kết nối đến Server, vui lòng thử lại!';
    case 500:
      return 'Có lỗi trong quá trình xử lý phía server, vui lòng thử lại sau!';
    case 501:
      return 'Có lỗi trong quá trình xử lý, vui lòng thử lại!';
    case 502:
      return 'Có lỗi trong quá trình xử lý, vui lòng thử lại!';
    case 503:
      return 'Có lỗi trong quá trình xử lý, vui lòng thử lại!';
    case 504:
      return 'Có lỗi trong quá trình xử lý, vui lòng thử lại!';
    case 'NO_NETWORK':
      return 'Không có kết nối mạng, vui lòng kiểm tra đường truyền';
    default:
      return 'Có lỗi trong quá trình xử lý, vui lòng thử lại!';
  }
};
