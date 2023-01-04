import React, { useEffect, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

import S from './core/utilities/Main';

import AppStore from './core/presentation/stores/AppStore';

import AppRouter from './features/app-routes/presentation/components/AppRouter';
import AlertStore from './core/presentation/stores/AlertStore';
import WalletStore from './features/ledger/presentation/stores/WalletStore';

const appStore = new AppStore();
const alertStore = new AlertStore();
const walletStore = new WalletStore();

const App = () => {
  useEffect(() => {
    initHover();
    initOnBeforeUnload();
    removeInitalPageLoading();
  }, []);

  return (
    <StrictMode>
      <Provider
        appStore={appStore}
        alertStore={alertStore}
        walletStore={walletStore}
      >
        <BrowserRouter>
          <AppRouter walletStore={walletStore} />
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
};

export default App;

function initHover() {
  if (navigator.maxTouchPoints === 0 || navigator.msMaxTouchPoints === 0) {
    return;
  }

  let touch = false;
  let timerId: any = null;
  const timerCallback = () => {
    touch = false;
  };

  document.documentElement.addEventListener(
    'mousemove',
    (e) => {
      if (touch === false) {
        S.CSS.removeClass(document.documentElement, 'Touchable');
      }
    },
    true,
  );

  document.documentElement.addEventListener(
    'touchstart',
    () => {
      touch = true;
      if (timerId !== null) {
        clearTimeout(timerId);
      }
      S.CSS.addClass(document.documentElement, 'Touchable');
    },
    true,
  );

  document.documentElement.addEventListener('touchend', () => {
    if (timerId !== null) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(timerCallback, 256);
  });
}

function initOnBeforeUnload() {
  let loadedFromCache = false;

  window.onbeforeunload = (e: BeforeUnloadEvent) => {
    const defaultReturnValue = e.returnValue;

    if (S.Browser.instance_name === S.Browser.SAFARI) {
      document.body.style.opacity = '0';
    }

    if (loadedFromCache === true) {
      e.returnValue = defaultReturnValue;
      return;
    }

    if (e.returnValue !== defaultReturnValue) {
      setTimeout(() => {
        setTimeout(() => {
          setTimeout(() => {
            setTimeout(() => {
              setTimeout(() => {
                if (S.Browser.instance_name === S.Browser.SAFARI) {
                  document.body.style.opacity = '1';
                }
              }, 20);
            }, 20);
          }, 20);
        }, 20);
      }, 20);
    }
  };

  window.onpageshow = (e: PageTransitionEvent) => {
    loadedFromCache = e.persisted;
    if (e.persisted) {
      window.location.reload();
    }
  };
}

function removeInitalPageLoading() {
  const pageLoadingN = document.getElementById('page_loading');
  pageLoadingN?.parentNode?.removeChild(pageLoadingN);
}
