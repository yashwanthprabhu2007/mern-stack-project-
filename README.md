# Airbnb Clone | Full-Stack Web Application

A full-stack accommodation listing web application inspired by Booking.com and Airbnb. Users can explore properties, create listings, search by country, view property locations on an interactive map, and share reviews.

## Live Demo

**Live Website:** https://booking-com-gd56.onrender.com/

**GitHub Repository:** https://github.com/yashwanthprabhu2007/mern-stack-project-

## Features

- **Explore Listings:** Browse available properties.
- **User Authentication:** Register, log in, and log out securely.
- **Create Listings:** Add new properties with descriptions, prices, locations, and images.
- **Manage Listings:** Edit and delete your own listings.
- **Search by Country:** Find properties using country-based search.
- **Interactive Maps:** View property locations using Mapbox GL JS.
- **Reviews and Ratings:** Share feedback about properties.
- **Image Uploads:** Upload and manage property images using Cloudinary.
- **Flash Messages:** Display success and error notifications.
- **Responsive UI:** Navigate the application on different screen sizes.
- **Cloud Deployment:** Deploy the application using Render.

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Server and routing |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB object modeling |
| EJS | Dynamic server-side rendering |
| ejs-mate | EJS layouts and reusable templates |
| Passport.js | User authentication |
| Express Session | Session management |
| connect-mongo | MongoDB session storage |
| Cloudinary | Image storage and management |
| Mapbox GL JS | Interactive maps |
| Bootstrap | Responsive styling |
| Render | Application deployment |
| Git and GitHub | Version control |

## Project Structure

```text
mern-stack-project-/
├── controllers/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── views/
│   ├── layouts/
│   ├── listing/
│   ├── users/
│   └── err.ejs
├── public/
│   ├── css/
│   ├── js/
│   └── assets/
├── utils/
├── app.js
├── middleware.js
├── schema.js
├── package.json
├── package-lock.json
└── README.md
```

*The structure above represents the main application components. Your actual repository may contain additional files or directories.*

## Getting Started

### Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/)
- npm
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account
- A [Cloudinary](https://cloudinary.com/) account
- A [Mapbox](https://www.mapbox.com/) access token

### 1. Clone the Repository

```bash
git clone https://github.com/yashwanthprabhu2007/mern-stack-project-.git
cd mern-stack-project-
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add your credentials:

```env
MONGODB_URI=your_mongodb_connection_string

SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

MAP_KEY=your_mapbox_public_access_token
```

Replace the placeholder values with your actual credentials.

**Security:** Never commit your `.env` file or expose database passwords and API secrets in your source code.

Add the following to `.gitignore`:

```gitignore
.env
node_modules/
```

### 4. Start the Application

```bash
node app.js
```

For automatic server restarts during development, use:

```bash
npx nodemon app.js
```

Open your browser and visit:

http://localhost:3000

## How It Works

1. Users visit the homepage and explore available properties.
2. They can search for properties by country.
3. Registered users can create property listings.
4. Property information and images are stored using MongoDB and Cloudinary.
5. Mapbox displays the geographical location of a listing.
6. Users can submit reviews and ratings.
7. Authentication and session management protect restricted operations.

## Deployment

The application is deployed on Render and uses MongoDB Atlas for cloud database storage.

To deploy your own instance:

1. Push your project to GitHub.
2. Create a new Web Service on Render.
3. Connect your GitHub repository.
4. Set the build command to `npm install`.
5. Set the start command to `node app.js`.
6. Configure all required environment variables in Render.
7. Deploy and test the live application.

Ensure the application listens on `process.env.PORT || 3000` and that your MongoDB Atlas network access settings permit the deployed service to connect.

## Security Considerations

- Store sensitive credentials in environment variables.
- Hash passwords using Passport Local Mongoose.
- Protect listing modification and deletion routes with authentication and ownership checks.
- Validate user input on the server.
- Restrict API tokens and rotate any credentials that have been exposed.

## Learning Outcomes

This project demonstrates practical experience with:

- Building server-side web applications using Node.js and Express.
- Designing MongoDB schemas and relationships using Mongoose.
- Implementing authentication and session-based authorization.
- Developing dynamic pages with EJS templates.
- Integrating third-party services for maps and image uploads.
- Implementing CRUD operations and search functionality.
- Deploying a web application to a cloud platform.

## Future Improvements

- Add advanced filters for price, property type, and amenities.
- Integrate a booking calendar and reservation management.
- Add payment gateway integration.
- Improve map-based property discovery.
- Add pagination and sorting.
- Enhance automated testing and application security.

## Author

**Yashwanth Prabhu R**

GitHub: [@yashwanthprabhu2007](https://github.com/yashwanthprabhu2007)

## License

This project is intended for learning and portfolio development. Add a `LICENSE` file if you wish to distribute it under a specific open-source license.
