# Book Library Node & Express JS Application

## Overview

This application is a simple book library management system built using Node.js and Express.js. It provides CRUD (Create, Read, Update, Delete) operations for managing a list of books. Users can add new books, view details of existing books, update their statuses, and delete them. Additionally, books can be filtered by their read/unread status.

## Features

- **Add Book**: Create new book entries.
- **View Books**: List all books with details.
- **Filter Books**: Filter books by read/unread status.
- **Update Book Status**: Mark books as read or unread.
- **Delete Book**: Remove books from the library.
- **View Book Details**: Detailed view of a specific book.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **Bootstrap**: CSS framework for styling.
- **HTML/CSS**: For the frontend layout and design.
- **JavaScript**: For frontend interactions.

## File Structure

- `server.js`: Main server file with Express setup and API routes.
- `books.json`: Data file to store book information.
- `public/index.html`: Main HTML file for the frontend.
- `public/styles/style.css`: Custom styles for the frontend.
- `public/main.js`: JavaScript for handling frontend interactions.
- `public/view/details.html`: HTML file for viewing detailed information about a specific book.
- `public/view/details.js`: JavaScript file for handling the book details page.
- `public/assets`: Folder for storing images/favicons.
- `package.json`: Node.js package configuration file.

## Prerequisites

- Node.js and npm installed on your machine.

## Installation

1. **Clone the Repository**
    - git clone <repository-url>
    - cd book-library

2.	**Install Dependencies**
    - npm install

## Running the Application

1. **Start the Server**
    - npm start

2.	**Open the Application**
    - Open your browser and navigate to http://localhost:3000 to access the Book Library application.

## Usage

1. **Add a New Book**
   - Click the “Add Book” button.
   - Fill out the form with book details and submit.

2. **View Books**
   - All books are displayed on the main page.

3. **Filter Books**
   - Use the dropdown menu to filter books by their status (Read/Unread).

4. **Update Book Status**
   - Click the “Mark Read” or “Mark Unread” button next to a book to update its status.

5. **Delete a Book**
   - Click the “Delete” button to remove a book from the library.

6. **View Book Details**
   - Click on a book title or navigate to `details.html?id=<bookId>` to view detailed information about a specific book.

## API Endpoints

- `GET /api/books` - Retrieve all books.
- `POST /api/books` - Add a new book.
- `GET /api/books/:id` - Get details of a specific book by ID.
- `PUT /api/books/:id` - Update the status of a book by ID.
- `DELETE /api/books/:id` - Delete a book by ID.
- `GET /api/books/filter/:status` - Filter books by status.

## HTML Pages

- **`index.html`**: The main page displaying the list of books, filter options, and a form for adding new books.
- **`details.html`**: A page to view detailed information about a specific book. It is accessible via the URL `details.html?id=<bookId>`.

## JavaScript Files

- **`main.js`**: Handles the frontend interactions on the main page, including opening the modal for adding a book and updating the book list.
- **`details.js`**: Manages the book details page, including fetching book details from the server, updating the book status, deleting a book and navigating back to the library page.

## Error Handling

- **No Book ID Found**: Alerts the user if no book ID is provided in the URL.
- **Error Fetching Book Details**: Alerts the user if there is an issue retrieving book details.
- **Error Updating Book Status**: Alerts the user if there is an issue updating the book status.
- **Error Deleting Book**: Alerts the user if there is an issue deleting the book.

## Contact

For any inquiries, please contact [yatin.agrawal@nagarro.com].
