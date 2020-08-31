import React, { Component } from 'react';
import styles from './QuizCreator.module.css';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import {createControl} from '../../form/formFramework';

const createOptionControl = number => {
  return createControl({
    label: `Answer ${number}`,
    errorMessage: 'Value cannot be empty!',
    id: number
  }, {required: true})
}

const createFormControl = () => {
  return {
    question: createControl({
      label: 'Enter question',
      errorMessage: 'Question field cannot be empty!'
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

export default class QuizCreator extends Component {
  state = {
    isFromValid: false,
    quiz: [],
    formControls: createFormControl()
  }

  addQuestion = () => {

  }

  createQuiz = () => {

  }

  submitHandler = event => {
    event.preventDefault();
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <React.Fragment>
          <Input 
            key={index.toString()}
            label={control.label}               //config object
            errorMessage={control.errorMessage} //config object
            value={control.value}               //return of createControl()
            type={control.type}
            
            valid={control.valid}               //return of createControl()
            touched={control.touched}           //return of createControl()
            required={control.required}

            inputHandler={event => this.inputHandler(event)}
          />
          {index === 0 && <hr />}
        </React.Fragment>
      )
    })
  }

  render() {
    return (
      <div className={styles.QuizCreator}>
        <div>
          <h1>Create your own quiz!</h1>
          <form onSubmit={this.submitHandler}>
            {
              this.renderInputs()
            }
          </form>
          <div className={styles.buttonSection}>
            <Button 
              type='success' 
              disabled={!this.state.isFromValid} 
              onClick={this.addQuestion}>
                Add question
            </Button>
            <Button 
              type='primary' 
              disabled={!this.state.isFromValid} 
              onClick={this.createQuiz}>
                Create quiz
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
