import React, { Component } from 'react';

class Home extends Component {
    componentDidMount() {
        localStorage.setItem('userId', 'localhost')
    }

    render() {
        return(
            <div>
                Home
            </div>
        );
    }
}

export default Home;