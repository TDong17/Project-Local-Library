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

  genreFrequency.sort((genreA, genreB) =>
    genreA.count > genreB.count ? -1 : 1
  );

  while (genreFrequency.length > 5) {
    genreFrequency.pop();
  }

  return genreFrequency;
}

function getMostPopularBooks(books) {
  //TODO EXPECTING MOST POPULAR BOOK TO BE 11 COUNT. GETTING 10 INSTEAD FOR SOME REASON.
  const bookPopularity = books.map((book) => {
    let currentBook = book;
    const name = book.title;
    const count = book.borrows.length;
    return {
      name,
      count,
    };
  });

  bookPopularity.sort((bookA, bookB) => (bookA.count > bookB.count ? -1 : 1));

  while (bookPopularity.length > 5) {
    bookPopularity.pop();
  }

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

  authorsPopularity.sort((authorA, authorB) =>
    authorA.count > authorB.count ? -1 : 1
  );

  while (authorsPopularity.length > 5) {
    authorsPopularity.pop();
  }

  return authorsPopularity;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
