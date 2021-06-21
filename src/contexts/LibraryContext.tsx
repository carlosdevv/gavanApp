/* eslint-disable array-callback-return */
import { createContext, ReactNode, useState } from "react";

type LibraryContextData = {
  addToMyLibrary: (book: any) => void;
  removeBook: (book: any) => void;
  isInMyLibrary: (book: any) => boolean;
  myLibrary: ListBooks[];
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


export const LibraryContext = createContext({} as LibraryContextData);

type LibraryContextProviderProps = {
  children: ReactNode;
}

export function LibraryContextProvider({ children }: LibraryContextProviderProps) {
  const [myLibrary, setMyLibrary] = useState<ListBooks[]>([]);

  function addToMyLibrary(book: any) {
    setMyLibrary([...myLibrary, book])
  }

  function isInMyLibrary(book: any): boolean {
    let hasBook = false;
    myLibrary.map(item => {
      if (item.id === book.id) {
        hasBook = true;
      }
    })
    return hasBook;
  }

  function removeBook(id: string) {
    const newLibrary = myLibrary.filter((book) => book.id !== id)

    setMyLibrary(newLibrary);
  }


  return (
    <LibraryContext.Provider value={{
      addToMyLibrary,
      isInMyLibrary,
      removeBook,
      myLibrary,
    }}>
      {children}
    </LibraryContext.Provider>
  )
}