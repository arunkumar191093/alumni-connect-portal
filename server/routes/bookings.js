import express from 'express';
const router = express.Router();

// In-memory bookings array
const bookings = [];

// Get all bookings
router.get('/', (req, res) => {
  res.json(bookings);
});

// Create a new booking
router.post('/', (req, res) => {
  try {
    const {
      topicId,
      mentorId,
      sessionDateTime,
      communicationPreference,
      notes
    } = req.body;

    // Validate required fields
    if (!topicId || !mentorId || !sessionDateTime || !communicationPreference) {
      return res.status(400).json({ 
        error: 'Missing required fields' 
      });
    }

    // Create new booking
    const newBooking = {
      id: bookings.length + 1,
      topicId,
      mentorId,
      studentId: 'student123', // Hardcoded for mock data
      sessionDateTime: new Date(sessionDateTime),
      communicationPreference,
      notes: notes || '',
      status: 'pending',
      meetingLink: communicationPreference === 'inPerson' ? null : 'https://meet.google.com/mock-meeting-link',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Add to mock database
    bookings.push(newBooking);

    // Send success response with booking confirmation
    res.status(201).json({
      message: 'Booking created successfully',
      booking: newBooking,
      confirmationDetails: {
        meetingLink: newBooking.meetingLink,
        mentor: {
          name: 'John Doe', // Hardcoded for mock data
          email: 'john.doe@example.com'
        },
        sessionDateTime: newBooking.sessionDateTime,
        communicationPreference: newBooking.communicationPreference
      }
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ 
      error: 'Failed to create booking' 
    });
  }
});

// Get bookings by student ID
router.get('/student/:studentId', (req, res) => {
  const studentBookings = bookings.filter(
    booking => booking.studentId === req.params.studentId
  );
  res.json(studentBookings);
});

// Get bookings by mentor ID
router.get('/mentor/:mentorId', (req, res) => {
  const mentorBookings = bookings.filter(
    booking => booking.mentorId === req.params.mentorId
  );
  res.json(mentorBookings);
});

// Update booking status
router.patch('/:id', (req, res) => {
  const { status } = req.body;
  const booking = bookings.find(b => b.id === parseInt(req.params.id));

  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  booking.status = status;
  booking.updatedAt = new Date();

  res.json(booking);
});

export default router; 