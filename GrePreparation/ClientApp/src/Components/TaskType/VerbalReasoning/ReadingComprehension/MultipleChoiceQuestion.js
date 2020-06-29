import React, { Component } from 'react';

class MultipleChoiceQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oneAnswer: true,
            commonTask: {},
            tasks: []
        }
    }

    componentDidMount() {
        this.loadTasks();
    }

    static renderAnswers(taskId) {
        let task = this.state.tasks.find(task => task.id === taskId);
        return(
            <div className="container">
                {task.answers.map(answer => {
                    return (
                        <div className="row" key={answer.id}>
                            <div className="col-2">
                                {answer.order}
                            </div>
                            <div className="col-10">
                                {answer.text}
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
    
     static renderCommonTask(task) {
        return(
            <div className="container">
                <div className="row">
                    {task.instruction}
                </div>
                <div className="row">
                    {task.text}
                </div>
                <div className="row">
                    {task.commonQuestion}
                </div>
            </div>
        )
    }
    
    static renderTasks() {
        return (
            <>
                {this.tasks.map(task => {
                    return(
                        <div className="container">
                            <div className="row">
                                {task.text}
                            </div>
                            {this.renderAnswers(task.id)}
                        </div>
                    )
                })}
            </>
        )
    }
    static renderWholeTask() {
        return (
            <>
                {this.renderCommonTask(this.state.commonTask)}
                {this.renderTasks(this.state.tasks)}
            </>
        )
    }
    render() {
        let tasks = this.state.loading
            ? <p><em>Loading...</em></p>
            : MultipleChoiceQuestion.renderWholeTask();
        return(
            <>
                {tasks}
            </>
        );
    }

    async loadTasks() {
        const response = await fetch('task');//тут чёт другое
        const data = await response.json();
        this.setState({tasks: data.tasks, commonTask: data.commonTask, loading: false});
    }
}

export default MultipleChoiceQuestion;