import React from 'react'
import { FiBarChart2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import styles from './review.module.scss'

import ReactPlayer from 'react-player'

type ReviewBookProps = {
  url: string;
}


export function ReviewBook(props: ReviewBookProps) {
  return (
    <section className={styles.reviewContainer}>
      <div>
        <h2>Reviews of the day</h2>
        {/* <h1>All video</h1> */}
      </div>

      <div className={styles.reviewList}>

        <ReactPlayer
          className={styles.reactPlayer}
          url={props.url}
          width="32rem"
          height="18rem"
          controls={true}

        />

      </div>
    </section>
  )
}