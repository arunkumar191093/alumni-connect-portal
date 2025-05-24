import { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia, Chip, Button, Snackbar, Alert } from '@mui/material';
import api from '../config/api';
import { cardStyles } from '../styles/cardStyles';
import ApplicationModal from '../components/ApplicationModal';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState({});
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState({ open: false, message: '', severity: 'success' });

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

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsApplicationModalOpen(true);
  };

  const handleApplicationSubmit = async (applicationData) => {
    try {
      const response = await api.post('/api/applications', applicationData);
      setApplicationStatus({
        open: true,
        message: response.data.message,
        severity: 'success'
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting application:', error);
      throw new Error(error.response?.data?.error || 'Failed to submit application');
    }
  };

  const handleCloseSnackbar = () => {
    setApplicationStatus({ ...applicationStatus, open: false });
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
                    onClick={() => handleApplyClick(job)}
                  >
                    Apply Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {selectedJob && (
        <ApplicationModal
          open={isApplicationModalOpen}
          onClose={() => setIsApplicationModalOpen(false)}
          job={selectedJob}
          onSubmit={handleApplicationSubmit}
        />
      )}

      <Snackbar
        open={applicationStatus.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={applicationStatus.severity}
          sx={{ width: '100%' }}
        >
          {applicationStatus.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Jobs; 