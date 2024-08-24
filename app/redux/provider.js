"use client";

import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import { Provider } from "react-redux";
export function Providers({ children }) {
  return (
    <Provider store={store} persistor={persistor}>
      <PersistGate persistor={persistor} loading={null}>
        {children}
      </PersistGate>
    </Provider>
  );
}
