import React, { Component, PureComponent} from 'react';
import renderBreadcrumbs from '../functions/breadcrumbsFunctions';

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            loading: true
        }
    }
    
    componentDidMount() {//может быть в другом месте жизненного цикла это делать?!?!
        this.loadTasks()
            .then(() => console.log('tasks', this.state.tasks));//здесь можно then для вызова renderTasks
    }
    
    static renderTasks(tasks) {
        return (
            <div className="container">
                {tasks.map(task =>
                    <div className="row" key={task.id}>
                        <div className="col-12">
                            <span>{task.explanation}</span>
                            <span>{task.tasktext}</span>
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
                 {console.log('I am in task already')}
                 {console.log('breadcrumbs', this.props)}
                 {tasks}
             </div>
        );
    }
    
     async loadTasks() {
         {console.log('fetch tasks start')}
        const response = await fetch('task');
        console.log('Response: ', response);
        const data = await response.json();
        console.log('Data: ', data);
        this.setState({tasks: data, loading: false});
    }
}

export default Task;