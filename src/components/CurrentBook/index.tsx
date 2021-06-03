import { useContext } from 'react'
import { FiBook } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { SearchContext } from '../../contexts/SearchContext';
import styles from './currentBook.module.scss'


export function CurrentBook() {
  const { readingNow } = useContext(SearchContext);
  return (
    <section className={styles.currentBookContainer}>
      <div>
        <h2>Currently Reading</h2>
        {/* <h1>All</h1> */}
      </div>

      <div className={styles.currentBookList}>
        {readingNow && readingNow.map(book => {
          if (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) {
            return (
              <Link key={book.id} to={`/detail/${book.id}`}>
                <div className={styles.bookCard}>
                  <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />

                  <div className={styles.bookCardHero}>
                    <h2>{book.volumeInfo.title}</h2>
                    <span>{book.volumeInfo.authors}</span>
                    <div>
                      <FiBook />
                      <span>Chapter 2 From 9</span>
                    </div>
                  </div>

                </div>
              </Link>
            )
          }
        })}


      </div>
    </section>
  )
}