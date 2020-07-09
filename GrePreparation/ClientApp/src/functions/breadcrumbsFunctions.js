import Breadcrumbs from "../Components/Breadcrumbs";
import React from "react";
import  TOPICS  from '../data/topics';

function renderBreadcrumbs(props) {
    if (props.match !== undefined) {
        let id = TOPICS.find(topic => topic.cleanTitle === props.match.params.cleanTitle.toLowerCase()).id;
        return <Breadcrumbs id={id} />
    } else if (props.level !== undefined) {
        let id = TOPICS.find(topic => topic.cleanTitle === props.cleanTitle.toLowerCase()).id;
        return <Breadcrumbs id={id} level={props.level} />
    }else {
        let id = TOPICS.find(topic => topic.cleanTitle === props.cleanTitle.toLowerCase()).id;
        return <Breadcrumbs id={id} />
    }
}

export default renderBreadcrumbs;