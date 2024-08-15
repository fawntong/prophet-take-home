import React from "react";
import "./App.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { InvestigationsPage } from "./pages/investigations/InvestigationsPage";

function App() {
  return (
    <Theme accentColor="violet">
      <InvestigationsPage />
    </Theme>
  );
}

export default App;
