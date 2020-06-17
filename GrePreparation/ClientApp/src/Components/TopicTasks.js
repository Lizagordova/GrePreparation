import React, { Component, PureComponent} from 'react';
import Topics from './Topics';
import Task from './Task';
import renderBreadcrumbs from '../functions/breadcrumbsFunctions';
import { Redirect } from "react-router-dom";

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
            {console.log(props.match.params.id)}
            if(props.match.params.id == 23)//здесь, думаю, должна быть проверка на то, чтобы субтопиков не было
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

