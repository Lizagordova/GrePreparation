import React, { Component, PureComponent} from 'react';
import renderBreadcrumbs from '../functions/breadcrumbsFunctions';

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {tasks: [], loading: true}
    }
    
    componentDidMount() {//может быть в другом месте жизненного цикла это делать?!?!
        this.loadTasks();//здесь можно then для вызова renderTasks!
        console.log('tasks',this.state.tasks)
    }
    
    static renderTasks(tasks) {
        return (
            <div className="container">
                {tasks.map(task =>
                    <div className="row" key={task.id}>
                        <div className="col-12">
                            <span>{task.tasktext}</span>
                        </div>
                    </div>
                )}
            </div>
        )
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
         {console.log('ш рфм')}
        const response = await fetch('task');
          const data = await response.json();
         {console.log('data', data)}
        this.setState({tasks: data, loading: true});
    }
}

export default Task;