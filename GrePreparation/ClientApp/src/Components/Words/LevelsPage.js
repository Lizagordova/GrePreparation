import React, { Component }  from 'react';

class LevelsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            progress: [] //подумай как распарсить,тут придёт массив объектов
            
        }
    }
    
    componentDidMount() {
        {console.log('props in levels page', this.props)}
        this.loadWordProgress(this.props.userId, this.props.section);
    }

    renderProgress() {
        
    }

    renderLevels() {
        return(
            <div>
            </div>
        )
    }
    render() {
        let levels = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderLevels();
        return(
            <div>
                {levels}
            </div>
        );
    }
    
    async loadWordProgress(userId, section)
    {
        const response = await fetch('progress', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({userId: userId, section: section, topic: ''})//здесь возможно можно так: userId,section,topic...
        });
        console.log(response,'response in  levels page');
        const data = await response.json();
        console.log(data,'data in  levels page');
        
    }
}

export default LevelsPage;