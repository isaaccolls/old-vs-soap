import Matter from 'matter-js';

let tick = 0;
let pose = 1;

const Physics = (entities, { input, time }) => {
    let engine = entities.physics.engine;
    let bird = entities.bird.body;

    input.filter(t => t.name === "onClick").forEach(t => {
        Matter.Body.applyForce( bird, bird.position, { x: 0.00, y: -0.10 });
    });

    Matter.Engine.update(engine, time.delta);

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
