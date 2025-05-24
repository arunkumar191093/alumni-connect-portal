import { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia, Chip, Button } from '@mui/material';
import api from '../config/api';
import { cardStyles } from '../styles/cardStyles';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsResponse, usersResponse] = await Promise.all([
          api.get('/api/jobs'),
          api.get('/api/users')
        ]);
        setJobs(jobsResponse.data);
        const usersMap = {};
        usersResponse.data.forEach(user => {
          usersMap[user.id] = user;
        });
        setUsers(usersMap);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load jobs. Please try again later.');
      }
    };

    fetchData();
  }, []);

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
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom
        sx={{
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          fontWeight: 'bold',
          mb: 4,
        }}
      >
        Job Opportunities
      </Typography>

      <Box sx={cardStyles.gridContainer}>
        {jobs.map((job) => (
          <Box sx={cardStyles.gridItem} key={job.id}>
            <Card sx={{ ...cardStyles.card, ...cardStyles.jobCard }}>
              <CardMedia
                component="img"
                image={job.image}
                alt={job.title}
                sx={cardStyles.jobCardMedia}
              />
              <CardContent sx={cardStyles.cardContent}>
                <Typography sx={cardStyles.cardTitle}>
                  {job.title}
                </Typography>
                <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="subtitle1" color="textSecondary">
                    {job.company}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary" sx={{ mx: 1 }}>
                    •
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {job.location}
                  </Typography>
                </Box>
                <Chip 
                  label={job.type} 
                  color="primary" 
                  size="small" 
                  sx={{ mb: 2 }} 
                />
                <Typography sx={cardStyles.cardDescription}>
                  {job.description}
                </Typography>
                <Box sx={cardStyles.cardActions}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="caption" color="textSecondary">
                      Posted by: {users[job.postedBy]?.name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {new Date(job.postedDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                  >
                    Apply Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Jobs; 