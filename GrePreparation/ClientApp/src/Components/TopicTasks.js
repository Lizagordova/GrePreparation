﻿import React, { Component, PureComponent} from 'react';
import Topics from './Topics';
import Task from './Task';
import renderBreadcrumbs from '../functions/breadcrumbsFunctions';
import { Redirect } from "react-router-dom";
import  TOPICS  from '../data/topics';

class TopicTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            update:true
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.match.params.id !== this.props.match.params.id) {
            this.setState({update: true})
        }
    }

    shouldComponentUpdate() {
            return this.state.update === true
    }
 
    renderTopics(props) {
        if (props.match !== undefined) {
            let topic = TOPICS.find(topic => topic.id == props.match.params.id);
            if(topic.subtopics == 0)
            {
               return <Redirect to={{pathname: "/topictasks/task", state: {id: props.match.params.id}}}/> 
            }
            return <Topics topic={props.match.params.id} />
        } else {
            return <Topics topic={props.topic} />}
    }

    render() {
        return(
            <div>
                {renderBreadcrumbs(this.props)}
                {this.renderTopics(this.props)}
            </div>
        );
    }
}

export default TopicTasks;

