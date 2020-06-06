import React, { Component } from 'react';
import Breadcrumbs from "./Breadcrumbs";
import Topics from './Topics';

class TopicTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            update:true,
            id: 0
        }
    }

    shouldComponentUpdate() {
        {console.log('proooooops', this.props)}
        {console.log('update', this.state.update)}
        return this.state.update !== true
    }
 
    renderTopics(props) {
        if (props.match !== undefined) {
            return <Topics topic={props.match.params.id} />
        } else {
            return <Topics topic={props.topic} />}
    }

    renderBreadcrumbs(props) {
        if (props.match !== undefined) {
            return <Breadcrumbs topic={props.match.params.id} />
        } else {
            return <Breadcrumbs topic={props.topic} />
        }
    }
    
    setStateManually(props) {
        if(props.match !== undefined) {
            if(props.match.params.id !== this.state.id) {
                {console.log('they are not equal')}
                return this.setState({id: props.match.params.id, update: true})
            }
            else {
                    console.log('they are equal');
                    return this.setState({update: false})  
            }
        } else {
            {console.log('why am i here?')}
            return this.setState({id: props.topic, update: false})
        }
    }

    render() {
        return(
            <div>
                {console.log('i was here!')}
                {this.setStateManually(this.props)}
                {this.renderBreadcrumbs(this.props)}
                {this.renderTopics(this.props)}
            </div>
        );
    }
}

export default TopicTasks;

