import React, { Component } from 'react';
import Breadcrumbs from "../Breadcrumbs";

class Materials extends Component {
    constructor(props) {
        super(props);
        this.state = {
            update:true
        }
    }

    shouldComponentUpdate() {
        return this.state.update === true
    }

    renderBreadcrumbs(props) {
        if (props.match !== undefined) {
            return <Breadcrumbs breadcrumbs={[0,1,7]} />
        } else {
            return <Breadcrumbs breadcrumbs={this.props.breadcrumbs} />
        }
    }

    render() {
        return(
            <div>
                {this.setState({update: false})}
                {this.renderBreadcrumbs(this.props)}
            </div>
        );
    }
}

export default Materials;