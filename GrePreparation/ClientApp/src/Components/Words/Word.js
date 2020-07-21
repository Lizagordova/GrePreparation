import React, { Component } from 'react';
import '../../styles/words.css';
import renderBreadcrumbs from "../../functions/breadcrumbsFunctions";
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
        this.orderChange = this.orderChange.bind(this);
        this.rightAnswer = this.rightAnswer.bind(this);
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
        this.orderChange(this.getRandomInt(0,this.state.words.length - 1));
        let taskType = this.getRandomInt(1, 3);
        this.setState({taskType: 3});
    }

    rightAnswer(taskType) {
        let order = this.state.order;
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
                {this.taskSwitcher(this.state.taskType, this.state.order)}
            </>
        );
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

    taskSwitcher(taskType, wordOrder) {
        if(taskType === 1) {
            return (
                <>
                    <JustWord word={this.state.words[wordOrder]} onNext={this.next} onAlreadyKnow={this.alreadyKnow}/>
                </>
            );
        } else if(taskType === 2) {
            let words = [];
            for(let i = 0;i < 4;i++){
                words.push(this.state.words[this.getRandomInt(0, 3)]);
            }
            return (
                <>
                    <TextCompletion word={this.state.words[wordOrder]} words={words}/>
                </>
            );
        } else if(taskType === 3) {
            let words = new Set();
            while(words.size !== 4)
            {
                words.add(this.state.words[this.getRandomInt(0, 8)]);
            }
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

    async loadWords(userId, level, sublevel) {
        const response = await fetch('loadwords', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({userId: userId, level: level, sublevel: sublevel})
        });
        const data = await response.json();
        const parsed = await JSON.parse(data);
        this.setState({words: parsed, loading: false});
    }
}

export default Word;