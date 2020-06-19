import React, { Component, PureComponent} from 'react';
import renderBreadcrumbs from '../functions/breadcrumbsFunctions';

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            loading: true,
            topic: 0
        }
    }
    
    componentDidMount() {//может быть в другом месте жизненного цикла это делать?!?!
        {this.setState({topic: this.props.location.state.id})}
        this.loadTasks()
            .then(() => console.log('tasks', this.state.tasks));//здесь можно then для вызова renderTasks
    }

    static renderAnswers(answers) {
        return (
            <>
                <ul>
                {answers.map(answer =>
                    <div className="form-check" key={answer.id}>
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                {answer.answerText}
                            </label>
                    </div>)
                }
                </ul>
            </>
        )
    }
    
    static renderTasks(tasks) {
        return (
            <div className="container">
                {tasks.map(task =>
                    <div className="row" key={task.id}>
                        <div className="col-12">
                            <span>{task.taskText}</span>
                            {this.renderAnswers(task.answers)
                           }
                        </div>
                    </div>
                )}
            </div>
        );
    }

    render() {
        let tasks = this.state.loading
            ? <p><em>Loading...</em></p>
            : Task.renderTasks(this.state.tasks);

        return (
             <div>
                 {renderBreadcrumbs(this.state)}
                 {tasks}
             </div>
        );
    }
    
     async loadTasks() {
        const response = await fetch('task');
        const response1 = await fetch('task/gettasks', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({taskType: "multiplechoice"})
        });
        console.log('response1');
         console.log(response1);
         console.log('data 1');
         console.log(response1.json());
        const data = await response.json();
        this.setState({tasks: data, loading: false});
    }
}

export default Task;