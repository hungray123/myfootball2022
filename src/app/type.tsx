import { RootStackParamList } from 'navigation/RootStackNavigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { AppTabParamList } from 'navigation/AppTabNavigation';
import { Dispatch, SetStateAction } from 'react';

export type DashBoardScreenProps = CompositeScreenProps<
  BottomTabScreenProps<AppTabParamList, 'Dashboard'>,
  NativeStackScreenProps<RootStackParamList>
>;
export type DashboardRouteProp = DashBoardScreenProps['route'];
export type DashboardNavigationProp = DashBoardScreenProps['navigation'];

export type LoginScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type LoginRouteProp = LoginScreenNavigationProp['route'];
export type LoginNavigationProp = LoginScreenNavigationProp['navigation'];

export type DialogScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'Dialog'>;
export type DialogRouteProp = LoginScreenNavigationProp['route'];
export type DialogNavigationProp = LoginScreenNavigationProp['navigation'];

export type CacheCommon = { [key: string]: Array<CommonItem> };
export type DialogType = 'error' | 'warning' | 'info' | 'loading';
export type IndustryResponse = Array<IndustryItem>;
export type ErrorType = 'APP_ERROR' | 'API_ERROR';

export interface IAppPreference {
  themeName: string;
  languageCode: string;
}

export interface IAppPreferenceContext {
  themeName: string;
  changeTheme: (name: string) => void;
  languageCode: string;
  changeLanguageCode: (languageCode: string) => void;
}

export interface CommonItem {
  id?: string;
  code: string;
  name: string;
  value?: string;
  description?: string;
  commonCategoryCode?: string;
  isActive?: boolean;
  orderNum?: number;
  isDefault?: boolean;
  createdDate?: string;
  createdBy?: string;
}

export interface ButtonDialog {
  label: string;
  color?: string;
  onPress?: () => unknown;
}

export interface IDialog {
  dialogType: DialogType;
  title: string;
  message: string;
  description?: string;
  buttonCancel?: ButtonDialog;
  buttonAccept?: ButtonDialog;
}

export type AppDialogProps = {
  dialog: IDialog;
};

export interface RsIdItem {
  scopes: string[];
  rsid: string;
  rsname: string;
}

export interface IndustryItem {
  key: string;
  value: string;
}

export interface BlocksRecord {
  id: string;
  code: string;
  name: string;
  isActive: string;
  customerType: string;
  createdDate: string;
  updatedDate: string;
  updatedBy: string;
}

export interface AppResponse {
  success: boolean;
  code: number;
  message?: string;
}

export interface AppError {
  code: number;
  message?: string;
  detail?: string;
}

export interface BasicUserInfo {
  id: string;
  code: string;
  hrsCode: string;
  username: string;
  fullName: string;
  branch: string;
  phoneNumber: string;
  email: string;
  createdDate: string;
  branchName: string;
  gender: string;
  unLock: true;
  active: true;
  blockRmManager: Array<string>;
}

export interface HrisEmployee {
  employeeId: string;
  userName: string;
  lastName: string;
  firstName: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  jointDate: string;
  startPosDate: string;
  level1Manager: string;
  level2Manager: string;
  title: string;
  position: string;
  level1: string;
  level2: string;
  mobile: string;
  email: string;
  homePhone: string;
  officePhone: string;
  extNumber: string;
  fax: string;
  workaddress: string;
  isRm: string;
  isActive: string;
  org: string;
  levelrm: string;
  accountType: string;
}
export interface T24Employee {
  branchLevel1: string;
  branchLevel2: string;
  branchCode: string;
  khoi: string;
  branchNameLevel1: string;
  branchNameLevel2: string;
  branchName: string;
}

export interface DetailUserInfo {
  hrisEmployee: HrisEmployee;
  t24Employee: T24Employee;
  crmIsActive: string;
  createDate: string;
}

export interface PrevUser {
  userName: string;
  fullName: string;
  gender?: string;
}

export interface DetailUserInfo {
  hrisEmployee: HrisEmployee;
  t24Employee: T24Employee;
  crmIsActive: string;
  createDate: string;
}

