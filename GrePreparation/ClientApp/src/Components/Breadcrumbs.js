import React, { Component } from 'react';
import  TOPICS  from '../data/topics';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

class Breadcrumbs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbs: []
        };
    }
    
    loadBreadcrumbs(props) {
        for(let i = 0;i<props.topics.length;i++)
        {
            let topic = TOPICS.find(topic => 
            topic.id === props.topics[i]);
            this.state.breadcrumbs.push(topic);
        }
    }

    renderBreadcrumbs() {
        return (
            <>
                <Breadcrumb>
                    {this.state.breadcrumbs.map(breadcrumb => {
                        return(
                        <BreadcrumbItem>
                            <Link to='/home'>{breadcrumb.title}</Link>
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