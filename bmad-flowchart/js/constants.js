// === constants.js ===
// BMAD 전역 네임스페이스 초기화 및 상수 정의

window.BMAD = {
  // 상수
  MOD_W: 240, MOD_H: 72,
  AGT_W: 170, AGT_H: 44,
  WF_W: 146, WF_H: 28,
  GAP_X: 80, GAP_Y: 50,
  AGT_GAP: 12, WF_GAP: 6,
  PAD: 80,

  CMD_ALIAS: {
    'bmm-automate': 'bmm-qa-automate',
    'bmm-check-implementation-readiness': 'bmm-check-readiness',
    'bmm-create-epics-and-stories': 'bmm-create-epics',
    'bmm-create-ux-design': 'bmm-create-ux',
    'bmm-generate-project-context': 'bmm-generate-context',
    'bmm-research': 'bmm-market-research',
    'core-editorial-review-prose': 'core-editorial-prose',
    'core-editorial-review-structure': 'core-editorial-structure',
    'core-review-adversarial-general': 'core-review-adversarial'
  },

  // 상태 (mutable)
  state: {
    expanded: {},
    zoom: 1, panX: 0, panY: 0,
    dragging: false, dragStartX: 0, dragStartY: 0, panStartX: 0, panStartY: 0,
    layoutCache: null,
    activeTab: 'doc',
    searchIndex: null,
    currentMatches: [],
    selectedIdx: -1,
    docInitialized: false,
    currentDocId: null,
    touchStartDist: 0, touchStartZoom: 1,
    detailSwipe: { start: 0, distance: 0 }
  },

  // DOM 참조 (init에서 채움)
  dom: {},

  // 각 모듈이 함수를 등록
  utils: {},
  tabs: {},
  moduleView: {},
  flowchart: {},
  fileViewer: {},
  agentViewer: {},
  stepNav: {},
  search: {},
  docView: {},
  detailPanel: {},
  zoomPan: {},
  mobile: {}
};
