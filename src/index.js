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

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

// const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />

    <App />
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
