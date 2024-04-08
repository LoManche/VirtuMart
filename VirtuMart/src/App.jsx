import { CssBaseline, ThemeProvider } from "@mui/material";
import { getTheme } from "./theme";
import Router from "./router";

import { AppContextProvider } from "./contexts/appContext";

function App() {
  return (
    <AppContextProvider>
      <ThemeProvider theme={getTheme()}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Router />
          </main>
        </div>
      </ThemeProvider>
    </AppContextProvider>
  );
}

export default App;
