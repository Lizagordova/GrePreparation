import React, { Component }  from 'react';
import {ProgressBar} from "react-step-progress-bar";
import renderBreadcrumbs from '../../functions/breadcrumbsFunctions';
import { Link } from 'react-router-dom';

class LevelsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            progress: [] //подумай как распарсить,тут придёт массив объектов
        }
    }
    
    componentDidMount() {
        this.loadWordProgress(localStorage.getItem('userId'), this.props.section);
    }

    renderLevels() {
        return(
            <div className="container">
                {this.state.progress.map(progress => {
                    return(
                   <div className="row justify-content-center">
                       <Link to={`/home/words/levels/${progress.level}`} className="level">
                           <span>Level {progress.level}</span>
                           <div className="progressBarDiv">
                               <ProgressBar percent={progress.userFinishedTotal/progress.totalCount * 100}  filledBackground="linear-gradient(to right, #CD5C5C, #F08080)" unfilledBackground="linear-gradient(to right, #E6E6FA, #D8BFD8)"/>
                           </div>
                       </Link>
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

    async loadWordProgress(userId, section) {
        const response = await fetch('progress', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({userId: userId, section: section, topic: ''})//здесь возможно можно так: userId,section,topic...
        });
        const data = await response.json();
        this.setState({progress: data, loading: false});
    }
}

export default LevelsPage;