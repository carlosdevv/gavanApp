import { createContext, ReactNode, useEffect, useState } from "react";
import api from "../services/api";

type SearchContextData = {
  book: string;
  listBooks: ListBooks[];
  discoverResults: ListBooks[];
  readingNow: ListBooks[];
  handleChange: (e: any) => void;
  handleMore: () => void;
};

interface ListBooks {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    description: string;
    pageCount: number;
    publishedDate: string;
    imageLinks: {
      thumbnail: string;
    };
    industryIdentifiers: {
      identifier: string;
    };
  };
}

export const SearchContext = createContext({} as SearchContextData);

type SearchContextProviderProps = {
  children: ReactNode;
}

export function SearchContextProvider({ children }: SearchContextProviderProps) {
  const [book, setBook] = useState("");
  const [listBooks, setListBooks] = useState<ListBooks[]>([])

  const [discoverIndex, setDiscoverIndex] = useState(5);
  const [discoverResults, setDiscoverResults] = useState<ListBooks[]>([]);
  const [readingNow, setReadingNow] = useState<ListBooks[]>([]);
  const apiKey = "AIzaSyDRbRVsAtP91VUDl1vQEzZx-dZYXbbusvo";


  function handleChange(e: any) {
    const book = e.target.value;
    setBook(book);

    if (book != null) {
      api.get(`https://www.googleapis.com/books/v1/volumes?q=${book}&key=${apiKey}&maxResults=40`)
        .then(response => {
          setListBooks(response.data.items)
        })

    } else {
      setListBooks([]);
      setBook("");
    }
  }

  function handleMore() {
    setDiscoverIndex(discoverIndex + 1);
    api.get(`https://www.googleapis.com/books/v1/volumes?q=harry+potter&key=${apiKey}&maxResults=${discoverIndex}`)
      .then(response => {
        setDiscoverResults(response.data.items)
      })
  }


  useEffect(() => {
    api.get(`https://www.googleapis.com/books/v1/volumes?q=harry+potter&key=${apiKey}&maxResults=${discoverIndex}`)
      .then(response => {
        setDiscoverResults(response.data.items)
      })
  }, [discoverIndex])

  useEffect(() => {
    api.get(`https://www.googleapis.com/books/v1/users/116245575437885128435/bookshelves/3/volumes?key=${apiKey}`)
      .then(response => {
        setReadingNow(response.data.items);
      })
  }, [])


  return (
    <SearchContext.Provider value={{
      book,
      listBooks,
      handleChange,
      handleMore,
      discoverResults,
      readingNow,
    }}>
      {children}
    </SearchContext.Provider>
  )
}