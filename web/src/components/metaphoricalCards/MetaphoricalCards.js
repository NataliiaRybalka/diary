import { useState } from "react";

import Card from "./Card";
import MainDescription from "./MainDescription";

import "./Cards.css";

function MetaphoricalCards() {
    const [askQuestion, setAskQuestion] = useState(false);

    return (
        <>
            {!askQuestion ? (
                <MainDescription setAskQuestion={setAskQuestion} />
            ) : (
                <Card />
            )}
        </>
    );
}

export default MetaphoricalCards;
