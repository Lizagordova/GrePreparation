import React, { Component } from 'react';
import renderBreadcrumbs from '../functions/breadcrumbsFunctions'

class LearnWords extends Component {
    
    render() {
        return(
            <div>
                {renderBreadcrumbs(this.props)}
            </div>
        );
    }
}

export default LearnWords;