const bookForm = document.getElementById('bookForm');
    const unfinishedBooksList = document.querySelector('#unfinishedBooks ul');
    const finishedBooksList = document.querySelector('#finishedBooks ul');

    const storedBooks = JSON.parse(localStorage.getItem('books')) || [];

    function updateBookshelves() {
      unfinishedBooksList.innerHTML = '';
      finishedBooksList.innerHTML = '';

      storedBooks.forEach(book => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <span>${book.title} - ${book.author} (${book.year})</span>
          <button class="move-button" data-id="${book.id}">${book.isComplete ? 'Pindahkan ke Belum Selesai Dibaca' : 'Pindahkan ke Selesai Dibaca'}</button>
          <button class="delete-button" data-id="${book.id}">Hapus</button>
        `;

        const moveButton = listItem.querySelector('.move-button');
        moveButton.addEventListener('click', () => moveBook(book.id));

        const deleteButton = listItem.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => deleteBook(book.id));

        if (book.isComplete) {
          finishedBooksList.appendChild(listItem);
        } else {
          unfinishedBooksList.appendChild(listItem);
        }
      });
    }

    function addBook(title, author, year, isComplete) {
      const newBook = {
        id: +new Date(),
        title,
        author,
        year,
        isComplete,
      };

      storedBooks.push(newBook);
      localStorage.setItem('books', JSON.stringify(storedBooks));
      updateBookshelves();
    }

    function moveBook(id) {
      const bookIndex = storedBooks.findIndex(book => book.id === id);

      if (bookIndex !== -1) {
        storedBooks[bookIndex].isComplete = !storedBooks[bookIndex].isComplete;
        localStorage.setItem('books', JSON.stringify(storedBooks));
        updateBookshelves();
      }
    }

    function deleteBook(id) {
      const bookIndex = storedBooks.findIndex(book => book.id === id);

      if (bookIndex !== -1) {
        storedBooks.splice(bookIndex, 1);
        localStorage.setItem('books', JSON.stringify(storedBooks));
        updateBookshelves();
      }
    }

    bookForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const year = document.getElementById('year').value;
      const status = document.getElementById('status').value;

      const isComplete = status === 'finished';

      addBook(title, author, year, isComplete);

      bookForm.reset();
    });

    updateBookshelves();