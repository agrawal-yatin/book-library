// Event listener for when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", async () => {
  // API URL for books
  const apiUrl = "http://localhost:3000/api/books";
  // Get the book ID from the URL parameters
  const bookId = new URLSearchParams(window.location.search).get("id");
  if (!bookId) {
    alert("No book ID found.");
    return;
  }

  // Select DOM elements
  const bookDetails = document.getElementById("bookDetails");
  const markStatusBtn = document.getElementById("markStatus");
  const deleteBookBtn = document.getElementById("deleteBook");

  try {
    // Fetch the book details from the server
    const response = await fetch(`${apiUrl}/${bookId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const book = await response.json();

    // Display the book details
    bookDetails.innerHTML = `
      <h5 class="card-title">${book.title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
      <p class="card-text"><strong>Status:</strong> ${book.status}</p>
      <p class="card-text"><strong>Description:</strong> ${book.description}</p>
      <p class="card-text"><strong>Date Added:</strong> ${new Date(
        book.date
      ).toLocaleDateString()}</p>
    `;

    // Update button text based on current status
    markStatusBtn.textContent =
      book.status === "Read" ? "Mark Unread" : "Mark Read";

    // Mark status button click handler
    markStatusBtn.addEventListener("click", async () => {
      const newStatus = book.status === "Read" ? "Unread" : "Read";
      try {
        // Update the book status on the server
        const response = await fetch(`${apiUrl}/${bookId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });

        if (response.ok) {
          // Reload the page to reflect the updated status
          window.location.reload();
        } else {
          alert("Error updating book status");
        }
      } catch (error) {
        console.error("Error updating book status:", error);
        alert("Error updating book status");
      }
    });

    // Delete book button click handler
    deleteBookBtn.addEventListener("click", async () => {
      if (confirm("Are you sure you want to delete this book?")) {
        try {
          // Delete the book from the server
          const response = await fetch(`${apiUrl}/${bookId}`, {
            method: "DELETE",
          });

          if (response.ok) {
            // Redirect to the main page after deletion
            window.location.href = "index.html";
          } else {
            alert("Error deleting book");
          }
        } catch (error) {
          console.error("Error deleting book:", error);
          alert("Error deleting book");
        }
      }
    });
  } catch (error) {
    console.error("Error fetching book details:", error);
    alert("Error fetching book details");
  }
});