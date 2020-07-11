import React, { Component } from 'react';
import './QuizMain.css';
import Question from './question/Question.js';
import Answer from './answer/Answer.js';

export default class Quiz extends Component {
  // iniating state
    state = {
      questions: {
        1: 'What is the distance between Earth and Sun?',
        2: 'Travelling at the speed of light, how much time will take you to cross the Milky Way galaxy?',
        3: 'At what speed Earth orbits around the Sun?'
      },
      answers: {
        1: {
          1: 'A) 50 000km',
          2: 'B) 150 million km',
          3: 'C) 3.24 billion km',
          4: 'D) 2 light years'
        },
        2: {
          1: 'A) 34 weeks',
          2: 'B) 15 years',
          3: 'C) 160 years',
          4: 'D) 100 000 years'
        },
        3: {
          1: 'A) 16km/h',
          2: 'B) 800km/h',
          3: 'C) 30km/s'
        }
    },
    correctAnswers: {
      1: '2',
      2: '4',
      3: '3'
    },
    correctAnswer: 0,
    clickedAnswer: 0,
    step: 1,
    score: 0
  }

  checkAnswer = answer => {
    const {correctAnswers, step, score} = this.state;
    if(answer === correctAnswers[step]){
      this.setState({
        score: score + 1,
        correctAnswer: correctAnswers[step],
        clickedAnswer: answer
      });
    } else {
      this.setState({
        correctAnswer: 0,
        clickedAnswer: answer
      })
    }
  }
  nextStep = step => {
    this.setState({
      step: step + 1,
      correctAnswer: 0,
      clickedAnswer: 0
    })
  }

  render(){
    let {questions,answers,clickedAnswer,correctAnswer, score, step} = this.state;
    return (
      <div className="Content">
      {step <= Object.keys(questions).length ?
        (<>
        <Question question={questions[step]} />
        <Answer
          answer={answers[step]}
          step={step}
          checkAnswer={this.checkAnswer}
          correctAnswer={correctAnswer}
          clickedAnswer={clickedAnswer}
        />
        <button
           className="NextStep"
           disabled = {
             clickedAnswer && Object.keys(questions).length >= step ? false : true
           }
           onClick={() => this.nextStep(step)}
            >Next</button>
            </>) : (<div className="finalPage">
              <h1>You have completed the quiz!</h1>
              <p>Your score is: {score} of {Object.keys(questions).length}</p>
              <p>Thank you!</p>
          </div>
        )
      }
      </div>
    );
  }
}
