import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './QuizList.module.css'

export default class QuizList extends Component {
    renderList() {
        return [1, 2, 3].map((quiz, index) => {
            return (
                <li key={index}>
                    <NavLink to={`/quiz/${quiz}`}>
                        Quiz #{quiz}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        return (
            <div className={styles.QuizList}>
                <h1>Quiz List</h1>
                <ul>
                    {this.renderList()}
                </ul>
            </div>
        )
    }
}
