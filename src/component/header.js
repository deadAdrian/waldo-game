import React from "react";

const Header = (props) => {

    return(
        <div className="headerDiv">
            <p>{`${props.timer[0] > 9 ? props.timer[0] : '0'+ props.timer[0]}:${props.timer[1] > 9 ? props.timer[1] : '0'+ props.timer[1]}:${props.timer[2] > 9 ? props.timer[2] : '0'+ props.timer[2]}`}</p>
            <h1>Where's Waldo (Pokemon Version)</h1>
            <p className="pokemonQnt">{props.pokemons.length}</p>
        </div>
    );
}

export {Header};