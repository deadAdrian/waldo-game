import React from "react";

const ScoreModal = (props) => {

    if(!props.info.show){
        return null;
    }

    const handleChange = (e) => {
        let newInput = e.target.value;
        props.setSubmitModal({...props.submitModal, name: newInput});
    }

    return(
        <div className="scoreModalShadow">
            <div className="submitScoreModal">
                <h3>Congratz, type in your name to get into the highscores!</h3>
                <input value={props.submitModal.name} onChange={handleChange} className="inputScore" type="text" maxLength="12"/>
                <div className="submitButtonDiv">
                    <button className="submitButton" onClick={props.submitScore}>Submit</button>
                </div>
            </div>
        </div>
        
    );
}

export {ScoreModal};