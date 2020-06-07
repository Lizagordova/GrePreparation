import Breadcrumbs from "../Components/Breadcrumbs";
import React from "react";

function renderBreadcrumbs(props) {
    if (props.match !== undefined) {
        return <Breadcrumbs topic={props.match.params.id} />
    } else {
        return <Breadcrumbs topic={props.topic} />
    }
}

export default renderBreadcrumbs;