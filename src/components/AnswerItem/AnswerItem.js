import React from 'react'
import styles from './AnswerItem.module.css'

const AnswerItem = ({answer, onClickHandler, isCorrect}) => {
    return (
        <li className={`${styles.listItem} ${styles[isCorrect]}`} 
            onClick={() => onClickHandler(answer.answerId)}>
            <strong>{answer.answerId}.</strong>&nbsp;
            {answer.answerText}
        </li>
    )
}

export default AnswerItem