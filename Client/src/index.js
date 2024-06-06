import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { IsMobileProvider } from "./contexts/isMobile";
import { Provider } from "react-redux";
import { store } from "./store";

const theme = createTheme({
  palette: {
    primary: {
      main: "#dac287",
    },
    secondary: {
      main: "#1a2b43",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "Poppins",
      fontWeight: {
        primary: {
          main: 400,
        },
        secondary: {
          main: 600,
        },
      },
    },
    h6: {
      fontFamily: "Regular",
    },
    h5: {
      fontFamily: "Medium",
    },
    h4: {
      fontFamily: "Semibold",
    },
    body1: {
      fontFamily: "Medium",
    },
    body2: {
      fontFamily: "Regular",
    },
    p: {
      fontFamily: "Regular",
    },
    h3: {
      fontFamily: "Bold",
    },
    h2: {
      fontFamily: "Extrabold",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <IsMobileProvider>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
      </Provider> 
    </IsMobileProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();