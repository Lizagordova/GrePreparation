import { AppRoute } from "./helpers/AppRoute";
import Home from '../Home';
import TopicTasks from '../TopicTasks'

export const routes = [
    {
        path: AppRoute.Home,
        component: Home
    },
    {
        path: AppRoute.TopicTasks,
        component: TopicTasks
    },
    {
        path: AppRoute.FirstSubtopic,
        component: TopicTasks
    }
];