import React, { Component } from 'react';
import {debounce} from 'throttle-debounce';
import './../App.css';

class ControlPanel extends Component {
    constructor(props) {
        super(props);
        this.changeSubject = debounce(750, this.changeSubject);
    }

    showPanel(panelVisible) {
        if (panelVisible) {
            return <div style={{ width: "200px", height: "100%", backgroundColor: "#ffffff", position: "absolute", top: "0" }}>
                <input type="text" value={this.props.input} onChange={this.props.handleChange.bind(this)} onKeyUp={this.changeSubject.bind(this, this.props.socket, this.props.input)} style={{ marginTop: "60" }}></input>
            </div>
        } else {
            return <div style={{ width: "30px", height: "100%", backgroundColor: "#ffffff", position: "absolute", top: "0" }}></div>
        }
    }

    changeSubject(socket) {
        if (this.state.input !== this.state.lastInput) {
            socket.emit('change query', this.state.input);
            this.setState({ lastInput: this.state.input, tweets: [] });
        }
    }

    render() {
        return (
            <div className="ControlPanel">
                {this.showPanel(this.props.panelVisible)}
            </div>
        );
    }
}

export default ControlPanel;