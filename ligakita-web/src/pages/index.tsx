import React from "react";
import { Link } from "react-router-dom";

export function HomePage() {
    return <div>
        <h2>Welcome to LigaKita</h2>
        <Link to="/new">New Tournament</Link>
    </div>
}