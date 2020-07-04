import renderBreadcrumbs from "../../functions/breadcrumbsFunctions";
import React, { Component }  from 'react';
import { ProgressBar, Step} from 'react-step-progress-bar';
import "react-step-progress-bar/styles.css";
import '../../styles/progress.css'
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
        console.log('progress props', this.props);
        this.loadProgress(this.props.userId, this.props.section, this.props.topic)
            .then(data => console.log(data));
    }

    renderProgress() {
        return(
            <>
                <ProgressBar percent={75} filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"/>
                <div>
                    <span>Сделано {this.state.userMadeTotal} из {this.state.totalCount} слов</span>
                </div>
            </>
        );
    }

    render() {
        let progress = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderProgress();
            //{renderBreadcrumbs(this.props)} в return положить
        return(
            <div>
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
        console.log('response', response);
        const data = await response.json();
        this.setState({totalCount: data.totalCount, userMadeTotal: data.userMadeTotal, userMadeADay: data.userMadeADay, loading: false})
    }
}

export default Progress;