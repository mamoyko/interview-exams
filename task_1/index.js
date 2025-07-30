import { input } from "@inquirer/prompts";
import { searchBooksTitle, searchBooksAuthors } from "./services/api.js";

async function main() {
  while (true) {
    const title = await input({ message: "Enter a book title:" });

    try {
      const book = await searchBooksTitle(title);

      const authors = await Promise.all(
        book.authors.map(async (id) => {
            console.log(id);
        })
      );
    } catch (err) {
      console.error("Error:", err.message);
    }
  }
}

main();
