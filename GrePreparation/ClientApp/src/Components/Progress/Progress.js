import renderBreadcrumbs from "../../functions/breadcrumbsFunctions";
import React, { Component }  from 'react';

class Progress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalCount: 0,
            userMadeTotal: 0,
            userMadeADay: 0,
            loading: true
        }
    }
    
    componentDidMount() {
        this.loadProgress(this.props.userId, this.props.section, this.props.topic)
            .then(data => console.log(data));
    }
    
    renderProgress() {
        return(
            <div>
                <span>Сделано {this.state.userMadeADay} из {this.state.totalCount} слов</span>
            </div>
        );
    }

    render() {
        let progress = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderProgress();
        return(
            <div>
                {renderBreadcrumbs(this.props)}
                {progress}
            </div>
        )

    }

    async loadProgress(userId, section, topic) {
        const response = await fetch('progress', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({userId: userId, section: section, topic: topic})//здесь возможно можно так: userId,section,topic...
        });
        const data = await response.json();
        this.setState({totalCount: data.totalCount, userMadeTotal: data.userMadeTotal, userMadeADay: data.userMadeADay})
    }
}

export default Progress;