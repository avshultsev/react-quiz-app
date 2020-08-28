import React, { Component } from 'react';
import styles from './Auth.module.css';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

export default class Auth extends Component {

  state = {
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Enter correct e-mail',
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
        errorMessage: 'Password invalid',
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

  inputHandler = event => {
    console.log(event.target.value);
  }

  render() {

    return (
      <div className={styles.Auth}>
        <h1>Auth</h1>

        <form onSubmit={this.submitHandler}>
          <div className={styles.inputSection}>
            {
              Object.keys(this.state.formControls).map((control, index) => {
                const controlName = this.state.formControls[control];

                return(
                  <Input
                    key={controlName.type + index.toString()}
                    type={controlName.type}  
                    label={controlName.label} 
                    value={controlName.value}
                    errorMessage={controlName.errorMessage}

                    valid={controlName.valid}
                    touched={controlName.touched}
                    required={controlName.required}

                    inputHandler={event => this.inputHandler(event)}
                  />
                )
              })
            }
          </div>
          
          <div className={styles.buttonSection}>
            <Button type='primary'>Sign In</Button> {/* войти в систему */}
            <Button type='success'>Sign Up</Button>  {/* зарегистрироваться */}
          </div>
        </form>
      </div>
    )
  }
}
