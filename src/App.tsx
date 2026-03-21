import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import AppContent from "./AppContent";

const App = () => (
  <HelmetProvider>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
