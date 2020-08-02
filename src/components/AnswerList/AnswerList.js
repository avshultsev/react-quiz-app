import React from 'react'
import AnswerItem from '../AnswerItem/AnswerItem'
import styles from './AnswerList.module.css'

const AnswerList = props => {
    return (
        <section>
            <div className={styles.activeQuizHeader}>
                <h4 className={styles.questionText}>
                    {props.currentQuizItem.question}
                </h4>
                <small>{props.currentQuestion + 1} из {props.quizLength}</small>
            </div>
            <ul className={styles.answerList}>
                {props.answers.map( (answer, index) => {
                    return <AnswerItem key={index} answer={answer} 
                    onClickHandler={props.onClickHandler} 
                    isCorrect={props.isCorrect ? props.isCorrect[answer.answerId] : null } />
                } )}
            </ul>
        </section>
    )
}

export default AnswerList