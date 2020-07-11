import React, { Component } from 'react';
import { Button } from 'reactstrap';

class TextCompletion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: '',
            answers: '',
            word: ''
        };
        this.check = this.check.bind(this);
    }
    
    componentDidMount() {
        this.setState({task: this.props.task, answers: this.props.answers, rightAnswer: this.props.word})
    }

    check(event) {
        if(event.target.value !== word) {
            return(alert('IT IS NOT RIGHT'))
        } else {
            return(alert('ALL GOOD, YOU KNOW THIS WORD'))
        }
    }

    renderTask(word) {
        let image = '../../../.' + word.image;
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <img src={image} alt="task on test completion" />
                </div>
                {this.state.answers.map(answer => 
                    <div className="row justify-content-center">
                        <span>{answer}</span>
                    </div>)}
                    <div className="row">
                        <Button color="success" onClick={this.check}>ПРОВЕРИТЬ</Button>
                    </div>
            </div>
        );
    }

    render() {
        return(
            <>
                {this.renderTask(this.state.word)}
            </>);
    }
}

export default TextCompletion;