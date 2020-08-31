import React, { Component } from 'react';
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
          minLength: 8
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
            <Button type='primary' disabled={!this.state.isFormValid}>Sign In</Button> {/* войти в систему */}
            <Button type='success' disabled={!this.state.isFormValid}>Sign Up</Button>  {/* зарегистрироваться */}
          </div>
        </form>
      </div>
    )
  }
}
