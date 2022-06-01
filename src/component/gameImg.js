import React, {useState} from "react";
import { Modal1 } from './modal1';
const GameImage = (props) => {

    // const clickedHere = (e) => {
    //     let rectImg = {
    //         top: e.clientY - e.target.getBoundingClientRect().top,
    //         left: e.clientX - e.target.getBoundingClientRect().left,
    //     };

    //     if((rectImg.left > 428 && rectImg.left < 474) && (rectImg.top > 357 && rectImg.top < 394)){
    //         alert('You have found abra');
    //     }else{
    //         alert(`${rectImg.left}, ${rectImg.top}`);
    //     }
    // }

    

    return (
        <div>
            <div className='imgContainer'>
                <Modal1 show={props.modal1} hideModal1={props.hideModal1} hideHighModal={props.hideHighModal}/>
                <img src={`${process.env.PUBLIC_URL}/assets/imgs/pokemonWaldo.jpg`} onClick={(e) => {
                    props.showModal(e);
                    props.hideHighModal();
                }}/>
            </div>
            <div className="noGame4U">
                <h2>I'm sorry but this game does not work well on your current screen, try a larger device!</h2>
            </div>
        </div>
        
    );
}

export {GameImage};