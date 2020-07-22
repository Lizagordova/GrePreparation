import React, { Component } from 'react';
import { Button } from 'reactstrap';

class ChooseMeaning extends Component {
    constructor(props) {
        super(props);
        this.word = '';
        this.rightAnswer = this.rightAnswer.bind(this);
        this.check = this.check.bind(this);
    }

    rightAnswer() {
        this.props.onRightAnswer(3);//здесь должен быть какой-нибудь енам
    }

    check(event) {
        event.preventDefault();
       if(event.currentTarget.id == this.word.Id) {
            this.rightAnswer();
        } else {
            alert('NI HUYA');
        }
    }

    render() {
        this.word = this.props.word;
        let words = this.props.words;
        words.add(this.word);
        return(<div>
            <>
                <div className="container">
                    <div className="row justify-content-center">
                        <strong>{this.word.EnglishExplanation.toUpperCase()}</strong>
                    </div>
                    {words.map(word =>
                    <div className="row buttons justify-content-center">
                        <div className="col-6">
                            <Button outline color="danger" onClick={this.check} id={word.Id}>{word.Text}</Button>
                        </div>
                    </div>)}
                </div>
            </>
        </div>);
    }
}

export default ChooseMeaning;