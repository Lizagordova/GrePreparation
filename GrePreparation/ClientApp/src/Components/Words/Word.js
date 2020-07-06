import React, { Component } from 'react';

class Word extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            words: []
        }
    }

    componentDidMount() {
        let level = this.props.match.params.level;
        this.loadWords(localStorage.getItem('userId', 'essential', level));
    }

    render() {
        console.log('props in word', this.props);
        const words = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderWords();
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
            body: JSON.stringify({userId: userId, section: section, level: level})//здесь возможно можно так: userId,section,topic...
        });
        const data = await response.json();
        this.setState({words: data, loading: false});
    }
}

export default Word;