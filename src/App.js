import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
function Square({handler, val}){
  const [value, setValue] = useState("");
  function handlePress(){
    if(value == ""){
      let x = handler(val);
      setValue(x);
    }
  }
  return <button className='square' onClick={handlePress}>{value}</button>;
}
function convertValToPos(x){
  return [Math.floor(x/3),x%3];
}
function checkIfWin(gameState){
  for(let i = 0; i < 3; i++){
    if(gameState[0][i] == gameState[1][i] && gameState[1][i] == gameState[2][i] && gameState[0][i] != ""){
      return gameState[0][i];
    }
    else if(gameState[i][0] == gameState[i][1] && gameState[i][1] == gameState[i][2] && gameState[i][0] != ""){
      return gameState[i][0];
    }
  }
  if(gameState[0][0] == gameState[1][1] && gameState[1][1] == gameState[2][2] && gameState[0][0] != ""){
    return gameState[0][0];
  }
  if(gameState[2][0] == gameState[1][1] && gameState[1][1] == gameState[0][2] && gameState[2][0] != ""){
    return gameState[2][0];
  }
  else{
    return "";
  }
}
export default function Board(){
  const [turn, setTurn] = useState("X");
  const [gameState, setGameState] = useState([["", "", ""],["", "", ""],["", "", ""]]);
  const [winner, setWinner] = useState("");
  const [refresh, setRefresh] = useState(false);
  function onResetButton(){
    setRefresh(true);
    setWinner("");
    setTurn("X");
    setGameState([["", "", ""],["", "", ""],["", "", ""]]);
    console.log(refresh);
  }
  function onPress(value){
    if(winner == ""){
      let x = turn;
      let v = convertValToPos(value);
      gameState[v[0]][v[1]] = x;
      if(turn == "X"){
        setTurn("O");
      }
      else{
        setTurn("X");
      }
      let k = checkIfWin(gameState);
      setWinner(k);
      return x;
    }
  }
  return (
    <div>
      {refresh ? (<div><button onClick={() => {setRefresh(false)}}>Press Me to finish reset!</button></div>) :
    (<div>
      <div className='board-row'>
      <Square handler={onPress} val={0}/>
      <Square handler={onPress} val={1}/>
      <Square handler={onPress} val={2}/>
    </div>
     <div className='board-row'>
      <Square handler={onPress} val={3}/>
      <Square handler={onPress} val={4}/>
      <Square handler={onPress} val={5}/>
   </div>
    <div className='board-name'>
      <Square handler={onPress} val={6}/>
      <Square handler={onPress} val={7}/>
      <Square handler={onPress} val={8}/>
  </div>
  </div>)}
  <div className='board-name'>
    The winner is {winner}
    <button onClick={onResetButton}>Reset?</button>
  </div>
  </div>
  );
};