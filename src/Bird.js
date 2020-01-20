import React, { Component } from 'react';

class  Bird extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height / 2;

        var divStyle = {
            position: 'absolute',
            top: y,
            left: x,
            width: width,
            height: height,
            backgroundColor: this.props.color,
        };

        return (
            <div style={divStyle}>
                
            </div>
        )
    }
}

export default Bird;