import { Container, Typography, Card, CardContent, CardMedia, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { cardStyles } from '../styles/cardStyles';

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Box textAlign="center" mb={6}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 'bold',
          }}
        >
          Welcome to Alumni Connect
        </Typography>
        <Typography 
          variant="h5" 
          color="textSecondary" 
          paragraph
          sx={{
            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
            maxWidth: '800px',
            mx: 'auto',
          }}
        >
          Bridging the gap between students and alumni for better career opportunities
        </Typography>
      </Box>

      <Box sx={cardStyles.gridContainer}>
        <Box sx={cardStyles.gridItem}>
          <Card sx={{ ...cardStyles.card, ...cardStyles.homeCard }}>
            <CardMedia
              component="img"
              image="https://picsum.photos/800/400?random=12"
              alt="Career Guidance"
              sx={cardStyles.homeCardMedia}
            />
            <CardContent sx={cardStyles.cardContent}>
              <Typography sx={cardStyles.cardTitle}>
                Career Guidance
              </Typography>
              <Typography sx={cardStyles.cardDescription}>
                Get personalized career advice from experienced alumni in your field of interest.
              </Typography>
              <Box sx={cardStyles.cardActions}>
                <Button
                  component={RouterLink}
                  to="/guidance"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Explore Guidance
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={cardStyles.gridItem}>
          <Card sx={{ ...cardStyles.card, ...cardStyles.homeCard }}>
            <CardMedia
              component="img"
              image="https://picsum.photos/800/400?random=13"
              alt="Job Opportunities"
              sx={cardStyles.homeCardMedia}
            />
            <CardContent sx={cardStyles.cardContent}>
              <Typography sx={cardStyles.cardTitle}>
                Job Opportunities
              </Typography>
              <Typography sx={cardStyles.cardDescription}>
                Discover job openings and internships posted by our alumni network.
              </Typography>
              <Box sx={cardStyles.cardActions}>
                <Button
                  component={RouterLink}
                  to="/jobs"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  View Jobs
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={cardStyles.gridItem}>
          <Card sx={{ ...cardStyles.card, ...cardStyles.homeCard }}>
            <CardMedia
              component="img"
              image="https://picsum.photos/800/400?random=14"
              alt="Success Stories"
              sx={cardStyles.homeCardMedia}
            />
            <CardContent sx={cardStyles.cardContent}>
              <Typography sx={cardStyles.cardTitle}>
                Success Stories
              </Typography>
              <Typography sx={cardStyles.cardDescription}>
                Read inspiring success stories from our alumni community.
              </Typography>
              <Box sx={cardStyles.cardActions}>
                <Button
                  component={RouterLink}
                  to="/stories"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Read Stories
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default Home; 