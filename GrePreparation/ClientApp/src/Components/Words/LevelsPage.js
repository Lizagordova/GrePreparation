import React, { Component }  from 'react';
import {ProgressBar} from "react-step-progress-bar";
import renderBreadcrumbs from '../../functions/breadcrumbsFunctions';

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
        console.log(this.state.progress,'progress in levels page');
        return(
            <div className="container">
                {this.state.progress.map(progress => {
                    return(
                            <div className="row justify-content-center">
                                <div className="level">
                                    <span>Level {progress.level}</span>
                                
                                <div className="progressBarDiv">
                                <ProgressBar percent={progress.userFinishedTotal/progress.totalCount * 100}  filledBackground="linear-gradient(to right, #CD5C5C, #F08080)" unfilledBackground="linear-gradient(to right, #E6E6FA, #D8BFD8)"/>
                                </div>
                                </div>
                            </div>
                    );
                })}
            </div>
        )
    }
    render() {
        let levels = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderLevels();
        return(
            <div>
                {renderBreadcrumbs(this.props)}
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
        this.setState({progress: data, loading: false});
    }
}

export default LevelsPage;