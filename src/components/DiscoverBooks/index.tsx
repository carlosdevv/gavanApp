/* eslint-disable array-callback-return */
import { useContext } from 'react'
import { FiBarChart2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import styles from './discoverBook.module.scss'

import { SearchContext } from '../../contexts/SearchContext'


export function DiscoverBooks() {
  const { handleMore, discoverResults } = useContext(SearchContext);

  return (
    <section className={styles.newBooksContainer}>
      <div className={styles.wrapTexts}>
        <h2>Discover new book</h2>
        <button onClick={handleMore}>More</button>
      </div>

      <div className={styles.newBooksList}>
        {discoverResults && discoverResults.map(results => {
          if (results.volumeInfo.imageLinks && results.volumeInfo.imageLinks.thumbnail) {
            return (
              <Link key={results.id} to={`/detail/${results.id}`}>
                <div className={styles.bookCard}>
                  <div className={styles.bookCardHero}>
                    <h2>{results.volumeInfo.title}</h2>
                    <span>{results.volumeInfo.authors}</span>
                    <div className={styles.readers}>
                      <FiBarChart2 />
                      <span>120+ Read Now</span>
                    </div>
                  </div>

                  <img src={results.volumeInfo.imageLinks.thumbnail} alt={results.volumeInfo.title} />
                </div>
              </Link>
            )
          }
        })}



      </div>
    </section>
  )
}