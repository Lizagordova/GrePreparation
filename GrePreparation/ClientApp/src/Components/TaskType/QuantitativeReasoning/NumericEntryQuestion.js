import React, { Component } from 'react';
import { Row } from 'reactstrap';

class NumericEntryQuestion extends Component {
    constructor(props) {
        super(props);
        this.value = '';
       /*this.state = {
            value: '',
            order:0
        };*/
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.value = event.target.value;
       // this.setState({value: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.props.task.rightAnswers.find(value => value === this.value))
        {
            let order = this.props.order + 1;
            this.props.onOrderChanged(order);
        }
        else {
            alert('ni huya')
        }
    }

    render() {
        let task = this.props.task;
        return(
            <>
            <div className="row">
                <span>{task.taskText}</span>
            </div>
                <form onSubmit={this.handleSubmit}>
                     <div className="row">
                        <input type="text" className="form-control" id="answer" onChange={this.handleChange}/>
                     </div>
                    <button type="submit" value="Submit" className="btn btn-primary">Проверить</button>
                </form>
            </>
            
        )
    }
}

export default NumericEntryQuestion;