import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import  TOPICS  from '../data/topics';
import '../styles/topicTasks.css';

class Topics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topics: []
        }
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({ topics : []})
    }

    loadTopics(topicId) {
        let topic = TOPICS.find(topic => topic.id == topicId);
        let subtopics = topic.subtopics;
        for(let i = 0; i < subtopics.length; i++)
        {
            let subtopic = TOPICS.find(topic =>
                topic.id === subtopics[i]
            );
            this.state.topics.push(subtopic);
        }
    }

    renderTopics() {
        return(
            <div className="container">
             {this.state.topics.map(topic => {
                    return (
                     <div className="row justify-content-center">
                         <div className="topicDiv" key={topic.id}>
                         <Link to={`/topictasks/${topic.id}`} className="topicLink">
                             <button>
                                 {topic.title}
                             </button>
                         </Link>
                         </div>
                      </div>
                );
               })}
            </div>
        );
    }

    render() {
        return(
            <> 
                {this.loadTopics(this.props.topic)}
                {this.renderTopics()}
            </>
        );
    }
}

export default Topics;