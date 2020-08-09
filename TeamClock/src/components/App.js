import React from 'react';
import './App.css';
import * as microsoftTeams from "@microsoft/teams-js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import Clock from './Clock';
import TabConfig from './TabConfig';

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
function App() {
  // Check for the Microsoft Teams SDK object.
  if (microsoftTeams) {

    // Set app routings that don't require microsoft Teams
    // SDK functionality.  Show an error if trying to access the
    // Home page.
    if (window.parent === window.self) {
      return (
        <Router>
          <Route exact path="/privacy" component={Privacy} />
          <Route exact path="/termsofuse" component={TermsOfUse} />
          <Route exact path="/tab" component={TeamsHostError} />
          <Route exact path="/config" component={TeamsHostError} />
        </Router>        
      );
    }

    // Initialize the Microsoft Teams SDK
    microsoftTeams.initialize(window);

    // Display the app home page hosted in Teams
    return (
      <Router>
        <Route exact path="/tab" component={Clock} />
        <Route exact path="/config" component={TabConfig} />
      </Router>
    );
  }

  // Error when the Microsoft Teams SDK is not found
  // in the project.
  return (
    <h3>Microsoft Teams SDK not found.</h3>
  );
}

/**
 * This component displays an error message in the
 * case when a page is not being hosted within Teams.
 */
class TeamsHostError extends React.Component {
  render() {
    return (
      <div>
        <h3 className="Error">Debug your app within the Teams client.</h3>
      </div>
    );
  }
}

export default App;
