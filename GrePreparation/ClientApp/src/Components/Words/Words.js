import React, { Component } from 'react';
import renderBreadcrumbs from '../../functions/breadcrumbsFunctions';
import { Link } from 'react-router-dom';
import Progress from '../Progress/Progress'

class Words extends Component {
    
    render() {
        return(
            <>
            <div>
                {renderBreadcrumbs(this.props)}
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-sm-6 col-xs-12 justify-content-center">
                        <Link to="#">
                            <div className="mx-auto">
                                <button className="words">
                                Essential
                                </button>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-12 justify-content-center">
                            <div className="mx-auto">
                                <Link to={"/home/words/levels"} >
                                    <button className="words">
                                        Advanced
                                        <Progress userId="localhost" section="words" topic="advanced"/>
                                    </button>
                                </Link>
                            </div>
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default Words;