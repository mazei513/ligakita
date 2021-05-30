import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


type TournamentInfoPageParams = {
    tournamentId: string
}

type TournamentInfo = {
    uid: string
    name: string
    matches: Match[]
}

type Match = {
    uid: string
    name: string
    score1?: string
    score2?: string
    player1: Player
    player2: Player
    scheduledOn: Date
    startedOn?: Date
    completedOn?: Date
}

type Player = {
    uid: string
    name: string
}

export function TournamentInfoPage() {
    const { tournamentId } = useParams<TournamentInfoPageParams>();
    const [isLoading, setIsLoading] = useState(true);
    const [tournamentInfo, setTournamentInfo] = useState<TournamentInfo>({uid: "", name: "", matches: []})

    useEffect(() => {
        setTimeout(() => {
            // simulate loading
            const newState = {
                ...tournamentInfo,
                uid: tournamentId,
                name: "Super Special All-Stars Invitational",
                matches: [
                    {uid:"1", name: "Quarter Finals 1", player1: {uid: "1", name: "Alan"}, player2: {uid: "2", name: "Tim"}, scheduledOn: new Date()},
                    {uid:"2", name: "Quarter Finals 2", player1: {uid: "3", name: "John"}, player2: {uid: "4", name: "Jim"}, scheduledOn: new Date(), score1: "20", score2: "7"}
                ],
            };
            setTournamentInfo(newState);
            setIsLoading(false);
        }, 1000);
    }, [tournamentId]);

    return <div>
        <header className="min-h-1/10">
            <div className="container">
                <h2>Tournament Info</h2>
                <h3>{tournamentInfo.name}</h3>
            </div>
        </header>
        <main className="h-full">
            <div className="container flex flex-col">
                {isLoading && <Spinner />}
                {tournamentInfo.matches.map((m) => <MatchCard key={m.uid} match={m} />)}
            </div>
        </main>
    </div>;
}

type MatchCardProps = {
    match: Match
}

function MatchCard({match}: MatchCardProps) {
    return <div className="rounded-lg shadow-md p-4 m-2 bg-green-50 flex-1">
        <div className="flex justify-center">{match.name}</div>
        <div className="flex justify-center text-gray-500">Starts at {match.scheduledOn.toLocaleString()}</div>
        <div className="flex justify-center">
            <div className="px-4">{match.player1.name}</div>
            {match.score1 && <div className="text-gray-700">{match.score1}</div>}
            <div>&nbsp;-&nbsp;</div>
            {match.score2 && <div className="text-gray-700">{match.score2}</div>}
            <div className="px-4">{match.player2.name}</div>
        </div>
    </div>
}

function Spinner() {
    return <div className="w-12 h-12 bg-blue-500 rounded-3xl animate-pulse" />
}