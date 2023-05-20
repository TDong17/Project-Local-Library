function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  let numberOfBorrows = 0;
  for (let i = 0; i < books.length; i++) {
    const bookBorrowList = books[i].borrows;
    for (let j = 0; j < bookBorrowList.length; j++) {
      let currentBorrowId = bookBorrowList[j].id;
      if (currentBorrowId === accountId) {
        numberOfBorrows++;
      }
    }
  }
  return numberOfBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;

  const borrowedBooksByAccount = books.filter((book) => {
    const currentBorrower = book.borrows[0];
    return (
      book.borrows.length > 0 &&
      currentBorrower.id === accountId &&
      !currentBorrower.returned
    );
  });

  const posessedBooksWithAuthor = borrowedBooksByAccount.map((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    return {
      ...book,
      author,
    };
  });

  return posessedBooksWithAuthor;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
