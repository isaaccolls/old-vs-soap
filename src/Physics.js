import Matter from 'matter-js';

const Physics = (entities, { input, time }) => {
    let engine = entities.physics.engine;
    let bird = entities.bird.body;

    input.filter(t => t.name === "onClick").forEach(t => {
        Matter.Body.applyForce( bird, bird.position, { x: 0.00, y: -0.10 });
    });

    Matter.Engine.update(engine, time.delta);

    return entities;
}

export default Physics;
