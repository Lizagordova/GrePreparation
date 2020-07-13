import React, { Component } from 'react';
import renderBreadcrumbs from '../../functions/breadcrumbsFunctions';
import  TOPICS  from '../../data/topics';
import NumericEntryQuestion from "../TaskType/QuantitativeReasoning/NumericEntryQuestion";

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            loading: true,
            topicId: 0,
            globalTopic: 0,
            subtopic: 0,
            order: 1,
            update:true
        };
        this.orderChange = this.orderChange.bind(this);
    }

    orderChange(order)
    {
        this.setState({order: order});
        this.state.order = order;
    }

    componentDidMount() {//может быть в другом месте жизненного цикла это делать?!?!
        let topic = TOPICS.find(topic => topic.id == this.props.location.state.id);
        this.setState({topicId: topic.id});
        let globalTopic = TOPICS.find(top => top.id == topic.breadcrumbs[2]);
        let subtopic = TOPICS.find(top => top.id == topic.breadcrumbs[topic.breadcrumbs.length-1]);
        this.setState({globalTopic: globalTopic, subtopic: subtopic});
         this.loadTasks(this.getTopic(globalTopic.title), this.getSubtopic(subtopic.title))
            .then();//здесь можно then для вызова renderTasks
    }

    renderTask(task)
    {
        if(task.taskType === 'NumericEntryQuestion')
        {
            return <NumericEntryQuestion task={task} order={this.state.order} onOrderChanged={this.orderChange}/>
        }
       /* if(task.taskType === 'MultipleChoiceQuestionSelectOneAnswer')
        {
            return <MultipleChoiceQuestionSelectOneAnswer task={task} />
        }*/
    }
     renderTasks(tasks) {
        return (
            <div className="container">
                {this.renderTask(tasks[this.state.order])}
            </div>
        );
    }

    render() {
        let tasks = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderTasks(this.state.tasks);

        return (
             <div>
                 {console.log(this.props, 'task props')}
                 {renderBreadcrumbs(this.props)}
                 {tasks}
             </div>
        );
    }

     async loadTasks(topic, subtopic) {
        const path=`/home/topictasks/${topic}/datainterpritation/task`;
      //  const path = `task/${topic}/${subtopic}`;
        console.log(`subtopic ${subtopic} topic ${topic}`)
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
        return subtopic.replace(/\s/g, '').toLowerCase();
    }

    getTopic(topic) {
        if(topic === 'Verbal Reasoning')
            return 'vr';
        if(topic === 'Quantitative Reasoning')
            return 'qr';
    }
}

export default Task;