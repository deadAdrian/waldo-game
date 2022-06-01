import React from "react";

const Modal = (props) => {

    

    if(!props.info.show){
        return null;
    }
    return(
        <div className="modal" style={{top: props.info.top, left: props.info.left}}>
            {
                props.pokemons.map((element) => {
                    return (
                        <div className="modal11" key={element.id} onClick={(e) =>{
                            props.findPokemon(e);
                            props.showModal();
                        }}>
                           <img src={`${process.env.PUBLIC_URL}${element.src}`}/>
                           <p>{element.name}</p> 
                            
                        </div>
                        
                    );
                })
            }
        </div>
    );
}

export {Modal}