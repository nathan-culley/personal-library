  // Book constructor function
  function Book(title, author, publicationDate, rating) {
    this.title = title;
    this.author = author;
    this.publicationDate = publicationDate;
    this.rating = rating;
  }

  // Array to store Book objects
  let books = [];

  // Function to render the books
  function renderBooks() {
    // Get the table body element
    let bookList = document.querySelector("#book-list");

    // Clear the table body
    bookList.innerHTML = "";

    // Loop through the books array
    for (let i = 0; i < books.length; i++) {
      let book = books[i];

      // Create a new row for the book
      let row = document.createElement("tr");

      // Create cells for the title, author, publication date, rating, and actions
      let titleCell = document.createElement("td");
      titleCell.textContent = book.title;
      row.appendChild(titleCell);

      let authorCell = document.createElement("td");
      authorCell.textContent = book.author;
      row.appendChild(authorCell);

      let publicationDateCell = document.createElement("td");
      publicationDateCell.textContent = book.publicationDate;
      row.appendChild(publicationDateCell);

      let ratingCell = document.createElement("td");
      ratingCell.textContent = book.rating;
      row.appendChild(ratingCell);

      // Add edit and delete buttons to each row
      const editBtn = document.createElement("button");
      editBtn.innerHTML = "Edit";
      editBtn.className = "edit-btn";
      editBtn.style.display = "inline-block";

      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "Delete";
      deleteBtn.className = "delete-btn";
      deleteBtn.style.display = "inline-block";

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.className = "save-btn"
      saveBtn.style.display = "none";

      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.className = "cancel-btn";
      cancelBtn.style.display = "none";

      // Allow user to edit books previously entered
      editBtn.addEventListener("click", function() {
        // Replace text with input fields
        let titleCell = row.querySelector("td:nth-child(1)");
        let authorCell = row.querySelector("td:nth-child(2)");
        let dateCell = row.querySelector("td:nth-child(3)");
        let ratingCell = row.querySelector("td:nth-child(4)");

        let titleInput = document.createElement("input");
        titleInput.setAttribute("id", "title-input");
        titleInput.type = "text";
        titleInput.value = titleCell.innerHTML;
        titleCell.innerHTML = "";
        titleCell.appendChild(titleInput);

        let authorInput = document.createElement("input");
        authorInput.setAttribute("id", "author-input");
        authorInput.type = "text";
        authorInput.value = authorCell.innerHTML;
        authorCell.innerHTML = "";
        authorCell.appendChild(authorInput);

        let dateInput = document.createElement("input");
        dateInput.setAttribute("id", "publication-date-input");
        dateInput.type = "text";
        dateInput.value = dateCell.innerHTML;
        dateCell.innerHTML = "";
        dateCell.appendChild(dateInput);

        let ratingInput = document.createElement("input");
        ratingInput.setAttribute("id", "rating-input");
        ratingInput.type = "text";
        ratingInput.value = ratingCell.innerHTML;
        ratingCell.innerHTML = "";
        ratingCell.appendChild(ratingInput);

        editBtn.style.display = "none";
        deleteBtn.style.display = "none";
        saveBtn.style.display = "inline-block";
        cancelBtn.style.display = "inline-block";
      });
      
      // Allow user to delete books
      deleteBtn.addEventListener("click", function() {
        let bookIndex = books.indexOf(book);
        books.splice(bookIndex, 1);
        row.remove();
      });

      // Saves current input when in edit mode
      saveBtn.addEventListener("click", function() {
        let currentTitle = book.title;
        let currentAuthor = book.author;
        
        // Get the updated data from the input fields in the row
        let updatedTitle = row.querySelector("#title-input").value;
        let updatedAuthor = row.querySelector("#author-input").value;
        let updatedPublicationDate = row.querySelector("#publication-date-input").value;
        let updatedRating = row.querySelector("#rating-input").value;
        
        // Update the object for the corresponding book
        let bookIndex = books.findIndex(book => book.title === currentTitle && book.author === currentAuthor);
        books[bookIndex].title = updatedTitle;
        books[bookIndex].author = updatedAuthor;
        books[bookIndex].publicationDate = updatedPublicationDate;
        books[bookIndex].rating = updatedRating;
        
        // Update the display
        row.innerHTML = `<td id="title-cell">${updatedTitle}</td> <td id="author-cell">${updatedAuthor}</td> <td id="publication-date-cell">${updatedPublicationDate}</td> <td id="rating-cell">${updatedRating}</td> <td id="actions-cell"> <button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button> </td>`;
      
        
        // Switch the display of the buttons back
        editBtn.style.display = "inline-block";
        deleteBtn.style.display = "inline-block";
        saveBtn.style.display = "none";
        cancelBtn.style.display = "none";
        });


        cancelBtn.addEventListener("click", function() {
          let currentTitle = book.title;
          let currentAuthor = book.author;
          let currentPubDate = book.publicationDate;
          let currentRating = book.rating;

          let bookIndex = books.findIndex(book => book.title === currentTitle && book.author === currentAuthor);
          books[bookIndex].title = currentTitle;
          books[bookIndex].author = currentAuthor;
          books[bookIndex].publicationDate = currentPubDate;
          books[bookIndex].rating = currentRating;

          // Update the display
          row.innerHTML = `<td id="title-cell">${currentTitle}</td> <td id="author-cell">${currentAuthor}</td> <td id="publication-date-cell">${currentPubDate}</td> <td id="rating-cell">${currentRating}</td> <td id="actions-cell"> <button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button> </td>`;
          
          // Reset the display of the buttons
          editBtn.style.display = "inline-block";
          deleteBtn.style.display = "inline-block";
          saveBtn.style.display = "none";
          cancelBtn.style.display = "none";
        });

      // Append the buttons to each row
      let actionsCell = document.createElement("td");
      actionsCell.appendChild(editBtn);
      actionsCell.appendChild(deleteBtn);
      actionsCell.appendChild(saveBtn);
      actionsCell.appendChild(cancelBtn);
      row.appendChild(actionsCell);


      // Add the row to the table body
      bookList.appendChild(row);
    }
  }

  // Form submit event listener
  document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form data
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let publicationDate = document.querySelector("#publicationDate").value;
    let rating = document.querySelector("#rating").value;

    // Create a new Book object
    let book = new Book(title, author, publicationDate, rating);

    // Add the book to the books array
    books.push(book);

    // Clear the form
    document.querySelector("form").reset();

    // Render the books
    renderBooks();
  });