import { AppResponse } from 'app/type';
import { translate } from 'utils';

export type ResponseType = 'SUCCESS' | 'UNKNOW_ERROR' | 'USER_NAME_INVALID' | 'PASSWORD_INVALID';
export type MapResponseType = { [T: string]: AppResponse };

const createAppResponse = (success: boolean, code: number, message: string): AppResponse => {
  return {
    success,
    code,
    message,
  };
};

export const APP_MAP_RESPONSE_TYPE: MapResponseType = {
  SUCCESS: createAppResponse(true, 200, translate('success')),
};
