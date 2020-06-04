import React, { Component } from 'react';
import { Button } from 'reactstrap';
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

    componentDidMount() {
        this.setState({ topics : []})
    }

    loadTopics(props) {
        for(let i = 0; i < props.topics.length; i++)
        {
            let topic = TOPICS.find(topic => 
                topic.id === props.topics[i]
            );
            this.state.topics.push(topic);
        }
    }

    renderTopics() {
        return(
            <div className="container">
             {this.state.topics.map(topic => {
                    return (
                     <div className="row justify-content-center">
                         <div className="topicDiv">
                         <Link to={topic.route} className="topicLink">
                             <button>
                                 {topic.title}
                             </button>
                         </Link>
                         </div>
                      </div>
                )
               })}
            </div>
        )
    }

    render() {
        return(
            <>
                {this.loadTopics(this.props)}
                {this.renderTopics()}
            </>
        );
    }
}

export default Topics;