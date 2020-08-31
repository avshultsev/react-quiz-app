import React, { Component } from 'react';
import styles from './QuizCreator.module.css';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Select from '../../components/Select/Select';
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
    correctAnswerId: 1,
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

  inputHandler = (value, controlName) => {
    // console.log(id, event.target.value);
    
    const formControlsCopy = {...this.state.formControls};
    let control = {...formControlsCopy[controlName]};
    
    control.value = value;
    formControlsCopy[controlName] = control;
    
    this.setState({
      formControls: formControlsCopy
    })
  }

  selectChangeHandler = value => {
    this.setState({
      correctAnswerId: +value
    })
  }

  render() {
    return (
      <div className={styles.QuizCreator}>
        <div>
          <h1>Create your own quiz!</h1>
          <form onSubmit={this.submitHandler}>
            {
              Object.keys(this.state.formControls).map((controlName, index) => {
                const control = this.state.formControls[controlName];

                return (
                  <React.Fragment key={index}>
                    <Input
                      key={index}
                      label={control.label}               //config object
                      errorMessage={control.errorMessage} //config object
                      id={control.id || 0}                //config object
                      value={control.value}               //return of createControl()
                      type={control.type}

                      isCorrect={this.state.correctAnswerId === control.id}
                      
                      valid={control.valid}               //return of createControl()
                      touched={control.touched}           //return of createControl()
                      required={control.required}
          
                      inputHandler={event => this.inputHandler(event.target.value, controlName)}
                    />
                    {index === 0 && <hr />}
                  </React.Fragment>
                )
              })
            }
            
            <Select 
              label='Choose correct answer'
              selectedValue={this.state.correctAnswerId}
              options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
              ]}
              selectChangeHandler={event => this.selectChangeHandler(event.target.value)}
            />

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
