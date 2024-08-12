import React from 'react';
import './App.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import {InvestigationsPage} from "./pages/InvestigationsPage";

function App() {
  return (
      <Theme>
        <InvestigationsPage />
      </Theme>
  );
}

export default App;
