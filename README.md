# Alumni Connect Portal

A modern web application that bridges the gap between students and alumni, facilitating career growth and networking opportunities.

## Features

### 1. Job Opportunities
- Browse job postings from alumni
- Detailed job descriptions with company information
- Easy application process with resume upload
- Track application status
- Filter jobs by type, location, and company

### 2. Career Guidance
- Book one-on-one sessions with experienced alumni
- Multiple communication options (video/audio/in-person)
- Flexible scheduling system
- Session duration and availability tracking
- Personalized mentorship opportunities

### 3. Success Stories
- Read inspiring alumni success stories
- Career transition experiences
- Industry insights and advice
- Professional journey highlights
- Networking opportunities

### 4. Modern UI/UX
- Responsive design for all devices
- Consistent card layouts
- Clean and intuitive interface
- Smooth animations and transitions
- Professional styling

## Tech Stack

### Frontend
- React.js
- Material-UI (MUI)
- React Router
- Axios for API calls
- date-fns for date handling

### Backend
- Node.js
- Express.js
- Mock data for development
- RESTful API architecture

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)
- Git

### Installation

1. Install frontend dependencies
```bash
cd client
npm install
```

2. Install backend dependencies
```bash
cd ../server
npm install
```

### Running the Application

1. Start the backend server
```bash
cd server
npm run dev
```
The server will start on http://localhost:5001

2. Start the frontend application (in a new terminal)
```bash
cd client
npm run dev
```
The application will open in your browser at http://localhost:5173

## API Endpoints

### Jobs
- GET `/api/jobs` - Get all job listings
- GET `/api/jobs/:id` - Get specific job details

### Applications
- POST `/api/applications` - Submit a job application
- GET `/api/applications/job/:jobId` - Get applications for a job
- PATCH `/api/applications/:id` - Update application status
- POST `/api/applications/:id/withdraw` - Withdraw application

### Guidance
- GET `/api/guidance` - Get all guidance topics
- POST `/api/bookings` - Book a guidance session
- GET `/api/bookings/student/:studentId` - Get student's bookings
- GET `/api/bookings/mentor/:mentorId` - Get mentor's bookings

### Stories
- GET `/api/stories` - Get all success stories
- GET `/api/stories/:id` - Get specific story details

## Project Structure

```
alumni-connect-portal/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── styles/       # Shared styles
│   │   ├── config/       # Configuration files
│   │   └── App.jsx       # Main application component
│   └── package.json
│
└── server/                # Backend Node.js application
    ├── routes/           # API route handlers
    ├── data/            # Mock data files
    ├── index.js         # Server entry point
    └── package.json
```

## Key Features Implementation

### Job Application System
- Complete application form with validation
- Resume upload (supports PDF, DOC, DOCX)
- Application status tracking
- Success/error notifications
- File size validation (5MB limit)

### Booking System
- Session scheduling with date/time picker
- Communication preference selection
- Mentor availability check
- Booking confirmation
- Email notifications (mock)

### Responsive Design
- Mobile-first approach
- Consistent spacing and typography
- Proper image handling
- Flexible grid system
- Smooth transitions

## Development Notes

### Frontend
- Uses Material-UI v5 components
- Implements proper form validation
- Handles file uploads efficiently
- Manages application state effectively
- Provides clear user feedback

### Backend
- RESTful API design
- Mock data for development
- Proper error handling
- Status codes adherence
- Clean route organization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Material-UI for the component library
- Lorem Picsum for placeholder images
- All contributors who have helped shape this project 