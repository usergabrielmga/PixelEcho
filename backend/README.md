# Gallery Photos App

This project is a simple gallery photos application built using Node.js and Express. It allows users to perform CRUD operations on photos stored in a MongoDB database.

## Features

- Upload and store photos with titles and descriptions.
- Retrieve a list of all photos.
- View details of a specific photo.
- Update photo information.
- Delete photos from the gallery.

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- MongoDB database (either locally or using a cloud service like MongoDB Atlas).

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/gallery-photos-app.git
   ```

2. Navigate to the project directory:

   ```
   cd gallery-photos-app
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your MongoDB connection string:

   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

### Running the Application

To start the application, run the following command:

```
npm start
```

The application will be running on `http://localhost:3000`.

### API Endpoints

- `GET /photos` - Retrieve all photos
- `GET /photos/:id` - Retrieve a specific photo by ID
- `POST /photos` - Create a new photo
- `PUT /photos/:id` - Update an existing photo
- `DELETE /photos/:id` - Delete a photo

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements.

## License

This project is licensed under the MIT License.