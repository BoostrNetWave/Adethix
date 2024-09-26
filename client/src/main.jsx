// import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';
import "react-toastify/dist/ReactToastify.css";
import 'react-toastify/dist/ReactToastify.min.css';

import { ToastContainer } from "react-toastify";

const theme = createTheme({
  // Define your theme configuration here
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    {/* <ToastContainer position="bottom-right"/> */}
    <App />
  </ThemeProvider>,
);
