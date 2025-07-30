import { input } from "@inquirer/prompts";
import { formatName } from "./utils/index.js";
import { searchBooksTitle, searchBooksAuthors } from "./services/api.js";

async function main() {
  while (true) {
    const title = await input({ message: "Enter a book title:" });

    try {
      const book = await searchBooksTitle(title);
      await Promise.all(
        book.authors.map(async (id) => {
            const res = await searchBooksAuthors(id);
            const fullName = formatName(res);
            console.log(`Author: ${fullName}`);
        })
      );
    } catch (err) {
      console.error("Error:", err.message);
    }
  }
}

main();
