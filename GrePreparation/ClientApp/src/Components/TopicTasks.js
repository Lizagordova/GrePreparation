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
 
    renderTopics(props) {
        if (props.match !== undefined) {
            return <Topics topic={props.match.params.id} />
        } else {
            return <Topics topic={props.topic} />}
    }
    
    renderBreadcrumbs(props) {
        if (props.match !== undefined) {
            return <Breadcrumbs breadcrumbs={[0,1,7]} />
        } else {
            return <Breadcrumbs breadcrumbs={this.props.breadcrumbs} />
        }
    }
    render() {
        
        return(
            <div>
                {this.setState({update: false})}
                {this.renderBreadcrumbs(this.props)}
                {this.renderTopics(this.props)}
            </div>
        );
    }
}

export default TopicTasks;

