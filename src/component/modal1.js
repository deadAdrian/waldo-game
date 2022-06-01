import React from "react";

const Modal1 = (props) => {

    if(!props.show){
        return null;
    }
    return(
        <div className="modal1" onClick={props.hideHighModal}>
            <p>Greetings, this is a Where's Waldo like game, but with POKEMONS!</p>
            <p>You'll have to find 3 Pokemons that are listed when you click the image. In the top-right corner you have the remaining number of pokemons.</p>
            <p>When you click the image, the missing Pokemons will show and you must select the one you've clicked.</p>
            <p>The game ends when you find all 3. In the top-left corner you have a timer that will start when you click Begin.</p>
            <p>Good Luck!</p>
            <button onClick={props.hideModal1}>Begin</button>
        </div>
    );
}

export {Modal1}