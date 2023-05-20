function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let borrowedBooks = [];
  let unborrowedBooks = [];
  books.forEach((book) => {
    book.borrows[0].returned === true
      ? unborrowedBooks.push(book)
      : borrowedBooks.push(book);
  });
  return [borrowedBooks, unborrowedBooks];
}

function getBorrowersForBook(book, accounts) {
  let bookBorrowers = book.borrows;

  let bookBorrowerAccounts = bookBorrowers.map((borrower) => {
    const accountObj = accounts.find((acc) => acc.id === borrower.id);
    return {
      ...borrower,
      ...accountObj,
    };
  });
  while (bookBorrowerAccounts.length > 10) {
    bookBorrowerAccounts.pop();
  }
  return bookBorrowerAccounts;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
