import React from 'react';
import styles from './Input.module.css';

const Input = props => {
  const htmlFor = `${props.type}-${Math.random()}`;

  return (
    <div className={styles.Input}>
      <label 
        htmlFor={htmlFor}>
          {props.label}
      </label>
      <input 
        type={props.type || 'text'} 
        id={htmlFor} 
        value={props.value} 
        onChange={props.inputHandler}/>
    </div>
  )
}

export default Input;