import { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia, Button, Chip, Avatar, Snackbar, Alert } from '@mui/material';
import api from '../config/api';
import { cardStyles } from '../styles/cardStyles';
import BookingModal from '../components/BookingModal';

const Guidance = () => {
  const [topics, setTopics] = useState([]);
  const [users, setUsers] = useState({});
  const [error, setError] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingStatus, setBookingStatus] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topicsResponse, usersResponse] = await Promise.all([
          api.get('/api/guidance'),
          api.get('/api/users')
        ]);
        
        setTopics(topicsResponse.data);
        const usersMap = {};
        usersResponse.data.forEach(user => {
          usersMap[user.id] = user;
        });
        setUsers(usersMap);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load guidance topics. Please try again later.');
      }
    };

    fetchData();
  }, []);

  const handleBookSession = (topic) => {
    setSelectedTopic(topic);
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = async (bookingData) => {
    try {
      await api.post('/api/bookings', bookingData);
      setIsBookingModalOpen(false);
      setBookingStatus({
        open: true,
        message: 'Session booked successfully! Check your email for confirmation.',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error booking session:', error);
      setBookingStatus({
        open: true,
        message: 'Failed to book session. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setBookingStatus({ ...bookingStatus, open: false });
  };

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Box textAlign="center" mb={6}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 'bold',
          }}
        >
          Career Guidance
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="textSecondary" 
          paragraph
          sx={{
            fontSize: { xs: '1rem', sm: '1.25rem' },
            maxWidth: '800px',
            mx: 'auto',
          }}
        >
          Book a session with our experienced alumni for personalized career guidance
        </Typography>
      </Box>

      <Box sx={cardStyles.gridContainer}>
        {topics.map((topic) => (
          <Box sx={cardStyles.gridItem} key={topic.id}>
            <Card sx={{ ...cardStyles.card, ...cardStyles.guidanceCard }}>
              <CardMedia
                component="img"
                image={topic.image}
                alt={topic.title}
                sx={cardStyles.guidanceCardMedia}
              />
              <CardContent sx={cardStyles.cardContent}>
                <Typography sx={cardStyles.cardTitle}>
                  {topic.title}
                </Typography>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar 
                    src={users[topic.mentor]?.avatar}
                    sx={cardStyles.avatar}
                  >
                    {users[topic.mentor]?.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1">
                      {users[topic.mentor]?.name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {users[topic.mentor]?.position} at {users[topic.mentor]?.company}
                    </Typography>
                  </Box>
                </Box>
                <Typography sx={cardStyles.cardDescription}>
                  {topic.description}
                </Typography>
                <Box sx={cardStyles.chipContainer}>
                  <Typography variant="subtitle2" gutterBottom>
                    Available on:
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {topic.availability.map((day, index) => (
                      <Chip
                        key={index}
                        label={day}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
                <Box sx={cardStyles.cardActions}>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Duration: {topic.duration}
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                    onClick={() => handleBookSession(topic)}
                  >
                    Book Session
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {selectedTopic && (
        <BookingModal
          open={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          topic={selectedTopic}
          mentor={users[selectedTopic.mentor]}
          onSubmit={handleBookingSubmit}
        />
      )}

      <Snackbar
        open={bookingStatus.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={bookingStatus.severity}
          sx={{ width: '100%' }}
        >
          {bookingStatus.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Guidance; 