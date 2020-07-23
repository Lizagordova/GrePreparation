import React, { Component } from 'react';
import { Button } from 'reactstrap';
import WordTaskType from "../../../enums/WordTaskType";

class TextCompletion extends Component {
    constructor(props) {
        super(props);
        this.word = '';
        this.words = [];
        this.chosenWord = 0;
        this.check = this.check.bind(this);
        this.chose = this.chose.bind(this);
        this.rightAnswer = this.rightAnswer.bind(this);
    }

    componentDidMount() {
        this.setState({task: this.props.task, answers: this.props.answers, rightAnswer: this.props.word})
    }

    chose(event) {
        this.chosenWord = event.currentTarget.id;
    }

    rightAnswer() {
        this.props.onRightAnswer(WordTaskType.TextCompletion);
    }

    check(event) {
        event.preventDefault();
        if(this.chosenWord == this.word.Id) {
            this.rightAnswer();
        } else {
            return(alert('NE GOOD, YOU DO NOT KNOW THIS WORD'))
        }
    }

    renderTask() {
        let word = this.word;
        let words = this.words;
        words.add(this.word);
        let image = '../../../.' + word.Image;
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <img className="img-fluid rounded-circle wordImage" src={image} alt="task on test completion"/>
                </div>
                {words.map(word => 
                    <div className="row justify-content-center" key={word.Id}>
                       <Button collor="warning" outline onClick={this.chose} id={word.Id}><span>{word.Text}</span></Button>
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
    
    async loadTasks()
    {
        
    }
}

export default TextCompletion;