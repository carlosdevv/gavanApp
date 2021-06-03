import { useContext } from "react";
import { Link } from "react-router-dom";
import { SideBar } from "../../components/SideBar";
import { LibraryContext } from "../../contexts/LibraryContext";

import styles from './library.module.scss'



export function LibraryPage() {
  const { myLibrary } = useContext(LibraryContext)

  return (
    <>
      <div className={styles.libraryPage}>
        <SideBar />

        <section className={styles.librarySection}>
          <h1>My Library</h1>

          <div className={styles.contentBooks}>
            {myLibrary && myLibrary.map(books => {
              if (books.volumeInfo.imageLinks && books.volumeInfo.imageLinks.thumbnail) {
                return (

                  <div key={books.id} className={styles.bookThumbnail}>

                    <Link to={`/detail/${books.id}`}>
                      < img src={books.volumeInfo.imageLinks.thumbnail} alt={books.volumeInfo.title} />
                    </Link>
                    <h1>{books.volumeInfo.title}</h1>
                    <span>{books.volumeInfo.authors}</span>
                  </div>

                )
              }

            })}
          </div>
        </section>
      </div>
    </>
  )
}