function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let result = books.filter((book) => book.borrows[0].returned === false);
  return result.length;
}

function getMostCommonGenres(books) {
  const genreFrequency = books.reduce((frequency, { genre }) => {
    const existingGenre = frequency.find(
      (bookGenre) => bookGenre.name === genre
    );
    if (existingGenre) {
      existingGenre.count++;
    } else {
      frequency.push({ name: genre, count: 1 });
    }
    return frequency;
  }, []);

  sortMostPopular(genreFrequency);
  limitReturnSize(genreFrequency, 5);
  return genreFrequency;
}

function getMostPopularBooks(books) {
  const bookPopularity = books.map((book) => {
    let currentBook = book;
    const name = book.title;
    const count = book.borrows.length;
    return {
      name,
      count,
    };
  });

  sortMostPopular(bookPopularity);
  limitReturnSize(bookPopularity, 5);
  return bookPopularity;
}

function getMostPopularAuthors(books, authors) {
  const booksBorrowFrequency = books.reduce(
    (frequency, { authorId, borrows }) => {
      const existingAuthor = frequency.find(
        (bookAuthorId) => bookAuthorId.authId === authorId
      );
      if (existingAuthor) {
        existingAuthor.count += borrows.length;
      } else {
        frequency.push({ authId: authorId, count: borrows.length });
      }
      return frequency;
    },
    []
  );

  let authorsPopularity = authors.map((author) => {
    const firstName = author.name.first;
    const lastName = author.name.last;
    const name = `${firstName} ${lastName}`;
    const authorObj = booksBorrowFrequency.find(
      (book) => book.authId === author.id
    );
    const count = authorObj.count;
    return {
      name,
      count,
    };
  });

  sortMostPopular(authorsPopularity);
  limitReturnSize(authorsPopularity, 5);
  return authorsPopularity;
}

//HELPER FUNCTIONS BELOW
function limitReturnSize(array, limit) {
  while (array.length > limit) {
    array.pop();
  }
}

function sortMostPopular(array) {
  array.sort((itemA, itemB) => (itemA.count > itemB.count ? -1 : 1));
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
