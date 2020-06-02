import React, { Component } from 'react';
import Breadcrumbs from "./Breadcrumbs";

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
                {console.log('topic tasks',this.props.breadcrumbs)}
                <Breadcrumbs breadcrumbs={this.props.breadcrumbs} />
            </div>
        );
    }
}

export default TopicTasks;