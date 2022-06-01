import React, {useEffect, useState} from "react";
import { getHighscores } from "../storage";

const HighscoreModal = (props) => {
    const [highscore, setHighscore] = useState();

    useEffect(() => {
        const fetchHighscores = async () => {
            const highscores = await getHighscores();
            setHighscore(highscores);
        };
        fetchHighscores().catch(console.error);
    }, [props.change]);

    if(!props.show){
        return null;
    }

    return (
        <div className="modalShadow">
            <div className="highscoreModal">
                <h1>Highscores</h1>
                {highscore}
            </div>
        </div>
        
    );
};

export {HighscoreModal}