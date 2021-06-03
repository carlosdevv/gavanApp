import { useContext } from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CurrentBook } from "../../components/CurrentBook";

import { DiscoverBooks } from "../../components/DiscoverBooks";
import { ReviewBook } from "../../components/ReviewBook";
import { SideBar } from "../../components/SideBar";
import { SearchContext } from "../../contexts/SearchContext";

import styles from './home.module.scss'

type ListBooks = {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    description: string;
    imageLinks: {
      thumbnail: string;
    };
    industryIdentifiers: [{
      identifier: string;
    }];
  };
}

type HomeProps = {
  allBooks: ListBooks[];
}

export function HomePage({ allBooks }: HomeProps) {
  const { book, handleChange, listBooks } = useContext(SearchContext);

  const urlVideo = "https://www.youtube.com/watch?v=ezDOLO2Fk5I&ab_channel=JackEdwardsJackEdwardsVerificado";

  return (
    <>
      <div className={styles.homePage}>
        <SideBar />

        <section className={styles.homeSection}>
          <div className={styles.searchBarContainer}>
            <form onSubmit={() => { }}>
              <FiSearch size={16} />
              <input type="text" id="book" placeholder="Search book" autoComplete="off" onChange={handleChange} />
            </form>
          </div>


          <div className={styles.contentBooks}>
            {book ? listBooks.map(books => {
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
              else {
                return <img src="" alt="" /> // caso não haja thumbnail.
              }
            }) : (
              <div >
                <h1>Hi, <span>Carlos Lopes 👋</span></h1>
                <DiscoverBooks />
                <CurrentBook />
                <ReviewBook url={urlVideo} />
              </div>
            )}
          </div>

        </section>
      </div>
    </>
  )
}