import React, { Component } from 'react';
import '../../styles/words.css';
import renderBreadcrumbs from "../../functions/breadcrumbsFunctions";
import { Button } from 'reactstrap';
import TextCompletion from "./TaskTypes/TextCompletion";
import JustWord from "./TaskTypes/JustWord";
import ChooseMeaning from "./TaskTypes/ChooseMeaning";

class Word extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            words: [],
            order: 0,
            taskType: 1
        };
        this.alreadyKnow = this.alreadyKnow.bind(this);
        this.next = this.next.bind(this);
    }

    orderChange(order) {
        this.setState({ order: order });
    }

    alreadyKnow() {
        this.orderChange(this.state.order + 1);
        //+запомнить чтоб дальше не высвечивалось это слово
        return(
            console.log('YOU ALREADY KNOW WORD', [this.state.words[this.state.order]])
        );
    }

    next() {
        if(this.state.order < this.state.words.length - 1) {
            this.orderChange(this.state.order + 1);
        } else {
            this.orderChange(0);
        }
        let taskType = this.getRandomInt(1, 3);
        this.setState({taskType: taskType});
    }

    rightAnswer(taskType) {
        let order = this.state.order;
        console.log('right answer uraaaa');
        //this.state.words[order].attempts[taskType]++;
        this.next();
    }

    componentDidMount() {
        let level = this.props.match.params.level;
        this.loadWords(localStorage.getItem('userId'), 'essential', level);
    }

    renderWords(words) {
        return(
            <>
                {console.log(this.state.taskType, 'taskType')}
                {this.taskSwitcher(/*this.state.taskType*/3, this.state.order)}
            </>
        )
    }

    render() {
        const words = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderWords(this.state.words);
        const breadcrumbsProps = { level: this.props.match.params.level, cleanTitle: 'levels'};
        return(
            <div>
                {renderBreadcrumbs(breadcrumbsProps)}
                {words}
            </div>
        );
    }

    async loadWords(userId, section, level) {
        const response = await fetch('loadwords', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({userId: userId, section: section, level: level})
        });
        const data = await response.json();
        this.setState({words: data, loading: false});
    }

    taskSwitcher(taskType, wordOrder) {
        if(taskType === 1) {
            return (
                <>
                    <JustWord word={this.state.words[wordOrder]} onNext={this.next} onAlreadyKnow={this.alreadyKnow}/>
                </>
            );
        } else if(taskType === 2) {
            let words = [];
            for(let i=0;i<4;i++){
                words.push(this.state.words[this.getRandomInt(0, 3)]);
            }
            return (
                <>
                    <TextCompletion word={this.state.words[wordOrder]} words={words}/>
                </>
            );
        } else if(taskType === 3) {
            let words = [];
            for(let i=0;i<4;i++){
                words.push(this.state.words[this.getRandomInt(0, 3)]);
            }
            console.log('random words', words);
            return(
                <>
                    <ChooseMeaning word={this.state.words[wordOrder]} words={words} onRightAnswer={this.rightAnswer}/>
                </>
            )
        }
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

export default Word;