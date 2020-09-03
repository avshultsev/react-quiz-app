import React, { Component } from 'react';
import axios from 'axios';
import styles from './Auth.module.css';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

export default class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Enter correct e-mail!',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Password too short!',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  submitHandler = event => {
    event.preventDefault();
  }

  validateControl = (value, validation) => {
    if (!validation) return true;

    let isValid = true;
    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
      const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      isValid = pattern.test(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.trim().length >= validation.minLength && isValid;
    }

    return isValid;
  }

  inputHandler = (event, type) => {
    const formControlsCopy = { ...this.state.formControls };
    const controlCopy = { ...formControlsCopy[type] };

    controlCopy.value = event.target.value;
    controlCopy.touched = true;
    controlCopy.valid = this.validateControl(controlCopy.value, controlCopy.validation);

    formControlsCopy[type] = controlCopy;

    let isFormValid = true;
    Object.keys(formControlsCopy).forEach(control => {
      isFormValid = formControlsCopy[control].valid && isFormValid;
    })

    this.setState({
      formControls: formControlsCopy,
      isFormValid
    })
  }

  signInHandler = async () => { //login
    try {
      const formControls = this.state.formControls;
      const authData = {
        email: formControls.email.value,
        password: formControls.password.value,
        returnSecureToken: true
      }
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCMheNS1NSAy0K9L7cq5k-P3eu5DZ4JFg0', authData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  signUpHandler = async () => { //register
    try {
      const formControls = this.state.formControls;
      const authData = {
        email: formControls.email.value,
        password: formControls.password.value,
        returnSecureToken: true
      }
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCMheNS1NSAy0K9L7cq5k-P3eu5DZ4JFg0', authData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className={styles.Auth}>
        <h1>Have we met somewhere before? :)</h1>
        <h4>Please sign in if you are already registered or create an account.</h4>

        <form onSubmit={this.submitHandler} className={styles.form}>
          <div className={styles.inputSection}>
            {
              Object.keys(this.state.formControls).map((control, index) => {
                const controlName = this.state.formControls[control];
                const type = controlName.type;

                return (
                  <Input
                    key={type + index.toString()}
                    type={type}
                    label={controlName.label}
                    value={controlName.value}
                    errorMessage={controlName.errorMessage}

                    valid={controlName.valid}
                    touched={controlName.touched}

                    inputHandler={event => this.inputHandler(event, type)}
                  />
                )
              })
            }
          </div>

          <div className={styles.buttonSection}>
            <Button 
              type='primary' 
              disabled={!this.state.isFormValid}
              onClick={ this.signInHandler }>
                Sign In
            </Button> {/* войти в систему */}
            <Button 
              type='success' 
              disabled={!this.state.isFormValid}
              onClick={ this.signUpHandler }>
                Sign Up
            </Button>  {/* зарегистрироваться */}
          </div>
        </form>
      </div>
    )
  }
}
