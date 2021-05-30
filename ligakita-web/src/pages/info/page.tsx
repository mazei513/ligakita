import { useParams } from "react-router-dom";


type TournamentInfoPageParams = {
    tournamentId: string
}

export function TournamentInfoPage() {
    const { tournamentId } = useParams<TournamentInfoPageParams>();
    return <div>
        <h2>Tournament Info</h2>
        <p>{tournamentId}</p>
    </div>;
}