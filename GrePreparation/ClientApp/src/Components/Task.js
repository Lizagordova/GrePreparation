import React, { Component, PureComponent} from 'react';
import renderBreadcrumbs from '../functions/breadcrumbsFunctions';
import  TOPICS  from '../data/topics';
import DiscreteQuestions from "./TaskType/VerbalReasoning/DiscreteQuestions";

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            loading: true,
            topic: 0,
            globalTopic: 0,
            taskType: 0
        }
    }
    
    componentDidMount() {//может быть в другом месте жизненного цикла это делать?!?!
        this.setState({topic: this.props.location.state.id});
        let top = TOPICS.find(topic => topic.id == this.props.location.state.id);
        let globalTopic = TOPICS.find(topic => topic.id == top.breadcrumbs[2]);
        let taskType = TOPICS.find(topic => topic.id == top.breadcrumbs[top.breadcrumbs.length-1]);
        this.setState({globalTopic: globalTopic, taskType: taskType});
        console.log(this.getTopic(globalTopic.title), this.getTaskType(taskType.title));
        this.loadTasks(this.getTopic(globalTopic.title), this.getTaskType(taskType.title))
            .then(() => console.log('tasks', this.state.tasks));//здесь можно then для вызова renderTasks
    }


    
  

    render() {
        let tasks = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.componentSwitcher(this.state.taskType.title)//Task.renderTasks(this.state.tasks);

        return (
             <div>
                 {renderBreadcrumbs(this.state)}
                 {tasks}
             </div>
        );
    }
    
     async loadTasks(topic, taskType) {
        const path = `task/${topic}/${taskType}`;
        const response = await fetch(path, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tasktype:"DiscreteQuestions", level: "Easy", topic: "VerbalReasoning"})
        });
        
        const data = await response.json();
        this.setState({tasks: data[0].tasks, loading: false});
    }

    componentSwitcher(type) {
        if(type === 'Discrete Questions')
            return <DiscreteQuestions tasks={this.state.tasks}/>
    }

    getTaskType(taskType) {
        if(taskType === 'Discrete Questions')
            return 'discretequestions';
    }

    getTopic(topic) {
        if(topic === 'Verbal Reasoning')
            return 'vr';
    }
}

export default Task;