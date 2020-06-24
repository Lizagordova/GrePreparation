import React, { Component } from 'react';
import { Row } from 'reactstrap';

class NumericEntryQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            update: true
        }
    }

    shouldComponentUpdate() {
        console.log(this.state.update,'update??')
        return this.state.update === true
    }
    handleSubmit(inputValue) {
        console.log(inputValue, 'inputValue!!!!')
    }
    
    render() {
        let task = this.props.task;
        this.setState({update: false})
        return(
            <>
            <div className="row">
                <span>{task.taskText}</span>
            </div>
                <form onSubmit={console.log('Submit me completely')}>
                     <Row className="form-group" onSubmit={(value) => this.handleSubmit(value)}>
                        <input type="text" className="form-control" id="answer"/>
                     </Row>
                    <button type="submit" className="btn btn-primary">Проверить</button>
                </form>
            </>
            
        )
    }
}

export default NumericEntryQuestion;