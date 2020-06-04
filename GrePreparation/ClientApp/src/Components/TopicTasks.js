import React, { Component } from 'react';
import Breadcrumbs from "./Breadcrumbs";
import Topics from './Topics';

class TopicTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            update:true
        }
    }

    shouldComponentUpdate() {
        return this.state.update === true
    }

    render() {
        return(
            <div>
                {this.setState({update: false})}
                <Breadcrumbs breadcrumbs={this.props.breadcrumbs} />
                <Topics topic={this.props.topic} />
            </div>
        );
    }
}

export default TopicTasks;