import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfigurator } from "./utils/snackbar";
import { ThemeProviderContext, useThemeMode } from "./ThemeContext";
import { store } from "./store";
import { getTheme } from "./theme";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

const root = createRoot(rootElement);

const InnerApp = () => {
  const { mode } = useThemeMode();
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        autoHideDuration={1500}
      >
        <App />
        <SnackbarUtilsConfigurator />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProviderContext>
        <InnerApp />
      </ThemeProviderContext>
    </Provider>
  </React.StrictMode>
);
