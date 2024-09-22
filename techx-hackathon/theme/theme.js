// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // Dark theme
    background: {
      default: '#0B0E1A', // Dark background color
      paper: '#1A1D2F',  // Dark card background
    },
    primary: {
      main: '#3399FF', // Bright blue for buttons and accents
    },
    secondary: {
      main: '#00FFD1', // Neon teal for secondary highlights
    },
    text: {
      primary: '#FFFFFF', // White text
      secondary: '#AAB2C9', // Light gray for secondary text
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#FFFFFF', // White text for headings
    },
    body1: {
      fontSize: '1rem',
      color: '#AAB2C9', // Light gray text for body text
    },
  },
});

export default theme;
