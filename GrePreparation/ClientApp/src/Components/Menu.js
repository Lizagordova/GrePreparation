﻿import React, { Component } from 'react';
import { Navbar, NavItem, Nav } from 'reactstrap';
import '../styles/menu.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class Menu extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="menu">
                <NavItem className="menu-item">
                    <NavLink className="nav-link" to="/home" onClick={this.props.closeCallback}>
                        <span className="fa fa-home fa-lg">Главная</span></NavLink>
                </NavItem>
                <NavItem className="menu-item">
                    <NavLink className="nav-link" to="/topictasks" onClick={this.props.closeCallback}>
                        <span className="fa fa-home fa-lg">Задания по темам</span></NavLink>
                </NavItem>
                <NavItem className="menu-item">
                    <NavLink className="nav-link" to="/materials" onClick={this.props.closeCallback}>
                        <span className="fa fa-home fa-lg">Материалы</span></NavLink>
                </NavItem>
                <NavItem className="menu-item">
                    <NavLink className="nav-link" to="/variants" onClick={this.props.closeCallback}>
                        <span className="fa fa-home fa-lg">Варианты</span></NavLink>
                </NavItem>
                <NavItem className="menu-item">
                    <NavLink className="nav-link" to="/rating" onClick={this.props.closeCallback}>
                        <span className="fa fa-home fa-lg">Рейтинг</span></NavLink>
                </NavItem>
                <NavItem className="menu-item">
                    <NavLink className="nav-link" to="/progress" onClick={this.props.closeCallback}>
                        <span className="fa fa-home fa-lg">Прогресс</span></NavLink>
                </NavItem>
                <NavItem className="menu-item">
                    <NavLink className="nav-link" to="/learnwords" onClick={this.props.closeCallback}>
                        <span className="fa fa-home fa-lg">Учить слова</span></NavLink>
                </NavItem>
            </div>
        );
    }
}

Menu.propTypes = {
    closeCallback: PropTypes.func.isRequired
};

export default Menu;