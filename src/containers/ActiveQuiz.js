import React from 'react'
import AnswerList from '../components/AnswerList/AnswerList'
import FinishedQuiz from '../components/FinishedQuiz/FinishedQuiz'
import styles from './ActiveQuiz.module.css'

class ActiveQuiz extends React.Component {
    state = {
        currentQuestion: 0,
        isFinished: false,
        results: {},
        isCurrentCorrect: null,
        quiz: [
            {
                question: 'What part of Harry Potter saga is "the Prisoner of Azkaban"?',
                id: 1,
                correctAnswerId: 3,
                answers: [
                    {answerId: 1, answerText: 'first'},
                    {answerId: 2, answerText: 'second'},
                    {answerId: 3, answerText: 'third'},
                    {answerId: 4, answerText: 'fourth'},
                ]
            },
            {
                question: 'The second book of the saga is "Harry Potter and the..." ',
                id: 2,
                correctAnswerId: 1,
                answers: [
                    {answerId: 1, answerText: 'Chamber of Secrets'},
                    {answerId: 2, answerText: 'Hall of Wellknowns'},
                    {answerId: 3, answerText: 'Chamber of Serpents'},
                    {answerId: 4, answerText: 'DID YA THROW YA NAME IN DA GOBLET OF FIYAH?!'},
                ]
            },
            {
                question: 'What animal embodied Harry Potter\'s Patronus?',
                id: 3,
                correctAnswerId: 1,
                answers: [
                    {answerId: 1, answerText: 'Stag'},
                    {answerId: 2, answerText: 'Doe'},
                    {answerId: 3, answerText: 'Lion'},
                    {answerId: 4, answerText: 'Phoenix'},
                ]
            },
            {
                question: 'How much horcruxes created Lord Voldemort?',
                id: 4,
                correctAnswerId: 3,
                answers: [
                    {answerId: 1, answerText: '5'},
                    {answerId: 2, answerText: '6'},
                    {answerId: 3, answerText: '7'},
                    {answerId: 4, answerText: '8'},
                ]
            },
            {
                question: 'Which dark wizard was defeated by Albus Dumbledore?',
                id: 5,
                correctAnswerId: 2,
                answers: [
                    {answerId: 1, answerText: 'Voldemort'},
                    {answerId: 2, answerText: 'Grindelwald'},
                    {answerId: 3, answerText: 'Slytherin'},
                    {answerId: 4, answerText: 'Malfoy'},
                ]
            },
        ]
    }

    onClickHandler = id => {
        let currentQuizItem = this.state.quiz[this.state.currentQuestion];
        let results = {...this.state.results};

        /* so that one cannot double click the correct answer in one question and finish the quiz */
        if (this.state.isCurrentCorrect && this.state.isCurrentCorrect[id] === 'correct') {
            return
        }
        
        if (id === currentQuizItem.correctAnswerId) { // if the answer is correct
            if (!results[currentQuizItem.id]) { // if one answered on this question correctly from the first try
                results[currentQuizItem.id] = 'correct'
            }

            this.setState(state => ({
                isCurrentCorrect: {[id]: 'correct'},
                results
            }))
            
            const timeout = setTimeout(() => {
                if (this.state.currentQuestion + 1 === this.state.quiz.length) { // if it's the last question
                    this.setState({
                            isCurrentCorrect: null,
                            isFinished: true
                        })
                } else {
                    this.setState(state => (
                        {
                            currentQuestion: state.currentQuestion + 1,
                            isCurrentCorrect: null
                        }
                    ))
                    clearTimeout(timeout);
                }
            }, 1500)
        } else { // if the answer is wrong
            results[currentQuizItem.id] = 'error'
            this.setState(state => ({
                isCurrentCorrect: {[id]: 'error'},
                results
            }))
        }
    }

    onRestartQuiz = () => {
        this.setState({
            currentQuestion: 0,
            isFinished: false,
            results: {}, 
            isCurrentCorrect: null,
        })
    }

    render() {
        let currentQuizItem = this.state.quiz[this.state.currentQuestion];
        let quizLength = this.state.quiz.length;

        return (
            <div className={styles.activeQuiz}>
                <h1>It's the React quiz!</h1>

                {this.state.isFinished 
                ? <FinishedQuiz 
                    quizLength={quizLength}
                    results={this.state.results}
                    quiz={this.state.quiz}
                    onRestartQuiz={this.onRestartQuiz.bind(this)}
                />
                : <AnswerList 
                    currentQuizItem={currentQuizItem}
                    currentQuestion={this.state.currentQuestion}
                    quizLength={quizLength}
                    onClickHandler={this.onClickHandler.bind(this)}
                    answers={currentQuizItem.answers}
                    isCorrect={this.state.isCurrentCorrect} 
                />}
            </div>
        )
    }
}

export default ActiveQuiz;