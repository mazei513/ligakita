import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HomePage } from './pages';
import { TournamentInfoPage } from './pages/info/page';
import { NewTournamentPage } from './pages/new/page';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/new">
          <NewTournamentPage />
        </Route>
        <Route path="/info/:tournamentId">
          <TournamentInfoPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
