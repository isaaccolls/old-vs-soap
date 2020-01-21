import React, { Component } from 'react';
import Images from './assets/Images';

class Floor extends Component {
    render() {
        const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
        const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height / 2;

        const imageIterations = Math.ceil(width / height);

        var divStyle = {
            position: 'absolute',
            top: y,
            left: x,
            width: width,
            height: height,
            overflow: 'hidden',
            flexDirection: 'row',
        };

        return (
            <div style={divStyle}>
                {Array.apply(null, Array(imageIterations)).map((el, idx) => {
                    return <img style={{ width: height, height: height }} key={idx} src={Images.floor} alt="this is the floor" />;
                })}
            </div>
        )
    }
}

export default Floor;