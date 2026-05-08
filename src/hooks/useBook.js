import { useState, useEffect } from "react";
import { mockBookDetail as BOOK_DATA } from "../utils/mocks/mockBookDetail";

export function useBook(bookID) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      setBook(BOOK_DATA);
      const bookData = BOOK_DATA[bookID];
      if (bookData) {
        setBook(bookData);
        setLoading(false);
        setError("");
      } else {
        setLoading(false);
        setError("Libro no encontrado");
      }
    };
    fetchBook();
  }, [bookID]);

  return { book, loading, error };
}