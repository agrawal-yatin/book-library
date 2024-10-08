document.addEventListener("DOMContentLoaded", () => {
  // API URL for books
  const apiUrl = "http://localhost:3000/api/books";

  // Function to create filter URL based on status and author/title
  const filterUrl = (status, authorOrTitle) => {
    let url = `${apiUrl}`;
    const params = [];

    if (status && status !== "all") {
      params.push(`status=${status}`);
    }

    if (authorOrTitle && authorOrTitle.trim()) {
      params.push(`search=${encodeURIComponent(authorOrTitle)}`);
    }

    if (params.length > 0) {
      url += `?${params.join("&")}`;
    }

    return url;
  };

  // Select DOM elements
  const addBookForm = document.getElementById("addBookForm");
  const booksList = document.getElementById("booksList");
  const filterDropdown = document.getElementById("filterStatus");
  const authorOrTitleInput = document.getElementById("authorOrTitleInput");

  const modal = document.getElementById("addBookModal");
  const openModalButton = document.getElementById("openModal");
  const closeModalButton = document.querySelector(".modal .close");
  const noBooksMessage = document.getElementById("noBooksMessage");

  // Function to open the modal
  openModalButton.onclick = () => {
    modal.style.display = "block";
  };

  // Function to close the modal
  closeModalButton.onclick = () => {
    modal.style.display = "none";
  };

  // Click outside of the modal to close it
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  // Function to fetch books from the server
  const fetchBooks = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const books = await response.json();
      booksList.innerHTML = "";

      if (books.length === 0) {
        noBooksMessage.style.display = "flex";
      } else {
        noBooksMessage.style.display = "none";

        // Display each book in the books list
        books.forEach((book) => {
          const bookItem = document.createElement("div");
          bookItem.className = "book-item col-md-4";
          bookItem.innerHTML = `
            <div class="card mb-4 frosted-glass">
            <div class="img-container"><img class="card-img-top" src="assets/book-placeholder.png" alt="Book image">
</div>
              <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
                <p class="card-text"><strong>Status:</strong> ${book.status}</p>
                 <div class="action-buttons">
                  <p class="card-text description-text"><strong>Description:</strong> ${
                    book.description
                  }</p>
                <p class="card-text"><strong>Date Added:</strong> ${new Date(
                  book.date
                ).toLocaleDateString()}</p>
                <a href="view/details.html?id=${
                  book.id
                }" class="btn btn-sm btn-info"><i class="fa fa-book"></i>View Details</a>
                <button onclick="toggleStatus(${
                  book.id
                })" class="btn btn-sm btn-warning"><i class="fa fa-bookmark"></i>${
            book.status === "Read" ? "Mark as Unread" : "Mark as Read"
          }</button>
                <button onclick="deleteBook(${
                  book.id
                })" class="btn btn-sm btn-danger"><i class="fa fa-trash"></i>Delete</button>
                </div>
              </div>
            </div>
          `;
          booksList.appendChild(bookItem);
        });
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      alert("Failed to fetch books. Please try again.");
    }
  };

  // Fetch books initially
  fetchBooks(filterUrl(filterDropdown.value, authorOrTitleInput.value));

  // Event listener for the form submission to add a new book
  addBookForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const status = document.getElementById("status").value;
    const description = document.getElementById("description").value;
    const date = new Date().toISOString().split("T")[0];

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, status, description, date }),
      });

      if (response.ok) {
        fetchBooks(filterUrl(filterDropdown.value, authorOrTitleInput.value));
        modal.style.display = "none";
        addBookForm.reset();
      } else {
        alert("Error adding book");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book. Please try again.");
    }
  });

  // Function to toggle book status between "Read" and "Unread"
  window.toggleStatus = async (id) => {
    try {
      // Fetch current book details to get the current status
      const response = await fetch(`${apiUrl}/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const book = await response.json();

      // Determine new status
      const newStatus = book.status === "Read" ? "Unread" : "Read";

      // Update book status
      const updateResponse = await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (updateResponse.ok) {
        fetchBooks(filterUrl(filterDropdown.value, authorOrTitleInput.value));
      } else {
        alert("Error updating book status");
      }
    } catch (error) {
      console.error("Error updating book status:", error);
      alert("Failed to update book status. Please try again.");
    }
  };

  // Function to delete a book by ID
  window.deleteBook = async (id) => {
    if (confirm("Are you sure you want to delete this book?")) {
      try {
        const response = await fetch(`${apiUrl}/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchBooks(filterUrl(filterDropdown.value, authorOrTitleInput.value));
        } else {
          alert("Error deleting book");
        }
      } catch (error) {
        console.error("Error deleting book:", error);
        alert("Failed to delete book. Please try again.");
      }
    }
  };

  // Event listener for filter button
  document.getElementById("filterByAuthorOrTitle").addEventListener("click", () => {
    fetchBooks(filterUrl(filterDropdown.value, authorOrTitleInput.value));
  });

  // Event listener for filter dropdown change
  filterDropdown.addEventListener("change", () => {
    fetchBooks(filterUrl(filterDropdown.value, authorOrTitleInput.value));
  });
});
