import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Popular from "./components/Popular";
import Battle from "./components/Battle";
import Results from "./components/Results";
import { ThemeProvider } from "./contexts/theme";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Component
// State
// Lifecycle
// UI

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: "light",
      toggleTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme === "light" ? "dark" : "light",
        }));
      },
    };
  }

  render() {
    // The below returns JSX which is a syntax extension to javascript
    // Browsers don't understand JSX. Babel will transform JSX to plain javascript e.g. using createElement().
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className="container">
              <Nav />
              <Route exact path="/" component={Popular} />
              <Route exact path="/battle" component={Battle} />
              <Route path="/battle/results" component={Results} />
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
  // React Element
  // Where to render the element to
);
