import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

/**
 * import store yg sudah dibuat
 */
import { store } from "../../store";

const renderWithProviders = (ui, { preloadedState = {}, appStore = store, ...renderOptions } = {}) => {
  const wrapper = ({ children }) => {
    return (
      <BrowserRouter>
        <Provider store={appStore}>{children}</Provider>
      </BrowserRouter>
    );
  };

  return {
    appStore,
    ...render(ui, { wrapper, ...renderOptions }),
  };
};

const rawRenderWithProviders = (ui) => {
  return (
    <BrowserRouter>
      <Provider store={store}>{ui}</Provider>
    </BrowserRouter>
  );
};

export { renderWithProviders, rawRenderWithProviders };
