import axiosInstance from "../utils/axios.js";
import { formatName } from "../utils/index.js";
import { getCache, setCache, isExpired } from "../cache.js";
import { CACHE_DURATION_HOURS } from "../config.js";

export const searchBookWithAuthors = async (title) => {
  try {

    const cacheKey = `book:${title.toLowerCase()}`;
    const cached = getCache(cacheKey);
    if (cached && !isExpired(cached.timestamp, CACHE_DURATION_HOURS)) {
      return cached.data;
    }

    const book = await searchBooksTitle(title);
    const authors = await Promise.all(
      book.authors.map(async (id) => {
        const authKey = `author:${id}`;
        const cachedAuthor = getCache(authKey);
        if (
          cachedAuthor &&
          !isExpired(cachedAuthor.timestamp, CACHE_DURATION_HOURS)
        ) {
          console.log(cachedAuthor.data);
          return cachedAuthor.data;
        }
        const author = await searchBooksAuthors(id);
        const fullName = formatName(author);
        setCache(authKey, fullName);
        return fullName;
      })
    );
    const bookData = {
      title: book.title,
      description: book.description,
      authors,
    };
    setCache(cacheKey, bookData);
    return bookData;
  } catch (error) {
    console.error(
      "Error searching books with authors:",
      error.data || error.message
    );
    throw error;
  }
};

export const searchBooksTitle = async (title) => {
  try {
    const response = await axiosInstance.post("/api/books/search", {
      title,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error searching books with authors:",
      error.data || error.message
    );
    throw error;
  }
};

export const searchBooksAuthors = async (authorId) => {
  try {
    const response = await axiosInstance.get(`/api/authors/${authorId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error searching books with authors:",
      error.data || error.message
    );
    throw error;
  }
};
