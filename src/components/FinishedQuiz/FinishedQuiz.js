import React from 'react'
import styles from './FinishedQuiz.module.css'
import Button from '../../UI/Button/Button'

const FinishedQuiz = props => {
    let correctArr = Object.keys(props.results).filter(key => props.results[key] === 'correct')

    return (
        <div>
            <h3>Let's take a look at the results...</h3>
            <section className={styles.answersSection}>
                <ul>
                    {props.quiz.map((quizItem, index) => {
                        return (
                            <li key={index}>
                                <strong>{quizItem.id}.</strong>&nbsp;
                                <span>{quizItem.question}</span>&nbsp;
                                <span>
                                    {props.results[quizItem.id] === 'correct'
                                     ? <span className={styles.check}>&#x2713;</span>
                                     : <span className={styles.times}>&#x2716;</span>}
                                </span>
                            </li>
                        )
                    })}
                </ul>
            </section>
            <section className={styles.resultsSection}>
                You gave {correctArr.length} correct answers out of {props.quizLength}!&nbsp;
                {correctArr.length === props.quizLength 
                ? <span>Congratulations! You answered all the questions correctly!</span>
                : <span>You can do it way better, I believe in you!</span>}
            </section>
            <hr />
            <section className={styles.buttonSection}>
                <div className={styles.buttonWrapper}>
                    <Button onClick={props.onRestartQuiz} type='primary'>Try again</Button>
                    <Button type='success'>Choose another quiz</Button>
                </div>
            </section>
        </div>
    )
}

export default FinishedQuiz