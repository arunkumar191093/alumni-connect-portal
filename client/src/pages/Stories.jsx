import { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia, Avatar } from '@mui/material';
import api from '../config/api';
import { cardStyles } from '../styles/cardStyles';

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [users, setUsers] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storiesResponse, usersResponse] = await Promise.all([
          api.get('/api/stories'),
          api.get('/api/users')
        ]);
        
        setStories(storiesResponse.data);
        const usersMap = {};
        usersResponse.data.forEach(user => {
          usersMap[user.id] = user;
        });
        setUsers(usersMap);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load success stories. Please try again later.');
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
        Success Stories
      </Typography>

      <Box sx={cardStyles.gridContainer}>
        {stories.map((story) => (
          <Box sx={cardStyles.gridItem} key={story.id}>
            <Card sx={{ ...cardStyles.card, ...cardStyles.storyCard }}>
              <CardMedia
                component="img"
                image={story.image}
                alt={story.title}
                sx={cardStyles.storyCardMedia}
              />
              <CardContent sx={cardStyles.cardContent}>
                <Box display="flex" alignItems="center" mb={3}>
                  <Avatar 
                    src={users[story.author]?.avatar}
                    sx={cardStyles.avatar}
                  >
                    {users[story.author]?.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">
                      {users[story.author]?.name}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      {users[story.author]?.position} at {users[story.author]?.company}
                    </Typography>
                  </Box>
                </Box>
                <Typography sx={cardStyles.cardTitle}>
                  {story.title}
                </Typography>
                <Typography 
                  sx={{
                    ...cardStyles.cardDescription,
                    WebkitLineClamp: 6,
                  }}
                >
                  {story.content}
                </Typography>
                <Box sx={cardStyles.cardActions}>
                  <Typography variant="caption" color="textSecondary">
                    Posted on: {new Date(story.date).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Stories; 