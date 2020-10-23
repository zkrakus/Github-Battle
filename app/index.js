import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Popular from "./components/Popular";
import Battle from "./components/Battle";

// Component
// State
// Lifecycle
// UI

class App extends React.Component {
  render() {
    // The below returns JSX which is a syntax extension to javascript
    // Browsers don't understand JSX. Babel will transform JSX to plain javascript e.g. using createElement().
    return (
      <div className="container">
        <Battle />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
  // React Element
  // Where to render the element to
);
