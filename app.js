// Book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
  
  // User Interface (UI) Constructor
  function UI() {}
  
  UI.prototype.addBookToList = function(book) {
    // Get the node where to insert the book list
    const list = document.getElementById("book-list");
    // Create a row to insert a new book
    const row = document.createElement("tr");
    // Insert columns
    row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td><a href="#" class="delete">X</a></td>
      `;
  
    //console.log(row);
    list.appendChild(row);
  };
  
  UI.prototype.showAlert = function(message, className) {
    // Create DIV ELEMENT
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.innerText = message;
  
    // Get Parent to insert alert node
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
  
    // Delete Alert after 3secs
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  };
  
  // Add delete book
  UI.prototype.deleteBook = function(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  };
  
  // Create Event Listner for submit
  const bookForm = document.getElementById("book-form");
  bookForm.addEventListener("submit", handlerSubmit);
  
  function handlerSubmit(e) {
    // Get values from HTML form
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;
  
    // Instantiate Object Book
    const book = new Book(title, author, isbn);
  
    // Instantiate UI
    const ui = new UI();
  
    // Validate Empty values
    if (title === "" || author === "" || isbn === "") {
      console.log("Error!");
      ui.showAlert("Fields should not be empty", "error");
    } else {
      // Add book to HTML book List
      ui.addBookToList(book);
  
      //clear fields from HTML form
      ui.clearFields();
    }
  
    e.preventDefault();
  }
  
  // Add Clear Field using prototype
  UI.prototype.clearFields = function() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  };
  
  document.getElementById("book-list").addEventListener("click", function(e) {
    console.log("click");
  
    ui = new UI();
  
    ui.deleteBook(e.target);
  
    ui.showAlert("Book Removed", "success");
  
    e.preventDefault();
  });