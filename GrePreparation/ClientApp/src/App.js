import React, { Component } from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import {BrowserRouter} from "react-router-dom";
import Main from './Components/Main';

class App extends Component {
  
    render () {
        return (
            <div>
                <BrowserRouter>
                    <div className="App">
                        <Main />
                    </div>
                </BrowserRouter>
            </div>
        )
    }
};

export default App;

