import "swiper/css";
import "swiper/css/bundle";
import 'remixicon/fonts/remixicon.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css'; 
import 'react-clock/dist/Clock.css';
import '../node_modules/boxicons/css/boxicons.min.css';
import './styles/front-pages.css';
import "./styles/control-panel.css";
import "./styles/left-sidebar-menu.css";
import "./styles/top-navbar.css";
import "./styles/crypto-dashboard.css";
import "./styles/chat.css";
import "./styles/horizontal-navbar.css";

// globals Styles
import "./styles/globals.css";

// globals dark Mode CSS
import "./styles/dark.css";

// globals RTL Mode CSS
import "./styles/rtl.css"; 

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { AuthProvider } from "./authentication/AuthContext"; // make sure path is correct
import { HashRouter as Router } from "react-router-dom"; // ← Change this line


// ✅ Import Sentry
import * as Sentry from "@sentry/react";
import { browserTracingIntegration } from "@sentry/react";

// ✅ Initialize Sentry BEFORE rendering
Sentry.init({
  dsn: "https://b9e1e73c570fbed15e0e2eae0f11642c@o4509936238657536.ingest.us.sentry.io/4509936267624448", // replace with DSN from Sentry
 integrations: [
    browserTracingIntegration(), // ✅ replaces new BrowserTracing()
  ],
  tracesSampleRate: 1.0, 
});

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </ThemeProvider>
);

// CRA web vitals logging (you can also send these to Sentry if you want)
reportWebVitals();
