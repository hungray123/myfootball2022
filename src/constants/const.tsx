import image from 'assets/icons';
import { Dimensions, ImageSourcePropType } from 'react-native';

export const appConstants = {
  WARNING: 'WARNING',
  MERCHANT_CODE: 'SMARTRM',
  SERVICE_STATUS: {
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED',
    UNAVAILABLE: 'UNAVAILABLE',
  },
  STATUS: {
    success: 'Hoàn thành',
    failed: 'Thất bại',
    in_progress: 'Đang xử lý',
  },
  TYPE_OPEN_ACCOUNT: {
    IN_PROGRESS: 'IN_PROGRESS',
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED',
  },
  CUSTOMER_LEVEL: {
    LEVEL_1: 1,
    LEVEL_3: 3,
  },
  fileType: {
    CMT_LEGAL: 2,
    CMT_CHIEF_ACC: 3,
    CMT_AUTH_LEGAL: 12,
    CMT_AUTH_CHIEF: 13,
    CMT_ACCOUNTANT: 14,
  },
  IMAGE_SIZE_RESIZED: 1024000,
  listTutorial: [
    'Giấy tờ còn hạn sử dụng, là hình gốc, không scan và photocopy',
    'Đặt giấy tờ trên 1 mặt phẳng',
    'Đảm bảo ảnh rõ nét, không bị mờ lóa',
  ],
  listHint: [
    {
      text: 'Không chụp quá mờ',
      icon: image.ID_CARD_BLUR as ImageSourcePropType,
    },
    {
      text: 'Không chụp mất góc',
      icon: image.ID_CARD_ROTATE as ImageSourcePropType,
    },
    {
      text: 'Không chụp lóa sáng',
      icon: image.ID_CARD_BLUR as ImageSourcePropType,
    },
  ],
  ORDER_NUMBER: {
    FRONT: 'MAT_TRUOC',
    BACK: 'MAT_SAU',
  },
  SERVER_DATE: 'YYYY-MM-DD',
  SEX: {
    NAM: 1,
    NU: 0,
  },
  ACCURACY_OCR: {
    hoTen: 0.933,
    id: 0.933,
    birthDay: 0.8,
    gender: 0.8,
    nationality: 0.8,
    issueDate: 0.8,
    issuePlace: 0.5,
    recentLocation: 0.5,
    validDate: 0.8,
  },
  LIST_WARNING_OCR: [
    {
      codeDetect: 'mat_goc',
      text: 'Giấy tờ tùy thân bị mất góc',
    },
    {
      codeDetect: 'mo_nhoe',
      text: 'Giấy tờ tùy thân tờ bị mờ/nhoè',
    },
    {
      codeDetect: 'loa',
      text: 'Giấy tờ tùy thân tờ bị lóa',
    },
  ],
  ERROR_ADVANCE_IDENTIFICATION: 'ERROR_ADVANCE_IDENTIFICATION',
  ERROR_IDENTIFICATION: 'ERROR_IDENTIFICATION',
  SATISFY_IDENTIFICATION: 'SATISFY_IDENTIFICATION',
  CU_TRU: '0',
  KHONG_CU_TRU: '1',
  RESIDENCE: [
    {
      key: '0',
      text: 'Cư trú',
    },
    {
      key: '1',
      text: 'Không cư trú',
    },
  ],
  CCCD: 'CCCD',
  CMND: 'CMND',
  TYPES_IDENTIFICATION: [
    {
      id: 1,
      key: 'CCCD',
      text: 'Căn cước công dân',
    },
    {
      id: 2,
      key: 'CMND',
      text: 'Chứng minh thư nhân dân',
    },
    {
      id: 3,
      key: 'HC',
      text: 'Hộ chiếu',
    },
    {
      id: 4,
      key: 'CMTQD',
      text: 'Chứng minh thư quân đội',
    },
  ],
  LEVEL1: 1,
  LEVEL2: 2,
  typeOfPageAddRole: {
    pageRepresentative: 'pageRepresentative',
    pageChiefAccountant: 'pageChiefAccountant',
    pageAccountant: 'pageAccountant',
  },
  roleGroupCode: {
    pageRepresentative: [2, 3],
    pageChiefAccountant: [1, 4],
    pageAccountant: [5],
  },
  keys: {
    legalRepresentative: 2,
    authorizedRepresentative: 3,
    chiefAccountant: 1,
    authorizedChiefAccountant: 4,
    accountant: 5,
    other: 6,
  },
  ROLE_BIZ_BY_LEVEL: {
    '1': {
      '2': {
        text: 'Releaser + Approver',
        key: 'legalRepresentative',
      },
      '3': {
        text: 'Releaser + Approver',
        key: 'authorizedRepresentative',
      },
      '1': {
        text: 'Maker',
        key: 'chiefAccountant',
      },
      '4': {
        text: '',
        key: 'authorizedChiefAccountant',
      },
      '5': {
        text: 'Maker',
        key: 'accountant',
      },
    },
    '2': {
      '2': {
        text: 'Releaser',
        key: 'legalRepresentative',
      },
      '3': {
        text: 'Releaser',
        key: 'authorizedRepresentative',
      },
      '1': {
        text: 'Approver',
        key: 'chiefAccountant',
      },
      '4': {
        text: '',
        key: 'authorizedChiefAccountant',
      },
      '5': {
        text: 'Maker',
        key: 'accountant',
      },
    },
  },
  role: {
    '1': {
      text: 'Kế toán trưởng',
      code: '1',
      orderNum: 3,
    },
    '2': {
      text: 'Người đại diện theo pháp luật',
      code: '2',
      orderNum: 1,
    },
    '3': {
      text: 'Người đại diện theo ủy quyền',
      code: '3',
      orderNum: 2,
    },
    '4': {
      text: 'Người được kế toán trưởng ủy quyền',
      code: '4',
      orderNum: 4,
    },
    '5': {
      text: 'Kế toán viên',
      code: '5',
      orderNum: 5,
    },
  },

  MICRO: 'SME-MICRO',
  SMALL: 'SME-SMALL',
  MEDIUM: 'SME-MEDIUM',
  commonSegment: [
    { key: 'SME-MEDIUM', name: 'Vừa' },
    { key: 'SME-SMALL', name: 'Nhỏ' },
    { key: 'SME-MICRO', name: 'Siêu nhỏ' },
  ],
  KEY_SMALLER_20: '1',
  INCOME_SEGMENTATION: [
    {
      text: '< 20 tỷ',
      key: '1',
    },
    {
      text: '20 đến dưới 100 tỷ',
      key: '2',
    },
    {
      text: '100 đến dưới 500 tỷ',
      key: '3',
    },
    {
      text: '500 đến dưới 1000 tỷ',
      key: '4',
    },
    {
      text: '>= 1000 tỷ',
      key: '5',
    },
  ],
  COMMON_DATE: 'DD/MM/YYYY',
  INTER_DATE: 'MM/DD/YYYY',
  LICENSE: [
    { key: 1, text: '1. Đăng ký kinh doanh' },
    { key: 2, text: '2. Quyết định thành lập' },
  ],
  SEARCH_TYPE: {
    NON_EXIST: 0,
    DONE: 1,
    INPROGRESS: 2,
    OTHER_RM: 3,
    DONE_LEVEL1: 4,
  },
  FONT_SIZE: {
    BANNER: 32,
    HEADER: 24,
    TOAST: 18,
    TITLE: 16,
    CONTENT: 14,
    NOTE: 12,
  },
  PADDING: {
    LARGE: 32,
    LARGE_2: 24,
    NORMAL: 16,
    SMALL: 8,
    SMALL_2: 6,
    TINY: 4,
  },
  SCREEN_NAME: {
    LOGIN_SCREEN: 'LoginScreen',
  },
  FORMAT_DATE_TIME: {
    HH_MM_DD_MM_YYYY: 'HH:mm DD/MM/YYYY',
    DD_MM_YYYY_HH_MM_SS: 'DD/MM/YYYY HH:mm:ss',
    DD_MMM_DD_HH_MM_SS_ICT_YYYY: 'dd MMM DD HH:mm:ss [ICT] YYYY',
    DD_MM_YYYY: 'DD/MM/YYYY',
    MM_YYYY: 'MM/YYYY',
    YYYY_MM_DD: 'YYYY-MM-DD',
    YYYY: 'YYYY',
    MM: 'MM',
    DD_MMM_YY: 'DD-MMM-YY',
  },
  GENDER: {
    NAM: 'nam',
    NU: 'nu',
  },
  PRIORITY: {
    HIGH: 'HIGH',
    MEDIUM: 'MEDIUM',
    LOW: 'LOW',
    ALL: 'ALL',
  },
  CALENDAR_TYPE: {
    CALENDAR: 'CALENDAR',
    ACTIVITIES: 'HD',
    ALL: 'ALL',
    LOGIN_SCREEN: 'Login',
  },
  ASYNC_STORAGE_KEY: {
    PREFERENCES_KEY: 'PREFERENCES_KEY',
    PREV_USER_NAME: 'PREV_USER_NAME',
  },
  ROUTE: {
    MAIN: 'routeMain',
    LOGIN: 'routeLogin',
  },
  LOGIN_STATUS: {
    ACCOUNT_DISABLE: 'Account disabled',
    INVALID_USER_CREDENTIALS: 'Invalid user credentials',
  },
  OTHERS: {
    NO_USER: 'NO_USER',
    CODE: 'code',
    VPN: 'vpn',
    INSTRUCTION_FILE_NAME: 'pdf/HUONG_DAN_SU_DUNG_CRM_KHCN.pdf',
    POSSIBLE: 'Possible Unhandled Promise Rejection',
  },
  DEVICE_CONFIG: {
    APP_CODE: 'SMART_SME',
    APP_NAME: 'SMART_SME',
    COLLECTION: 'users',
  },
  BLOCK: {
    INDIV: 'INDIV',
    SME: 'SME',
  },
  API_STATUS_CODE: {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    REQUEST_TIMEOUT: 408,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
  },
  APP_CODE: {
    // From 9000 - 9999
    COMMON_ERROR_CODE: 9999,
    INVALID_ERROR_CODE: 9000,
    PERMISSION_ERROR_CODE: 9001,
  },
  ERROR_CODE: {
    CLIENT_ERROR: 'CLIENT_ERROR',
    SERVER_ERROR: 'SERVER_ERROR',
    TIMEOUT_ERROR: 'TIMEOUT_ERROR',
    CONNECTION_ERROR: 'CONNECTION_ERROR',
    NETWORK_ERROR: 'NETWORK_ERROR',
    CANCEL_ERROR: 'CANCEL_ERROR',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  },
  SALEKIT_TYPE: {
    SALEKIT: '',
    TARIFF: 'SERVICE_FEE',
    INTEREST_RATE: 'INTEREST_RATE',
  },
  CATEGORY_TYPE: {
    SALE_KIT: 'SALE_KIT',
    SALE_KIT_PRODUCT: 'SALE_KIT_PRODUCT',
    SALE_KIT_POLICY: 'SALE_KIT_POLICY',
    SALE_KIT_NOTIFY: 'SALE_KIT_NOTIFY',
  },
  PATH_FOLDER_SAVE_FILE: {
    NEXTGEN: 'SMARTRMSME',
    SALEKIT: 'SMARTRMSME/SALEKIT',
    BPM: 'SMARTRMSME/BPM',
    INSTRUCTION: 'Hướng dẫn sử dụng SmartRM',
  },
  OVERLAY_MENU: {
    UTILITIES: 'UTILITIES',
    BIRTHDAY: 'BIRTHDAY',
    NOTIFICATION: 'BELL',
  },
  BIRTHDAY_GROUP: {
    TODAY: 'Today',
    TOMORROW: 'Tomorrow',
    THIS_WEEK: 'This Week',
  },
  COMMON_CODE: {
    CUSTOMER_OBJECT: 'CUSTOMER_OBJECT_CONFIG',
    CUSTOMER_STATUS: 'STATUS_CUSTOMER_CONFIG',
    CUSTOMER_QUICK_SEARCH: 'QUICKSEARCH_TYPE',
    SEGMENT_CUSTOMER_CONFIG: 'SEGMENT_CUSTOMER_CONFIG',
    ASSET_TYPE: 'ASSET_TYPE',
    OPP_STATUS: 'OPP_STATUS',
    ASSET_GROUP: 'ASSET_GROUP',
    LEAD_ORG_TYPE: 'LEAD_ORG_TYPE',
    LEAD_SOURCE: 'LEAD_SOURCE',
    LEAD_STATUS: 'LEAD_STATUS',
    CONTACT_POSITION: 'CONTACT_POSITION',
    CUSTOMER_SEGMENT: 'SEGMENT_CUSTOMER_CONFIG',
    CUSTOMER_CLASSIFICATION: 'CUSTOMER_CLASSIFICATION',
    TARGET_STATUS: 'TARGET_STATUS',
  },
  QUICKSEARCH_TYPE: {
    CUSTOMER_CODE: 'CUSTOMER_CODE',
    BUSINESS_REGISTRATION_NUMBER: 'BUSINESS_REGISTRATION_NUMBER',
    CUSTOMER_NAME: 'CUSTOMER_NAME',
    CUSTOMER_PHONE: 'CUSTOMER_PHONE',
    CUSTOMER_EMAIL: 'CUSTOMER_EMAIL',
  },
  ADVANCE_SEARCH_TYPE: {
    ALL: 'ALL',
  },
  CUSTOMER_OBJECT_ALL: {
    ALL: 'Tất cả',
  },
  COMMON_CATEGORY_CODE: {
    CURRENCY: 'CURRENCY',
    INTEREST_RATE_CONFIG_SME: 'INTEREST_RATE_CONFIG_SME',
  },
  INTEREST_RATE_KEYPI: {
    BUSINESS_SAVING: '04,LTTSME.',
    RECURRING_BUSINESS_SAVING: '41,42,43,44',
    DIGITAL_INVESTMENT: '45,46,47,48,EB.LD6.,62,63',
  },
  TEMPLATE_CONFIG_PARAM: {
    COMMON: 'COMMON',
    INTERBANK: 'INTERBANK',
  },
  WARNING_TYPE: {
    SAVING: 'WARNING_SAVING',
    CREDIT: 'WARNING_CREDIT',
  },
  APP_FOLDER_DOWNLOAD: {
    SALE: '/CRM/SALE_PROFILE/',
    SALE_PROFILE_01: '01',
    SALE_PROFILE_02: '02',
    SALE_PROFILE_03: '03',
    SALE_PROFILE_04: '04',
    SALE_PROFILE_05: '05',
    SALE_PROFILE_06: '06',
    SALE_PROFILE_07: '07',
    SALE_PROFILE_08: '08',
  },
  PROFILE_SALE_TYPE: {
    DKKD: 0,
    GIAY_UY_QUYEN: 1,
    CMT_CHU_DN: 2,
    CMT_KTT: 3,
    CHU_KY_NDDHP: 4,
    CHU_KY_KTT: 5,
    CHU_KY_RM: 6,
    HOP_DONG_SDDV: 7,
    QUYET_DINH_BN_NDD: 8,
    CAM_KET_BS_KTT: 9,
    USB_CA: 10,
    FILE_THONG_TIN_KH: 11,
    CMT_DD_UY_QUYEN: 12,
    CMT_NGUOI_DUOC_KTUQ: 13,
    CMT_KTV: 14,
    ANH_CSKD: 15,
  },
  PROFILE_TYPE_TEXT: {
    '0': 'dkkd_certificate',
    '7': 'contract_certificate',
    '8': 'representative_certificate',
    '1': 'auth_documents',
    '9': 'commit_chief_accountant',
    '15': 'image_of_cskd',
    '10': 'account_open_profile',
  },

  RS_NAME: {
    RM: 'Quản lý RM',
    RM_FLUCTUATIONS: 'Quản lý biến động RM',
    KH360: 'Quản lý KH 360',
    RM_BLOCK: 'Quản lý khối RM',
    RM_GROUP: 'Quản lý nhóm RM - CBQL',
    RM_TITLE: 'Danh mục nhóm chức danh RM',
    DASHBOARD: 'Dashboard',
    RM_ASSIGNMENT: 'Phê duyệt KH phân giao cho RM',
    KH_ASSIGNMENT: 'Phân giao KH',
    CALENDAR: 'CALENDAR',
    OPPORTUNITY: 'Cơ hội bán',
    LEADS: 'Quản lý KH tiềm năng',
    TARGET_ONBOARDING: 'Mục tiêu bán',
    OPPORTUNITY_ONBOARDING: 'Cơ hội bán',
  },
  FILE_TYPE: {
    IMAGE: ['image/jpeg', 'image/png'],
    PDF: ['application/pdf'],
  },

  STATUS_IMAGE: {
    LOADING: 'LOADING',
    LOAD_SUCCESS: 'LOAD_SUCCESS',
    LOAD_FAILED: 'LOAD_FAILED',
  },

  SIGNATURE_TYPE: {
    LEGAL_REPRESENTATIVE_SIGNATURE: 4,
    CHIEF_ACCOUNTANT_SIGNATURE: 5,
    RM_SIGNATURE: 6,
  },

  WIDTH_SCREEN: Dimensions.get('screen').width,

  PUBSUB_KEY: {
    GET_CUSTOMER_OPENING: 'GET_CUSTOMER_OPENING',
  },

  PUBLIC_KEY_RSA: `-----BEGIN RSA PUBLIC KEY-----
  MIIBCgKCAQEAy2FdPVOb+wypCLzu+ehbVRVelSOjpF05KYdY8lmsIh+YcBl8Rvv7
  DYCKidfwW69kY4Drd4PKI2TLZqjB+bOPuRUlEALokJ57TmnefPqoLEQOL6MZnU2r
  tjHbW2XSDPMFajz5eGvViXq+9cNaPSTNBrNBqsZZRdVwkjHtGuU1UtASCctaZAyP
  rPTDNZBaZZ7F1UtmyXdjH/zX1KndMVQn2jO+gmbaUPjINBF19e7o7ZdIW5UXBmLT
  +FcYVmnVzBYD+MyqrbbvZocSXbekqb/q5P2jdBMqTq3neLZWix+msVFjW7wdx0wp
  xpPb8VIiQPKmvN22Uc2uZJWpphY9CcH0dwIDAQAB
  -----END RSA PUBLIC KEY-----`,
  KEY_ENCRYPT_CUSTOMER_CODE: '379C286AB22326D5B611DCB24ECC5',
};
