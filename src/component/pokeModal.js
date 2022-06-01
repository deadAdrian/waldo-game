import React, {useEffect} from "react";

const PokeModal = (props) => {

    useEffect(() => {
        const timeaut = setTimeout(props.hidePokeModal, 3000);

        return () => {clearTimeout(timeaut)};
    }, [props.info.clicked]);

    if(!props.info.show){
        return null;
    }

    return (
        <div>
            {
                props.info.find && <div className="pokeModal" style={{backgroundColor: "#00ff19"}}>
                    <p>You've found {props.info.poke}!</p>
                </div> 
            }
            {
                !props.info.find && <div className="pokeModal" style={{backgroundColor: "#ff1900"}}>
                    <p>{props.info.poke}</p>
                </div>
            }
            

            
        </div>
        
    );
}

export {PokeModal};