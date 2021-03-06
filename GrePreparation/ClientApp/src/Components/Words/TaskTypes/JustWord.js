﻿import React, { Component } from 'react';
import {Button} from "reactstrap";

class JustWord extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.alreadyKnow = this.alreadyKnow.bind(this);
    }

    next() {
        this.props.onNext();
    }

    alreadyKnow() {
       this.props.onAlreadyKnow();
    }

    renderWord(word) {
        let wordImage = '../../.' + word.Image;
        return(
          <>
              <div className="container" key={word.Id}>
              <div className="row justify-content-center">
                  <strong>{word.Text.toUpperCase()}</strong>
              </div>
              <div className="row justify-content-center">
                  <img className="img-fluid rounded-circle wordImage" src={wordImage} alt="word Image"/>
              </div>
              <div className="row justify-content-center">
                  <audio src={word.Sound}/>
              </div>
              <div className="row justify-content-center">
                  <strong>{word.EnglishExplanation}</strong>
              </div>
              <div className="row buttons justify-content-center">
                  <div className="col-6">
                      <Button color="danger" onClick={this.alreadyKnow}>Уже знаю</Button>
                  </div>
                  <div className="col-6">
                      <Button color="success" onClick={this.next}>Дальше</Button>
                  </div>
              </div>
          </div>
          </>
        );
    }

    render() {
        return(
            <div>
            {this.renderWord(this.props.word)}
        </div>);
    }
}

export default JustWord;

/* */