import React, { Component } from 'react';
import  CheeseburgerMenu  from 'cheeseburger-menu';
import HamburgerMenu from 'react-hamburger-menu';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home/Home';
import TopicTasks from './TopicTasks/TopicTasks'
import Materials from './Materials/Materials';
import Variants from './Variants/Variants';
import Rating from './Rating/Rating';
import Progress from './Progress/Progress';
import Words from './Words/Words';
import Menu from './Menu';
import Task from './TopicTasks/Task';
import LevelsPage from './Words/LevelsPage';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuOpen: false
        }
    }

    openMenu() {
        this.setState({ menuOpen: true })
    }

    closeMenu() {
        this.setState({ menuOpen: false })
    }
    
    render() {
         return(
            <div className="cheeseburger">
                <CheeseburgerMenu
                    isOpen={this.state.menuOpen}
                    closeCallback={this.closeMenu.bind(this)}>
                    <Menu closeCallback={this.closeMenu.bind(this)}/>
                </CheeseburgerMenu>

                <HamburgerMenu
                    isOpen={this.state.menuOpen}
                    menuClicked={this.openMenu.bind(this)}
                    width={32}
                    height={24}
                    strokeWidth={3}
                    rotate={0}
                    color='black'
                    borderRadius={0}
                    animationDuration={0.5}
                />
                <Switch>
                    <Route exact path="/home/words/levels" component={() => <LevelsPage userId={"localhost"} section={"essential"} cleanTitle={"Levels"}/>}/>
                    <Route exact path="/home/words" component={() => <Words cleanTitle={"learnwords"}/>}/>
                    <Route exact path="/home/topictasks/:cleanTitle/:cleanTitle/:cleanTitle/task" component={Task}/>
                    <Route exact path="/home/topictasks/:cleanTitle/:cleanTitle/task" component={Task}/>
                    <Route exact path="/home/topictasks/:cleanTitle/:cleanTitle/:cleanTitle" component={TopicTasks} />
                    <Route exact path="/home/topictasks/:cleanTitle/:cleanTitle" component={TopicTasks} />
                    <Route exact path="/home/topictasks/:cleanTitle" component={TopicTasks} />
                    <Route exact path="/home/topictasks" component={() => <TopicTasks cleanTitle={"TopicTasks"}/>}/>
                    <Route exact path="/home" component={Home}/>
                    <Route exact path="/materials" component={() => <Materials breadcrumbs={[0,2]}/>}/>
                    <Route exact  path="/variants" component={Variants}/>
                    <Route exact path="/rating" component={Rating}/>
                    <Route exact path="/progress" component={Progress}/>
                   
                   <Redirect to="/home" />
                </Switch>
            </div>
        );
    }
}

export default Main