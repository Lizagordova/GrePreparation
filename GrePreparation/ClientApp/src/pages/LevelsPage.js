import React, { Component }  from 'react';

class LevelsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: [] //подумай как распарсить,тут придёт массив объектов
        }
    }
    
    renderLevels() {
        return(
            <div>
            </div>
        )
    }
    render() {
        return(
            <div>
                
            </div>
        );
    }
    
    async loadProgress()
    {
        const response = await fetch('progress', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({userId: userId, section: section, topic: topic})//здесь возможно можно так: userId,section,topic...
        });
        const data = await response.json();
        
    }
}