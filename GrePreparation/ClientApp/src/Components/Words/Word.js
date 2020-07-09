import React, { Component } from 'react';
import '../../styles/words.css';
import renderBreadcrumbs from "../../functions/breadcrumbsFunctions";
import { Button } from 'reactstrap';

class Word extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            words: [],
            order: 0
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
    }

    componentDidMount() {
        let level = this.props.match.params.level;
        this.loadWords(localStorage.getItem('userId'), 'essential', level);
    }

     renderWord(word) {
        let wordImage = '../../.' + word.image;
         return(
            <div className="container" key={word.id}>
                 <div className="row justify-content-center">
                    <strong>{word.text.toUpperCase()}</strong>
                </div>
                <div className="row justify-content-center">
                    <img className="img-fluid rounded-circle wordImage" src={wordImage} alt="word Image"/>
                </div>
                <div className="row justify-content-center">
                    <audio src={word.sound}/>
                </div>
                <div className="row justify-content-center">
                    <strong>{word.englishExplanation}</strong>
                </div>
                <div className="row buttons justify-content-center">
                    <div className="col-6">
                        <Button color="danger" onClick={this.alreadyKnow}>Уже знаю</Button>
                    </div>
                    <div className="col-6">
                        <Button color="success" onClick={this.next}>Дальше</Button>
                    </div>
                </div>
            </div>
        );
    }

    renderWords(words) {
        return(
            <>
                {this.renderWord(words[this.state.order])}
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
}

export default Word;