import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const buttonStyle = (path) => ({
    borderBottom: isActive(path) ? '2px solid white' : 'none',
    borderRadius: 0,
    marginX: 1,
    '&:hover': {
      borderBottom: isActive(path) ? '2px solid white' : '2px solid rgba(255, 255, 255, 0.5)',
    },
  });

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/" 
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: 'inherit',
            paddingBottom: 1,
          }}
        >
          Alumni Connect
        </Typography>
        <Box>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/jobs"
            sx={buttonStyle('/jobs')}
          >
            Jobs
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/stories"
            sx={buttonStyle('/stories')}
          >
            Success Stories
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/guidance"
            sx={buttonStyle('/guidance')}
          >
            Guidance
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 