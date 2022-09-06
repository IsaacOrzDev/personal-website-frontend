// @ts-nocheck

// Reference : https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
const isChrome = () => {
  return (
    !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)
  );
};

const isFirefox = () => {
  return typeof InstallTrigger !== 'undefined';
};

const isSafari = () => {
  // return (
  //   /constructor/i.test(window.HTMLElement) ||
  //   (function(p) {
  //     return p.toString() === '[object SafariRemoteNotification]';
  //   })(
  //     !window['safari'] ||
  //       (typeof safari !== 'undefined' && safari.pushNotification)
  //   )
  // );
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};

const isNewEdge = () => {
  return window.navigator.userAgent.indexOf('Edg') > -1;
};

const isOldEdge = () => {
  return !isIE && !!window.StyleMedia;
};

const isIE11 = () => {
  return !!window.MSInputMethodContext && !!document.documentMode;
};

const isIE = () => {
  return /*@cc_on!@*/ false || !!document.documentMode;
};

const isOpera = () => {
  return (
    (!!window.opr && !!opr.addons) ||
    !!window.opera ||
    navigator.userAgent.indexOf(' OPR/') >= 0
  );
};

const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
};

const isIos = () => {
  return (
    [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod',
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  );
};

const browserService = {
  isChrome,
  isFirefox,
  isSafari,
  isOldEdge,
  isNewEdge,
  isIE11,
  isIE,
  isOpera,
  isMobile,
  isIos,
};

export default browserService;
