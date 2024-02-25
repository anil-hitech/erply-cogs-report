import { createTheme } from "@mui/material/styles";

// Define your custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Change primary color
    },
    secondary: {
      main: "#1976d2", // Change primary color
    },
    // Add more customizations as needed
  },
  typography: {
    fontFamily: "Roboto, sans-serif", // Change default font
  },
  // Other theme customizations

  mode: "light",
});

export default theme;
