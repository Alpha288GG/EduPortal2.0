# Academic Portal

A full-stack academic portal with authentication and role-based access control, enabling teachers to upload study materials and students to access them based on their academic year, semester, and subjects.

## Features

- **Authentication System**: Login and registration for teachers and students
- **Role-Based Access Control**: Different features for teachers and students
- **Teacher Dashboard**: Upload study materials for specific academic years, semesters, and subjects
- **Student Dashboard**: Access study materials based on academic year, semester, and subject
- **Material Management**: Browse, search, and filter study materials
- **Responsive Design**: Works on desktop and mobile devices

## Demo Credentials

- **Teacher Account**:
  - Email: teacher@example.com
  - Password: teacher123

- **Student Account**:
  - Email: student@example.com
  - Password: student123

## Tech Stack

- HTML5
- CSS3 (with custom styling)
- JavaScript (Vanilla JS)
- Node.js (for local development server)

## Project Structure

```
academic-portal/
├── css/
│   └── styles.css
├── js/
│   ├── dashboard.js
│   ├── login.js
│   ├── materials.js
│   ├── register.js
│   ├── script.js
│   └── upload.js
├── images/
├── index.html
├── login.html
├── register.html
├── dashboard.html
├── materials.html
├── upload.html
├── server.js
└── README.md
```

## How to Run

1. Make sure you have [Node.js](https://nodejs.org/) installed
2. Clone this repository
3. Navigate to the project directory
4. Run the server:
   ```
   node server.js
   ```
5. Open your browser and go to `http://localhost:3000`

## Workflow

1. **Login/Register**: Users can create an account or log in with existing credentials
2. **Dashboard**: After authentication, users are directed to their role-specific dashboard
3. **For Teachers**:
   - Select academic year, semester, and subject
   - Upload study materials with appropriate categorization
4. **For Students**:
   - Browse materials by academic year, semester, and subject
   - Download study materials for offline use

## Future Enhancements

- Real backend integration with database storage
- User profile management
- Material rating and commenting system
- Notification system for new uploads
- Advanced search functionality
- Admin panel for user and content management

## License

This project is for educational purposes only. 