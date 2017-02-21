import React, { Component } from 'react';
import './../App.css';

class ControlPanel extends Component {
    showPanel(panelVisible){
        if(panelVisible){
            return <div style={{width: "200px", height: "100%", backgroundColor: "#ffffff", position: "absolute", top: "0"}}></div>
        }else{
            return <div style={{width: "30px", height: "100%", backgroundColor: "#ffffff", position: "absolute", top: "0"}}></div>
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