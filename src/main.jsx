import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App.jsx';
import './styles.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#d94b3d', dark: '#ad342c' },
    secondary: { main: '#26836d' },
    background: { default: '#f4f6ef', paper: '#ffffff' },
    text: { primary: '#202923', secondary: '#66736b' },
  },
  typography: {
    fontFamily: 'DM Sans, sans-serif',
    h1: { fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 },
    h2: { fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 },
    h3: { fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 },
    h4: { fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 },
    h5: { fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 },
    h6: { fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, paddingInline: 18 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #e6e9e1',
          boxShadow: '0 5px 18px rgba(32, 41, 35, 0.055)',
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);