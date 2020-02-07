import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Constants from './Constants';
import { GameEngine } from 'react-game-engine';
import Matter from 'matter-js';
import Bird from './Bird';
import Floor from './Floor';
import Physics, { resetPipes } from './Physics';
import Images from './assets/Images';

class App extends Component {

  constructor(props) {
    super(props);
    this.gameEngine = null;
    this.entities = this.setupWorld();

    this.state = {
      running: true,
      score: 0,
    }
  }

  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    world.gravity.y = 0.0;

    let bird = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT / 2,
      Constants.BIRD_WIDTH,
      Constants.BIRD_HEIGHT
    );
    let floor1 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT - 25,
      Constants.MAX_WIDTH + 4,
      50,
      { isStatic: true }
    );
    let floor2 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH + (Constants.MAX_WIDTH / 2),
      Constants.MAX_HEIGHT - 25,
      Constants.MAX_WIDTH + 4,
      50,
      { isStatic: true }
    );

    Matter.World.add(world, [bird, floor1, floor2]);

    Matter.Events.on(engine, "collisionStart", (event) => {
      // let pairs = event.pairs;
      console.log("collision detected!!");

      this.gameEngine.dispatch({ type: "game-over"});
    });

    return {
      physics: { engine: engine, world: world },
      floor1: { body: floor1, renderer: Floor },
      floor2: { body: floor2, renderer: Floor },
      bird: { body: bird, pose: 1, renderer: Bird },
    }
  }

  onEvent = (e) => {
    if (e.type === "game-over") {
      this.setState({
        running: false,
      });
    } else if (e.type === "score") {
      this.setState({
        score: this.state.score + 1,
      });
    }
  }

  reset = () => {
    resetPipes();
    this.gameEngine.swap(this.setupWorld());
    this.setState({
      running: true,
      score: 0,
    });
  }

  render() {
    return (
      <div className="App" style={styles.container}>
        <img src={Images.background} style={styles.backgroundImage} alt='background' />
        <GameEngine
          ref={(ref) => { this.gameEngine = ref; }}
          style={styles.gameContainer}
          systems={[Physics]}
          onEvent={this.onEvent}
          running={this.state.running}
          entities={this.entities}
        >
        </GameEngine>
        <h1 style={styles.score}>{this.state.score}</h1>
        {
          !this.state.running &&
            <div style={styles.fullScreen}>
              <div style={styles.gameOverText}>
                <button onClick={this.reset} style={styles.fullScreenButton}>Dale otra!</button>
                <p style={styles.gameOverSubText}>Try again</p>
              </div>
            </div>
        }
      </div>
    );
  }

}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT,
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  gameOverText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'FB',
  },
  gameOverSubText: {
    position: 'absolute',
    color: 'white',
    fontSize: 22,
    fontFamily: 'FB',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    marginTop: Constants.MAX_HEIGHT / 2 + 60,
    marginLeft: Constants.MAX_WIDTH * 0.5,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: 'black',
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenButton: {
    // position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    marginTop: Constants.MAX_HEIGHT / 2,
    marginLeft: Constants.MAX_WIDTH * 0.5,
    fontSize: 32,
    fontFamily: 'FB',
  },
  score: {
    position: 'absolute',
    color: 'white',
    fontSize: 72,
    top: 50,
    left: Constants.MAX_WIDTH / 2 - 20,
    textShadowColor: '#444444',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    fontFamily: 'FB',
  },
}

export default App;
