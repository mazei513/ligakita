import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormLabel, FormInputText, FormErrorText, Button, FormActions, FormInputSubmit } from "../../components/form";

type TournamentFormValues = {
    tournamentName: string
    players: string[]
}

type TournamentFormErrors = {
    tournamentName?: string
    players?: string
}

export function NewTournamentPage() {
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
