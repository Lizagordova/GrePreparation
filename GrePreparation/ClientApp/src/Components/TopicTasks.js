import React, { Component, PureComponent} from 'react';
import Topics from './Topics';
import renderBreadcrumbs from '../functions/breadcrumbsFunctions';

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

