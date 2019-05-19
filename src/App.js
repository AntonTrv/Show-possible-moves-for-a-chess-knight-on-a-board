import React from 'react';
import './App.css';
import Block from './Components/Block'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      movementLimits: [1, -1, 2, -2], // limits of possible movement on each axis
      availableMoves: [],
      board: [],

    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getAllMoves = this.getAllMoves.bind(this);
    this.getAllAvailableMoves = this.getAllAvailableMoves.bind(this);
    this.results = this.results.bind(this);
  }

  componentDidMount(){
    let board = [];
    for(let i = 0; i < 8; i++){

      for(let j = 0; j < 8; j++){
        if((i+j)%2){
        board.push(`block ${i+1} 0${j+1} black `)
      }else{
        board.push(`block ${i+1} 0${j+1}`)
        }
      }
    }
    this.setState({board: board})
  }

  /*
    extracts X/Y coordinates,
    gathers all theoretically possible moves,
    passes data to resolver
  */
  handleSubmit(e) {
    const startCoordsX = parseInt(e.target.classList[2]);
    const startCoordsY = parseInt(e.target.classList[1]);
    const xAxisMoves = this.getAllMoves(startCoordsX);
    const yAxisMoves = this.getAllMoves(startCoordsY);
    this.getAllAvailableMoves(startCoordsX, startCoordsY, xAxisMoves, yAxisMoves);

  }

  /*
    recieves initial coords,
    evaluates theoretically possible moves(*tpm*)
  */

  getAllMoves(coordinates) {
    const moves = [];
    this.state.movementLimits.map(move => (((coordinates - move > 0) && (coordinates - move < 9))
      ? moves.push(coordinates - move) : null));
    return moves;

  }

  /*
    recieves initial coords & tpm,
    evaluates module number of total movement X+Y axis, should be equal to 3,
    pushes to state
  */

  getAllAvailableMoves(startCoordsX, startCoordsY, xAxisMoves, yAxisMoves) {
    const gotAllMoves = [];
    xAxisMoves.map(i => yAxisMoves.map(j => ((Math.abs(startCoordsX - i) + Math.abs(startCoordsY - j) === 3)
      ? gotAllMoves.push([i, j]) : null)));
    this.setState({ availableMoves: gotAllMoves.map(i => i) });

    this.results();
  }

  /*
  gathers all tiles,
  checks if classList of tiles equal to values from state's availableMoves,
  edits approven tiles color
  */

  results(){
    let storeAllTiles = [...document.getElementsByClassName('block')];
    let storeMoveTiles = [];

    this.state.availableMoves.map((el) =>
    storeAllTiles.map((value)=>
    (el[0]===parseInt(value.classList[2])) && (el[1]===parseInt(value.classList[1])) ?
    storeMoveTiles.push(value) : console.log('no')
  ))
  storeMoveTiles.map(el => el.style.backgroundColor='red')
  if(this.state.availableMoves.length){
    
  }
  }

  render(){
    return (
      <div className="app">
        {this.state.board.map((el,i)=> <Block key={i} data={el} handleClick={this.handleSubmit}/> )}

      </div>
    );
  }

}

export default App;
