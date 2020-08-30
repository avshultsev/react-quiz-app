import React from 'react';
import styles from './Input.module.css';

const Input = props => {
  const htmlFor = `${props.type}-${Math.random()}`;

  return (
    <div className={`${styles.Input} ${props.touched && (props.valid ? styles.valid : styles.invalid)}`}>
      <label 
        htmlFor={htmlFor}>
          {props.label}
      </label>
      <input 
        type={props.type || 'text'} 
        id={htmlFor} 
        value={props.value} 
        onChange={props.inputHandler}
        onBlur={props.validateInput}
      />
      {
        !props.valid && props.touched && <span>{props.errorMessage}</span>
      }
    </div>
  )
}

export default Input;