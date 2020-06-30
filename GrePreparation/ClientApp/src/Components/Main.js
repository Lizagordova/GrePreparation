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
                    <Route path="/home" component={Home}/>
                    <Route exact path="/topictasks" component={() => <TopicTasks topic={1}/>}/>
                    <Route exact path="/topictasks/task" component={Task}/>
                    <Route exact path="/topictasks/:id" component={TopicTasks} />
                    <Route path="/materials" component={() => <Materials breadcrumbs={[0,2]}/>}/>
                    <Route path="/variants" component={Variants}/>
                    <Route path="/rating" component={Rating}/>
                    <Route path="/progress" component={Progress}/>
                    <Route path="/words" component={() => <Words topic={6}/>}/>
                    <Redirect to="/home" />
                </Switch>
            </div>
        );
    }
}

export default Main