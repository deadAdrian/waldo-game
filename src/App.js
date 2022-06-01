import './App.css';
import React, {useState, useEffect} from 'react';
import uniqid from "uniqid";
import { GameImage } from './component/gameImg';
import { Header } from './component/header';
import { Modal } from './component/modal';
import {setHighscores, getHighscores} from './storage.js';
import { HighscoreModal } from './component/highscoreModal';
import { PokeModal } from './component/pokeModal';
import {ScoreModal} from './component/scoreModal';
import {Footer} from './component/Footer';


function App() {
  const [modal, setModal] = useState({top: 100, left:700, show: false});
  const [userClick, setUserClick] = useState({x: 0, y:0});
  const [modal1, setModal1] = useState(true);
  const [showhighscoreModal, setShowHighscoreModal] = useState(false);
  const [pokeModal, setPokeModal] = useState({show: false, poke: '', clicked:false, find: false});
  const [highscoreChange, setHighscoreChange] = useState(0);
  const [submitModal, setSubmitModal] = useState({show: false, name: ""}); 
  const [timer, setTimer] = useState([0,0,0,0]);
  let interval1;
  const randomPoke = () => {
    const pokemonsObj = [
      {
        name: 'Gengar', 
        hitbox:[50, 122,467,532],
        src: '/assets/imgs/gengar.jpg',
        id: uniqid(),
      },
      {
        name: 'Ditto',
        hitbox:[814, 860, 198, 235],
        src: '/assets/imgs/ditto.png',
        id: uniqid(),
      },
      {
        name: 'Abra',
        hitbox:[547, 609, 529, 584],
        src: '/assets/imgs/abra.png',
        id: uniqid(),
      },
    ];

    return pokemonsObj;
  }
  const [pokemons, setPokemons] = useState(randomPoke());

  useEffect(() => {
    if(timer[3] === 1){
        interval1 = setInterval(() => {
            setTimer((timer) => {

                if(timer[2] === 59){
                    return [timer[0], timer[1] + 1, 0, 1];
                }if(timer[1] === 59){
                    return [timer[0] + 1, 0, 0, 1];
                }else{
                    return [timer[0], timer[1], timer[2] + 1, 1];
                }
            });
        }, 1000);
    }
    return () => {
      clearInterval(interval1);
      interval1 = null;
    };

  }, [timer[3]]);

  useEffect(() => {
    if(pokemons.length === 0){
      showSubmitScoreModal();
    }
  },[pokemons]);

  

  const showModal = (e) => {
    if(modal.show){
      setModal({...modal, show: false});
      return;
    }
    
    let newClick = {x: e.screenX - e.target.getBoundingClientRect().left, y: e.screenY - e.target.getBoundingClientRect().top};
    setModal({top: e.screenY - 70, left:e.screenX, show: true});
    setUserClick(newClick);
  }

  const findPokemon = (e) => {
    for(let pokemon of pokemons){
      if((userClick.x > pokemon.hitbox[0] && userClick.x < pokemon.hitbox[1]) && (userClick.y > pokemon.hitbox[2] && userClick.y < pokemon.hitbox[3]) && e.target.textContent === pokemon.name){
        console.log(`Congratz, you've found ${pokemon.name}`);
        let pokemonsCopy = [...pokemons];
        for(let x in pokemonsCopy){
          if(pokemonsCopy[x].name === pokemon.name){
            pokemonsCopy.splice(x,1);
            break;
          }
        }
        showPokeModal(pokemon.name, true);
        setPokemons(pokemonsCopy);
        return;
      }
    }
    showPokeModal('Nope, nothing here!', false);
  }

  const showSubmitScoreModal = () => {
    setSubmitModal({...submitModal, show: true});
  }
  const hideSubmitScoreModal = () => {
    setSubmitModal({...submitModal, show: false});
  }

  const submitScore = () => {
    setTimer((timer) => [0,0,0,0]);
    if(submitModal.name.length > 0){
      let info = {
        name: submitModal.name,
        score: `${timer[0] > 9 ? timer[0] : '0'+ timer[0]}:${timer[1] > 9 ? timer[1] : '0'+ timer[1]}:${timer[2] > 9 ? timer[2] : '0'+ timer[2]}`,
      }
      setHighscores(info);
      hideModal1();
      setPokemons(randomPoke());
      if(highscoreChange){
        setHighscoreChange(0);
      }else{
        setHighscoreChange(1);
      }
      setSubmitModal({show: false, name: ""});
    }else{
      alert('Please enter a valid name!');
    }
  }

  const showHighModal = () => {
    if(showhighscoreModal){
      setShowHighscoreModal(false);
    }else{
      setShowHighscoreModal(true);
    }
    
  }
  const hideHighModal = () => {
    setShowHighscoreModal(false);
  }

  const showPokeModal = (pokemon, find) => {
    if(pokeModal.clicked){
      setPokeModal({...pokeModal, show: true, poke: pokemon, clicked: false, find: find});
    }else{
      setPokeModal({...pokeModal, show: true, poke: pokemon, clicked: true, find:find});
    }
  }

  const hidePokeModal = () => {
    setPokeModal({...pokeModal, show: false});
  }

  const hideModal1 = () => {
    if(modal1){
      setModal1(false);
      setTimer((timer) => [0,0,0,1]);
    }else{
      setModal1(true);
    }
  }


  return (
    <div className="App" >
      <Header timer={timer} pokemons={pokemons}/>
      <ScoreModal info={submitModal} submitModal={submitModal} setSubmitModal={setSubmitModal} submitScore={submitScore} />
      <PokeModal hidePokeModal={hidePokeModal} info={pokeModal} userClick={userClick} />
      <button className='highButton' onClick={showHighModal}>Highscores</button>
      <HighscoreModal change={highscoreChange} show={showhighscoreModal}/>
      <Modal info={modal} findPokemon={findPokemon} userClick={userClick} showModal={showModal} pokemons={pokemons} setPokemons={setPokemons} pokeModal={pokeModal} setPokeModal={setPokeModal}/>
      <GameImage showModal={showModal} hideHighModal={hideHighModal} modal1={modal1} hideModal1={hideModal1} setUserClick={setUserClick} userClick={userClick}/>
      <Footer/>
    </div>
  );
}

export default App;
