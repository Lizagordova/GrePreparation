import React, { Component } from 'react';
import Breadcrumbs from "./Breadcrumbs";

class TopicTasks extends Component {
    render() {
        return(
            <div>
                <Breadcrumbs topics={[0,1]} />
                Topic Tasks
            </div>
        );
    }
}

export default TopicTasks;