export interface DeviceInfo {
  deviceName: string;
  deviceToken: string;
  appCode: string;
  brand: string;
  deviceId: string;
  manufacturer: string;
  systemName: string;
  systemVersion: string;
  type: string;
  userAgent: string;
}

export interface GetTokenParams {
  username: string;
  password: string;
  grant_type: string;
  client_secret: string;
  client_id: string;
}
export interface GetTokenResponse {
  access_token: string;
  refresh_token: string;
  refresh_token_expires_in: string;
  expires_in: number;
  scope: string;
  issued_at: string;
  token_type: string;
}

export interface LogoutParams {
  grant_type?: string;
  refresh_token: string;
  client_secret: string;
  client_id: string;
}

export interface CommonItem {
  id?: string;
  code: string;
  name: string;
  value?: string;
  description?: string;
  commonCategoryCode?: string;
  isActive?: boolean;
  orderNum?: number;
  isDefault?: boolean;
  createdDate?: string;
  createdBy?: string;
}

export interface CommonResponse {
  content: Array<CommonItem>;
}

export interface CheckDeviceActiveResponse {
  status: number;
  errorCode: string;
  error: string;
  isActive: boolean;
  description: string;
}

export type DashboardChartResponse = {
  dashBoardStatusDTO: BaseChartResponse;
  dashboardClassificationDTO: BaseChartResponse;
  dashBoardSegmentDTO: BaseChartResponse;
};

export interface BaseChartResponse {
  code: string;
  title: string;
  keyConfig: string;
}

export type BaseChartKeyValue = Array<ChartKeyValue>;

export interface ChartKeyValue {
  label: string;
  value: number;
  color: string;
}
export interface MapCommonItemChart {
  id?: string;
  code: string;
  name: string;
  value?: string;
  description?: string;
  commonCategoryCode?: string;
  isActive?: boolean;
  orderNum?: number;
  isDefault?: boolean;
  createdDate?: string;
  createdBy?: string;
  kh: number;
}

export interface CalendarItem {
  description: string;
  end: string;
  id: string;
  level: string;
  location: string;
  name: string;
  start: string;
  status: string;
  type: string;
  updatedDate: string;
}

export interface TodoEvent {
  assign: string[] | undefined;
  contents: string[];
  createdAt: string | Date;
  description: string;
  dueDate: string | Date;
  followUp: string[];
  level: string;
  status: string;
  subject: string;
  refStatus: string;
  id: string;
  updatedAt?: string | Date;
  type?: string;
}

export interface TodoItem {
  id: string;
  status: string;
  dueDate: string;
  subject: string;
  refStatus: string;
  type: string;
  createdBy: string;
  level: string;
  createdAt: string;
  assignees: string[];
  description: string;
  updatedAt: string;
}

export type CalendarItemByIds = { [key: string]: CalendarItem };

export interface TodoListResponse {
  content: Array<TodoItem>;
  error: string;
}

export interface CalendarEventResponse {
  status: number;
  errorCode: string;
  error: string;
}

export interface TodoEventResponse {
  status: number;
  errorCode: string;
  error: string;
}

export interface IEventDialogButton {
  validateTime: (date: Date | string) => boolean;
  validateTitle: (value: string) => boolean;
  validateDesc?: (value: string) => boolean;
  clearError: () => void;
}

export interface IEventPickerInput {
  validateTime: (date: Date) => void;
  setIsStartEdited: (value: boolean) => void;
  setDateError: Dispatch<SetStateAction<{ isError: boolean; desc: string }>>;
  disableCondition?: boolean;
  dateError: { isError: boolean; desc: string };
}

export interface IEventDialogDescriptionInput {
  disableCondition?: boolean;
  validateDesc?: (desc: string) => boolean;
  descError?: { isError: boolean; desc: string };
  setDescError?: Dispatch<SetStateAction<{ isError: boolean; desc: string }>>;
}

export interface IEventDialogTitleInput {
  disableCondition?: boolean;
  validateTitle: (value: string) => void;
  titleError: {
    isError: boolean;
    desc: string;
  };
  setTitleError: Dispatch<SetStateAction<{ isError: boolean; desc: string }>>;
}

export interface IEventDialogHeader {
  disableCondition?: boolean;
}
