import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch, useHistory, useParams } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/new">
          <NewTournamentPage />
        </Route>
        <Route path="/:tournamentId">
          <TournamentInfoPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

function HomePage() {
  return <div>
    <h2>Welcome to LigaKita</h2>
    <Link to="/new">New Tournament</Link>
  </div>
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

type TournamentFormValues = {
  tournamentName: string
  players: string[]
}

type TournamentFormErrors = {
  tournamentName?: string
  players?: string
}

function NewTournamentPage() {
  const [formValues, setFormValues] = useState<TournamentFormValues>({ tournamentName: "", players: [""] });
  const [formErrors, setFormErrors] = useState<TournamentFormErrors>({});
  const history = useHistory();

  const handleTournamentNameChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    setFormValues({ ...formValues, tournamentName: evt.target.value });
  }

  const handlePlayerChange = (evt: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const newPlayers = [...formValues.players];
    newPlayers[i] = evt.target.value;
    setFormValues({ ...formValues, players: newPlayers });
  }

  const handleAddPlayer = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const newPlayers = [...formValues.players];
    newPlayers.push("")
    setFormValues({ ...formValues, players: newPlayers });
  }

  const handleRemovePlayer = (evt: React.MouseEvent<HTMLButtonElement>, i: number) => {
    evt.preventDefault();
    const newPlayers = formValues.players.filter((_, j) => i !== j);
    setFormValues({ ...formValues, players: newPlayers });
  }

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    const errors: TournamentFormErrors = {}

    if (formValues.tournamentName.trim().length === 0) {
      errors.tournamentName = "Must not be empty";
    }

    if (formValues.players.length === 0) {
      errors.players = "Must have at least 1 player";
    } else if (!formValues.players.every((p) => p.trim().length > 0)) {
      errors.players = "All player names must not be empty";
    }

    setFormErrors(errors);

    const hasErrors = !!errors.players || !!errors.tournamentName;
    if (hasErrors) {
      return;
    }

    history.push("/123", formValues);
  }

  return <div className="container mx-auto w-1/3 min-w-max shadow-sm border-2 p-3 my-3">
    <form onSubmit={handleFormSubmit}>
      <FormGroup>
        <FormLabel htmlFor="tournamentName">Tournament Name</FormLabel>
        <FormInputText name="tournamentName" value={formValues.tournamentName} onChange={handleTournamentNameChange} />
        <FormErrorText>{formErrors.tournamentName}</FormErrorText>
      </FormGroup>
      <fieldset className="border-2 rounded-md p-1">
        <legend>Player Names</legend>
        <FormErrorText>{formErrors.players}</FormErrorText>
        {
          formValues.players.map((p, i) => <FormGroup key={i}>
            <FormLabel htmlFor={`player${i}`}>Player {i + 1}</FormLabel>
            <FormInputText name={`player${i}`} value={p} onChange={(evt) => handlePlayerChange(evt, i)} after={<button className="text-gray-400 ml-1" onClick={(evt) => handleRemovePlayer(evt, i)}>x</button>} />
          </FormGroup>)
        }
        <Button onClick={handleAddPlayer} color="green">Add Player</Button>
      </fieldset>
      <FormActions>
        <FormInputSubmit value="Submit" color="blue" />
      </FormActions>
    </form>
  </div>
}

type FormErrorTextProps = {
  children?: React.ReactNode
}

function FormErrorText({ children }: FormErrorTextProps) {
  return <div className="text-red-600 col-start-2 col-span-2">{children}</div>;
}

type FormActionsProps = {
  children?: React.ReactNode
}

function FormActions({ children }: FormActionsProps) {
  return <div className="flex flex-row justify-end">
    {children}
  </div>
}

type FormInputTextProps = {
  name: string
  value: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  after?: React.ReactNode
}

function FormInputText({name, value, onChange, after}: FormInputTextProps) {
  return <span className="col-span-2">
    <input
      className="border-blue-300 focus:border-blue-500 border-2 rounded-lg p-1"
      name={name}
      type="text"
      value={value}
      onChange={onChange}
    />
    {after}
  </span>;
}

type FormInputSubmitProps = {
  color?: string
  value: string
}

function FormInputSubmit({ value, color = "gray" }: FormInputSubmitProps) {
  return <input
    className={`border-${color}-400 hover:border-${color}-500 active:border-${color}-600 border-2 rounded-lg p-1 bg-${color}-200 active:bg-${color}-300 outline-none focus:outline-none m-1`}
    type="submit"
    value={value}
  />;
}

type ButtonProps = {
  color?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  children?: React.ReactNode
}

function Button({ onClick, children, color = "gray" }: ButtonProps) {
  return <button
    className={`border-${color}-400 hover:border-${color}-500 active:border-${color}-600 border-2 rounded-lg p-1 bg-${color}-200 active:bg-${color}-300 outline-none focus:outline-none`}
    onClick={onClick}>
    {children}
  </button>
}

type FormGroupProps = {
  children?: React.ReactNode
}

function FormGroup({ children }: FormGroupProps) {
  return <div className="grid grid-cols-3">
    {children}
  </div>
}

type FormLabelProps = {
  children: React.ReactNode
  htmlFor: string
}

function FormLabel({ children, htmlFor }: FormLabelProps) {
  return <label htmlFor={htmlFor}>{children}</label>

}

export default App;
