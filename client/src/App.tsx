import React from "react";
import "@radix-ui/themes/styles.css";
import "./radix-overrides.css";
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
