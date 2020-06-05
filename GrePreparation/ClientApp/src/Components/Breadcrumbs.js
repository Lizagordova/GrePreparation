import React, { Component } from 'react';
import  TOPICS  from '../data/topics';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import TopicTasks from "./TopicTasks";

class Breadcrumbs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbs: []
        };
    }
    
    componentDidMount() {
        this.setState({breadcrumbs : []})
    }

    loadBreadcrumbs(props) {
        for(let i = 0; i < props.breadcrumbs.length; i++)
        {
            let topic = TOPICS.find(topic => 
            topic.id === props.breadcrumbs[i]);
            this.state.breadcrumbs.push(topic);
        }
    }

    renderBreadcrumbs() {
        return (
            <>
                <Breadcrumb className="breadcrumb">
                    {this.state.breadcrumbs.map(breadcrumb => {
                        return(
                        <BreadcrumbItem>
                            <Link className="breacrumbLink" 
                                  to={breadcrumb.route}
                                  onClick={() => {console.log('this was click')}}>{breadcrumb.title}</Link>
                        </BreadcrumbItem>
                        );
                  })
                }
                </Breadcrumb>
            </>
            ); 
     }

                render() {
                return (
                <div>
                {this.loadBreadcrumbs(this.props)}
                {this.renderBreadcrumbs()}
                </div>
                );
            }
}

export default Breadcrumbs;