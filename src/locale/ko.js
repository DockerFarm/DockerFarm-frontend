export default {

    // Side bar menu
    'MENU_DASHBOARD': '대쉬보드',
    'MENU_CONTAINER': '컨테이너 관리',
    'MENU_SWARM': '스웜 관리',
    'MENU_IMAGE': '이미지 관리',
    'MENU_NETWORK': '네트워크 관리',
    'MENU_VOLUME': '볼륨관리',
    'MENU_EVENT': '이벤트',
    'MENU_LIBRARY': '라이브러리',
    'MENU_SETTING': '설정',
    'MENU_ENDPOINT': '엔드포인트',
    'MENU_REGISTRY': '레지스트리',

    //GNB
    'GNB_LOGOUT': '로그아웃',

    //DashBoard Page
    'DB_CONTAINER_TITLE': '컨테이너',
    'DB_CONTAINER_RUNNING': '실행중',
    'DB_CONTAINER_STOPPED': '중지됨',
    'DB_IMAGE_TITLE': '이미지',
    'DB_IMAGE_TOTAL': '총 사용량',
    'DB_NETWORK_TITLE': '네트워크',
    'DB_VOLUME_TITLE': '볼륨',
    'DB_NODE_HEADER': 'Node 정보',
    'DB_NODE_NAME': '이름',
    'DB_NODE_VERSION': 'Docker 버전',
    'DB_NODE_CPU': 'Node CPU',
    'DB_NODE_MEMORY': 'Node Memory',
    'DB_ENGINE_HEADER': 'Engine 정보',


    //Container Management
    'CON_LIST_HEADER': '컨테이너 목록',
    'CON_INFO_HEADER': '컨테이너 기본 정보',
    'CON_DETAIL_HEADER': '컨테이너 상세 정보',
    'CON_VOLUME_HEADER': '사용중인 볼륨 목록',
    'CON_STEP1_IMAGE_HEADER': '로컬에 이미지가 없을경우 아래 Docker Hub를 통해서 이미지를 Pull 받을 수 있습니다.',
    'CON_STEP1_HUB_HEADER': 'Docker Hub에서 Image 검색',
    'CON_BTN_ADD': '컨테이너 생성',
    'CON_STEP1_TITLE': '배포할 이미지 선택',
    'CON_STEP1_DESC': '컨테이너를 만들 이미지를 먼저 설정합니다.',
    'CON_STEP2_TITLE': '컨테이너 기본 설정',
    'CON_STEP2_DESC': '컨테이너 필수 정보를 입력합니다.',
    'CON_STEP3_TITLE': '컨테이너 옵션 설정',
    'CON_STEP3_DESC': '필요한 컨테이너 옵션 정보를 입력합니다.',
    'CON_STEP1_FIELD_IMAGE': '로컬 이미지',
    'CON_STEP2_BASIC_HEADER': '컨테이너 기본설정',
    'CON_STEP2_NAME_LB': '이름',
    'CON_STEP2_NAME_PH': '컨테이너 이름을 입력하세요 ex) webserver',
    'CON_STEP2_PORT_HEADER': '포트 설정',
    'CON_STEP2_ALLPORT_LB': '모든 포트 노출',
    'CON_STEP2_ADDPORT_LB': '포트 추가',
    'CON_STEP3_CMD_HEADER': 'Command 설정',
    'CON_STEP3_VOL_HEADER': 'Volumne 설정',
    'CON_STEP3_ADDVOL_LB': 'Volume 설정 추가',
    'CON_STEP3_NET_HEADER': 'Network 설정',
    'CON_STEP3_ENV_HEADER': '환경변수 설정',
    'CON_STEP3_ADDENV_LB': '환경변수 추가',
    'CON_STEP3_LB_HEADER': 'Label 설정',
    'CON_STEP3_ADDLB_LB': 'Label 추가',
    'CON_STEP3_POLICY_HEADER': 'Restart Policy 설정',
    'CON_STEP3_RUNTIME_HEADER': 'Runtime 설정',
    'CON_STEP3_ADDDEVICE_LB': 'Device 추가',
    'CON_STEP3_OPTION_HEADER': '컨테이너 옵션설정(생략가능)',
    'CON_MSG_CREATE_SUCCESS': '컨테이너 생성완료',
    //Image Management
    'IMG_LIST_HEADER': '이미지 목록',
    'IMG_SEARCH_HEADER': '이미지 검색',
    'IMG_INFO_HEADER': '이미지 기본 정보',
    'IMG_DETAIL_HEADER': '이미지 상세 정보',
    'IMG_HISTORY_HEADER': '이미지 히스토리',
    'IMG_BUILD_HEADER': '새 이미지 빌드',
    'IMG_BTN_BUILD': '새 이미지 빌드',
    'IMG_BTN_BUILD_SAVE': '이미지 빌드',


    //Network Management
    'NET_LIST_HEADER': '네트워크 목록',
    'NET_CREATE_HEADER': '네트워크 생성',
    'NET_INFO_HEADER': '네트워크 기본 정보',
    'NET_OPTION_HEADER': '네트워크 옵션',
    'NET_CONTAINER_HEADER': '네트워크 사용중인 컨테이너 목록',
    'NET_BTN_ADD': '네트워크 생성',
    'NET_BTN_DELETE': '네트워크 삭제',
    'NET_BTN_LEAVE': '네트워크 연결 해제',


    //Volume Management
    'VOL_LIST_HEADER': '볼륨 목록',
    'VOL_INFO_HEADER': '볼륨 기본 정보',
    'VOL_CREATE_HEADER': '볼륨 생성',
    'VOL_CONTAINER_HEADER': '볼륨 사용중인 컨테이너',
    'VOL_DETAIL_HEADER': '볼륨 상세 정보',
    'VOL_BTN_ADD': '볼륨 생성',

    //Library
    'LIB_DESCRIPTION_HEADER': '라이브러리 이미지들을 둘러보고 원하는 이미지를 Pull 받으세요!',

    //REGISTRY
    'REG_LIST_HEADER': '레지스트리 목록',
    'REG_INFO_HEADER': '레지스트리 정보',
    'REG_BTN_ADD': '레지스트리 생성',

    //EndPoint
    'EP_LIST_HEADER': '엔드포인트 목록',
    'EP_EDIT_HEADER': '엔드포인트 수정',
    'EP_NEW_HEADER': '엔드포인트 생성',
    'EP_BTN_ADD': '엔드포인트 생성',
    'EP_CONFIRM_ACTIVE': '엔드포인트를 활성화 하시겠습니까?',
    'EP_MSG_ACTIVE_SUCCESS': '엔드포인트가 활성화 되었습니다.',
    'EP_MSG_ACTIVE_CONFIRM': '엔드포인트를 활성화 하시겠습니까?',
    'EP_MSG_REGISTER': '엔드포인트가 등록 되었습니다.',
    'EP_MSG_UPDATE': '엔드포인트가 수정 되었습니다.',
    'EP_MSG_DELETE': '엔드포인트가 삭제 되었습니다.',

    //Common
    'BTN_REMOVE': '삭제',
    'BTN_SAVE': '저장',
    'BTN_LIST': '목록',
    'BTN_RESET': '되돌리기',
    'BTN_DELETE': '삭제',
    'BTN_NEXT': '다음',
    'BTN_PREV': '이전',
    'BTN_GARBEGE_COLLECTION': '리소스 정리',

    'TABLE_NUMBER_OF_PAGES': '페이지 당',

    'CONFIRM_BTN_OK': '확인',
    'CONFIRM_BTN_CANCEL': '취소',
    'CONFIRM_DEFAULT_HEADER': '확인',
    'CONFIRM_INFO_HEADER': '알림',
    'CONFIRM_WARN_HEADER': '경고'

}
