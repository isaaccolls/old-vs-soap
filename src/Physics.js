import Matter from 'matter-js';
import Constants from './Constants';

let tick = 0;
let pose = 1;

const Physics = (entities, { input, time }) => {
    let engine = entities.physics.engine;
    let world = entities.physics.world;
    let bird = entities.bird.body;

    let hadTouches = false;
    input.filter(t => t.name === "onClick").forEach(t => {
        if (!hadTouches) {
            if (world.gravity.y === 0.0) {
                world.gravity.y = 1.2;
            }
            hadTouches = true;
            Matter.Body.setVelocity(bird, {
                x: bird.velocity.x,
                y: -10
            });
        }
    });

    Matter.Engine.update(engine, time.delta);

    Object.keys(entities).forEach(key => {
        if (key.indexOf("floor") === 0) {
            if (entities[key].body.position.x <= -1 * (Constants.MAX_WIDTH / 2)) {
                Matter.Body.setPosition(entities[key].body, {x: Constants.MAX_WIDTH + (Constants.MAX_WIDTH / 2), y: entities[key].body.position.y});
            } else {
                Matter.Body.translate(entities[key].body, {x: -2, y: 0});
            }
        }
    });

    tick += 1;
    if (tick % 5 === 0) {
        pose = pose + 1;
        if (pose > 3) {
            pose = 1;
        }
        entities.bird.pose = pose;
    }

    return entities;
}

export default Physics;
