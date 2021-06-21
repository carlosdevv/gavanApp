import { useContext, useEffect, useState } from "react";
import { FiBookOpen, FiHeadphones, FiShare, FiPlus, FiX, FiArrowLeft } from "react-icons/fi";

import styles from './detail.module.scss'
import { useParams } from "react-router";
import api from "../../services/api";
import { LibraryContext } from "../../contexts/LibraryContext";
import { Link } from "react-router-dom";

interface DetailParams {
  id: string;
}

type ListBooks = {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    description: string;
    pageCount: number;
    publishedDate: string;
    previewLink: string;
    imageLinks: {
      thumbnail: string;
    };
    industryIdentifiers: [{
      identifier: string;
    }];
  };
}

export function DetailPage() {
  const { addToMyLibrary, isInMyLibrary, removeBook } = useContext(LibraryContext);

  const [book, setBook] = useState<ListBooks | null>(null);
  const { id } = useParams<DetailParams>();

  useEffect(() => {
    api.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then(response => {
        setBook(response.data);
      })

  }, [id]);

  return (
    <>
      <div className={styles.detailPage}>
        <Link to="/">
          <FiArrowLeft size={35} />
        </Link>

        {book && (
          <section className={styles.detailSection}>

            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />

            <h1>{book.volumeInfo.title}</h1>
            <h2>{book.volumeInfo.authors}</h2>
            <div className={styles.detailsBook}>
              <span>Page Count: <strong>{book.volumeInfo.pageCount}</strong></span>
              <span>Publication Date: <strong>{book.volumeInfo.publishedDate}</strong></span>
            </div>

            <html>{book.volumeInfo.description}</html>

            <div className={styles.readOptions}>
              <a href={book.volumeInfo.previewLink}>
                <FiBookOpen />
                <span>Read</span>
              </a>
              <a href={book.volumeInfo.previewLink}>
                <FiHeadphones />
                <span>Listen</span>
              </a>
              <button disabled>
                <FiShare />
                <span>Share</span>
              </button>
              {isInMyLibrary(book) ? (
                <button className={styles.removeButton} onClick={() => removeBook(book.id)}>
                  <FiX />
                  <span>Remove Book</span>
                </button>
              ) : (
                <button className={styles.addButton} onClick={() => addToMyLibrary(book)}>
                  <FiPlus />
                  <span>Add Book</span>
                </button>
              )
              }
            </div>
          </section>
        )}

      </div>
    </>
  )
}