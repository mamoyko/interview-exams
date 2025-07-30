import { input } from "@inquirer/prompts";
import { searchBookWithAuthors } from "./services/api.js";

async function main() {
  while (true) {
    const title = await input({ message: "Enter a book title:" });
    try {
      const bookInfo = await searchBookWithAuthors(title);
      if (!bookInfo) {
        console.log('Book not found.');
      } else {
        const { authors } = bookInfo;
        console.log(`Authors: ${authors.join(', ')}\n`);
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  }
}

main();
