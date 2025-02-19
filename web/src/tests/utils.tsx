import { Provider } from 'react-redux';
import { render as testRender, renderHook as testRenderHook } from '@testing-library/react';
import { createStore } from "../store/store";

export function renderHook<T>(hook: () => T) {
  const { store } = createStore(false)

  return testRenderHook(hook, {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
  });
}

export const render = (component: React.ReactElement) => {
  const { store } = createStore(false)

  return testRender(
    <Provider store={store}>{component}</Provider>
  );
};
