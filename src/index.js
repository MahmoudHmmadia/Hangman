import reactDOM from "react-dom";
import App from "./App";
import { ContextProvider } from "./contexts/Provider";
reactDOM.render(
  <ContextProvider>
    <App />
  </ContextProvider>,

  document.getElementById("root")
);
