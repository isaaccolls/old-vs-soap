import React, { Component } from 'react';
import Images from './assets/Images';

class Pipe extends Component {
    render() {
        const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
        const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height / 2;

        const pipeRatio = 160 / width;
        const pipeHeight = 33 * pipeRatio;
        const pipeIterations = Math.ceil(height / pipeHeight);

        return (
            <div
                style={{
                    position: 'absolute',
                    top: y,
                    left: x,
                    width: width,
                    height: height,
                    overflow: 'hidden',
                    flexDirection: 'column',
                }}>
                {Array.apply(null, Array(pipeIterations)).map((el, idx) => {
                    return <img style={{ width: width, height: pipeHeight }} key={idx} src={Images.pipeCore} alt="pipe core" />;
                })}
            </div>
        );
    }
}

export default Pipe;