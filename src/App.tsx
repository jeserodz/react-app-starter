import React from "react";
import { StoreProvider } from "easy-peasy";
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";
import { LoginScreen } from "./screens/LoginScreen";
import { AboutScreen } from "./screens/AboutScreen";
import { PhotosScreen } from "./screens/PhotosScreen";
import { Dashboard } from "./components/Dashboard";
import { AuthGuard } from "./components/AuthGuard";
import { store } from "./store";

function App() {
  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <div className="App">
          <h1>React App Starter</h1>
          <nav>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/photos">Photos</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route path="/login">
              <AuthGuard loggedInRedirect="/photos">
                <LoginScreen />
              </AuthGuard>
            </Route>
            <Route path="/about">
              <AboutScreen />
            </Route>
            <Dashboard>
              <Route path="/photos">
                <AuthGuard loggedOutRedirect="/login">
                  <PhotosScreen />
                </AuthGuard>
              </Route>
            </Dashboard>
          </Switch>
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
