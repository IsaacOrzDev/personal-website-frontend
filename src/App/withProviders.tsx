import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from 'store';

const withProviders = (Component: React.FC) => {
  const componentWithProviders: React.FC = () => {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component />
        </PersistGate>
      </Provider>
    );
  };
  return componentWithProviders;
};

export default withProviders;
