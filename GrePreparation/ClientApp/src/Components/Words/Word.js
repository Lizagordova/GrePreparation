import React, { Component } from 'react';
import '../../styles/words.css';

class Word extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            words: [],
            order: 0
        }
    }

    orderChange(order) {
        this.setState({order: order});
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
                    <strong>{word.text}</strong>
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
            </div>
        );
    }

    renderWords(words) {
        console.log('render Words', words);
        console.log('order', this.state.order);
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
        return(
            //хлебные крошки добавь:3
            <div>
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