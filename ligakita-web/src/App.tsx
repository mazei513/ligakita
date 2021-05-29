import React from 'react';
import { BrowserRouter as Router, Route, Switch, useParams } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:tournamentId">
          <TournamentInfoPage />
        </Route>
      </Switch>
    </Router>
  );
}

type TournamentInfoPageParams = {
  tournamentId: string
}

function TournamentInfoPage() {
  const { tournamentId } = useParams<TournamentInfoPageParams>();
  return <div>
    <h2>Tournament Info</h2>
    <p>{tournamentId}</p>
  </div>;
}

export default App;
