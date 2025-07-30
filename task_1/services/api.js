import axiosInstance from "../utils/axios.js";

export const searchBooksTitle = async (title) => {
  try {
    console.log("Searching for books with title:", title);
    const response = await axiosInstance.post("/api/books/search", {
        title,
    });
    return response.data;
  } catch (error) {
    console.error("Error searching books with authors:", error.data || error.message);
    throw error;
  }
};

export const searchBooksAuthors = async (authorId) => {
  try {
    const response = await axiosInstance.get(`/api/authors/${authorId}`);
    return response.data;
  } catch (error) {
    console.error("Error searching books with authors:", error.data || error.message);
    throw error;
  }
}