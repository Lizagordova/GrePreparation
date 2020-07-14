import React, { Component } from 'react';
import { Button } from 'reactstrap';

class TextCompletion extends Component {
    constructor(props) {
        super(props);
        this.word = '';
        this.words = [];
        this.check = this.check.bind(this);
    }
    
    componentDidMount() {
        this.setState({task: this.props.task, answers: this.props.answers, rightAnswer: this.props.word})
    }

    check(event) {
        event.preventDefault();
        if(event.target.value === this.word) {
            return(alert('IT IS RIGHT'))
        } else {
            return(alert('NE GOOD, YOU DO NOT KNOW THIS WORD'))
        }
    }

    renderTask() {
        let word = this.word;
        let words = this.words;
        console.log('text Completion word and words:', word, words);
        let image = '../../../.' + word.image;
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <img src={image} alt="task on test completion" />
                </div>
                {words.map(word => 
                    <div className="row justify-content-center" key={word.id}>
                        <span>{word}</span>
                    </div>)}
                    <div className="row">
                        <Button color="success" onClick={this.check}>ПРОВЕРИТЬ</Button>
                    </div>
            </div>
        );
    }

    render() {
        this.word = this.props.word;
        this.words = this.props.words;
        return(
            <>
                {this.renderTask()}
            </>);
    }
}

export default TextCompletion;