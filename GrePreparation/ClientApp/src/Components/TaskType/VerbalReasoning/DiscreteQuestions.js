import React, { Component } from 'react';

class DiscreteQuestions extends Component {
    constructor(props) {
        super(props);
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
        return(
            DiscreteQuestions.renderTasks(this.props.tasks)
        )
    }
}

export default DiscreteQuestions;