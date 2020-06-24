import React, { Component } from 'react';
import renderBreadcrumbs from '../functions/breadcrumbsFunctions';
import  TOPICS  from '../data/topics';
import NumericEntryQuestion from "./TaskType/QuantitativeReasoning/NumericEntryQuestion";

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            loading: true,
            topic: 0,
            globalTopic: 0,
            subtopic: 0,
            order: 0,
            update:true
        }
    }

    shouldComponentUpdate() {
        console.log(this.state.update,'update?')
        return this.state.update === true
    }
    
    componentDidMount() {//может быть в другом месте жизненного цикла это делать?!?!
        this.setState({topic: this.props.location.state.id});
        let top = TOPICS.find(topic => topic.id == this.props.location.state.id);
        let globalTopic = TOPICS.find(topic => topic.id == top.breadcrumbs[2]);
        let subtopic = TOPICS.find(topic => topic.id == top.breadcrumbs[top.breadcrumbs.length-1]);
        this.setState({globalTopic: globalTopic, subtopic: subtopic});
         this.loadTasks(this.getTopic(globalTopic.title), this.getSubtopic(subtopic.title))
            .then(() => console.log('tasks', this.state.tasks));//здесь можно then для вызова renderTasks
    }

    static renderTask(task)
    {
        if(task.taskType === 'NumericEntryQuestion')
        {
            return <NumericEntryQuestion task={task}/>
        }
       /* if(task.taskType === 'MultipleChoiceQuestionSelectOneAnswer')
        {
            return <MultipleChoiceQuestionSelectOneAnswer task={task} />
        }*/
    }
    static renderTasks(tasks) {
       
        return (
            <div className="container">
                {this.renderTask(tasks[1])}
            </div>
        );
    }

    render() {
        let tasks = this.state.loading
            ? <p><em>Loading...</em></p>
            : Task.renderTasks(this.state.tasks)//Task.renderTasks(this.state.tasks);

        return (
             <div>
                 {renderBreadcrumbs(this.state)}
                 {tasks}
             </div>
        );
    }
    
     async loadTasks(topic, subtopic) {
        const path = `task/${topic}/${subtopic}`;
        const response = await fetch(path, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({subtopic: subtopic, topic: topic})
        });
        const data = await response.json();
        this.setState({tasks: data, loading: false, update: false});
    }

    getSubtopic(subtopic) {
        if (subtopic === 'Discrete Questions') {
            return subtopic.trim();
        }
        if(subtopic === 'Standard Deviation And Normal Distribution') {
            return subtopic.replace(/\s/g, '');
        }
    }

    getTopic(topic) {
        if(topic === 'Verbal Reasoning')
            return 'vr';
        if(topic === 'Quantitative Reasoning')
            return 'qr';
    }
}

export default Task;