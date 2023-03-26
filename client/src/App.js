import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <LandingPage/>
          </Route>
          
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

