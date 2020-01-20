import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Constants from './Constants';
import { GameEngine } from 'react-game-engine';
import Matter from 'matter-js';
import Bird from './Bird';
import Wall from './Wall';
import Physics from './Physics';

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
    let floor = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 2, Constants.MAX_HEIGHT - 25, Constants.MAX_WIDTH, 50, { isStatic: true });
    let ceiling = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 2, 25, Constants.MAX_WIDTH, 50, { isStatic: true });

    Matter.World.add(world, [bird, floor, ceiling]);

    return {
      physics: { engine: engine, world: world },
      bird: { body: bird, size: [50, 50], color: 'purple', renderer: Bird },
      floor: { body: floor, size: [Constants.MAX_WIDTH, 50], color: 'green', renderer: Wall },
      ceiling: { body: ceiling, size: [Constants.MAX_WIDTH, 50], color: 'green', renderer: Wall},
    }
  }

  render() {
    return (
      <div className="App">
          <GameEngine
            ref={(ref) => { this.gameEngine = ref; }}
            style={styles.gameContainer}
            systems={[Physics]}
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
