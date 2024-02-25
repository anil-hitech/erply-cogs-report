import "./App.css";
import { router } from "./routes/router";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { RouterProvider } from "react-router-dom";
import AppContextProvider from "./context/AppContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </ThemeProvider>
  );
}

export default App;
