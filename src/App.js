import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Constants from './Constants';
import { GameEngine } from 'react-game-engine';
import Matter from 'matter-js';
import Bird from './Bird';

class App extends Component {

  constructor(props) {
    super(props);
    this.gameEngine = null;
    this.entities = this.setupWorld();
  }

  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    let bird = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 4, Constants.MAX_HEIGHT / 2, 50, 50);
    Matter.World.add(world, [bird]);

    return {
      pyshics: { engine: engine, world: world },
      bird: { body: bird, size: [50, 50], color: 'purple', renderer: Bird },
    }
  }

  render() {
    return (
      <div className="App">
          <p>IC</p>
          <GameEngine
            ref={(ref) => {this.gameEngine = ref; }}
            style={styles.gameContainer}
            entities={this.entities}
          />
      </div>
    );
  }

}

const styles = {
  gameContainer: {
    flex: 1,
    width: 800,
    height: 600,
    backgroundColor: 'lightblue',
  }
}

export default App;
