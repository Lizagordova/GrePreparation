import React from 'react';
import map from "lodash/map";
import { Route, Switch } from "react-router";
export interface IRoute {
    key?: number | string
    path?: string
    exact?: boolean
    
}