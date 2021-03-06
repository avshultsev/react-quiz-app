import React, { Component } from 'react';
import styles from './QuizCreator.module.css';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Select from '../../components/Select/Select';
import {createControl, validateControl, validateForm} from '../../form/formFramework';
import { connect } from 'react-redux';
import { createQuiz, addQuestion } from '../../redux/actions/createQuizActions';

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

class QuizCreator extends Component {
  state = {
    isFromValid: false,
    correctAnswerId: 1,
    formControls: createFormControl()
  }

  addQuestion = event => {
    event.preventDefault();

    const quiz = [...this.props.quiz];
    const {question, option1, option2, option3, option4} = this.state.formControls;

    const questionItem = {
      question: question.value,
      id: quiz.length + 1,
      correctAnswerId: this.state.correctAnswerId,
      answers: [
        {answerId: option1.id, answerText: option1.value},
        {answerId: option2.id, answerText: option2.value},
        {answerId: option3.id, answerText: option3.value},
        {answerId: option4.id, answerText: option4.value}
      ]
    }
    
    this.props.addQuestion(questionItem);
    this.setState({
      isFromValid: false,
      correctAnswerId: 1,
      formControls: createFormControl()
    });
  }

  createQuiz = event => {
    event.preventDefault();

    this.props.createQuiz();
    this.setState({
      isFromValid: false,
      correctAnswerId: 1,
      formControls: createFormControl()
    });
  }

  submitHandler = event => {
    event.preventDefault();
  }

  inputHandler = (value, controlName) => {    
    const formControlsCopy = {...this.state.formControls};
    let control = {...formControlsCopy[controlName]};
    
    control.value = value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);

    formControlsCopy[controlName] = control;
    this.setState({
      formControls: formControlsCopy,
      isFromValid: validateForm(formControlsCopy)
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
                      
                      valid={control.valid}               //return of createControl()
                      touched={control.touched}           //return of createControl()
          
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
              disabled={this.props.quiz.length === 0} 
              onClick={this.createQuiz}>
                Create quiz
            </Button>
          </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    quiz: state.createQuiz.quiz
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addQuestion: item => dispatch(addQuestion(item)),
    createQuiz: () => dispatch(createQuiz()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);