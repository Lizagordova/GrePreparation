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

    componentWillReceiveProps(nextProps) {
        this.setState({ breadcrumbs : []})
    }

    loadBreadcrumbs(props) {
        let topic = TOPICS.find(topic => topic.id == props.id);
        let breadcrumbs = topic.breadcrumbs;
        for(let i = 0; i < breadcrumbs.length; i++)
        {
            let breadcrumb = TOPICS.find(item => 
            item.id === breadcrumbs[i]);
            this.state.breadcrumbs.push(breadcrumb);
        }
        if(props.level !== undefined) {
            let breadcrumb = {route: '#', title: 'Level ' + props.level, id: 27};
            this.state.breadcrumbs.push(breadcrumb);
        }
    }

    renderBreadcrumbs() {
        return (
            <>
                {}
                <Breadcrumb className="breadcrumb">
                    {this.state.breadcrumbs.map(breadcrumb => {
                        return(
                        <BreadcrumbItem key={breadcrumb.id}>
                            {breadcrumb.id !== 0 && <Link to={breadcrumb.route} className="breadcrumbLink">{breadcrumb.title}</Link>}
                            {breadcrumb.id === 0 && <Link to="/home" className="breadcrumbLink">{breadcrumb.title}</Link>}
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