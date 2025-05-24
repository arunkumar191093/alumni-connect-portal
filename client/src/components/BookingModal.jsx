import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Alert,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const BookingModal = ({ open, onClose, topic, mentor, onSubmit }) => {
  const [bookingData, setBookingData] = useState({
    date: null,
    time: null,
    notes: '',
    communicationPreference: 'video',
  });
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    if (!bookingData.date || !bookingData.time) {
      setError('Please select both date and time for the session');
      return;
    }

    // Combine date and time
    const sessionDateTime = new Date(bookingData.date);
    sessionDateTime.setHours(bookingData.time.getHours());
    sessionDateTime.setMinutes(bookingData.time.getMinutes());

    onSubmit({
      ...bookingData,
      sessionDateTime,
      topicId: topic.id,
      mentorId: mentor.id,
    });
  };

  const handleClose = () => {
    setBookingData({
      date: null,
      time: null,
      notes: '',
      communicationPreference: 'video',
    });
    setError(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Book Guidance Session
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Topic:</strong> {topic?.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Mentor:</strong> {mentor?.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Duration:</strong> {topic?.duration}
          </Typography>
        </Box>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <DatePicker
              label="Session Date"
              value={bookingData.date}
              onChange={(newDate) => setBookingData({ ...bookingData, date: newDate })}
              disablePast
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
            <TimePicker
              label="Session Time"
              value={bookingData.time}
              onChange={(newTime) => setBookingData({ ...bookingData, time: newTime })}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Box>
        </LocalizationProvider>

        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel>Communication Preference</InputLabel>
          <Select
            value={bookingData.communicationPreference}
            onChange={(e) => setBookingData({ ...bookingData, communicationPreference: e.target.value })}
            label="Communication Preference"
          >
            <MenuItem value="video">Video Call</MenuItem>
            <MenuItem value="audio">Audio Call</MenuItem>
            <MenuItem value="inPerson">In Person</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Additional Notes"
          value={bookingData.notes}
          onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
          sx={{ mt: 3 }}
        />

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} color="primary">
          Confirm Booking
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingModal; 