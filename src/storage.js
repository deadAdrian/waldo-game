import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, getDocs, collection, query, orderBy} from "firebase/firestore";
import uniqid from "uniqid";
import React from "react";

const firebaseConfig = {
    apiKey: "AIzaSyDkdX7mAyZy4i4mhZQhhXwImtyw2MkCAwU",
    authDomain: "pokewaldo-1a6a5.firebaseapp.com",
    projectId: "pokewaldo-1a6a5",
    storageBucket: "pokewaldo-1a6a5.appspot.com",
    messagingSenderId: "130661906668",
    appId: "1:130661906668:web:3bdb4239cab465cfdc0dc9",
    measurementId: "G-6GSDT3R0SE"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const docRef = doc(db, "cities", "SF");

const setHighscores = async (info) => {
    try {
        if(info.name !== ''){
            await setDoc(doc(db, "scores", `${info.name}`), {score: info.score});
        }else{
            alert('Sorry, you have to input a valid name.');
        }
      
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

const getHighscores = async () => {
    let players = [];
    let q = query(collection(db, "scores"), orderBy("score", "asc"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        players.push(doc);
    });

    return (
        <div className="highscoreScores">
            {
                players.map((element) => {
                    return (
                        <p key={uniqid()}>{element.id}: {element.data().score}</p>
                    );
                })
            }
        </div>
    );
    
    
}

export {setHighscores, getHighscores};