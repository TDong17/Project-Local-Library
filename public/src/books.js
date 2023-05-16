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

function getBorrowersForBook(book, accounts) {}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
