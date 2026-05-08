import { useState, useEffect } from "react";
import { mockBooks as BOOKS_DATA } from "../utils/mocks/mockBooks";

export function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      setBooks(BOOKS_DATA);
      if (books.length > 0) {
        setLoading(false);
        setError("Error al cargar inventario de libros");
      }
      setLoading(false);
      setError("");
    };
    fetchBooks();
  }, [books]);
  return { books, loading, error };
}