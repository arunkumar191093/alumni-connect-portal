import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const ApplicationModal = ({ open, onClose, job, onSubmit }) => {
  const [formData, setFormData] = useState({
    applicantName: '',
    applicantEmail: '',
    applicantPhone: '',
    currentCompany: '',
    experience: '',
    portfolio: '',
    linkedIn: '',
    coverLetter: '',
    resume: null
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resumeName, setResumeName] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Resume file size should not exceed 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          resume: event.target.result
        }));
        setResumeName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveResume = () => {
    setFormData(prev => ({
      ...prev,
      resume: null
    }));
    setResumeName('');
  };

  const validateForm = () => {
    if (!formData.applicantName) return 'Name is required';
    if (!formData.applicantEmail) return 'Email is required';
    if (!formData.resume) return 'Resume is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.applicantEmail)) return 'Invalid email format';
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await onSubmit({
        jobId: job.id,
        ...formData
      });
      handleClose();
    } catch (err) {
      setError(err.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      applicantName: '',
      applicantEmail: '',
      applicantPhone: '',
      currentCompany: '',
      experience: '',
      portfolio: '',
      linkedIn: '',
      coverLetter: '',
      resume: null
    });
    setError(null);
    setResumeName('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Apply for {job?.title}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Company:</strong> {job?.company}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Location:</strong> {job?.location}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Type:</strong> {job?.type}
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Full Name"
            name="applicantName"
            value={formData.applicantName}
            onChange={handleInputChange}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Email"
            name="applicantEmail"
            type="email"
            value={formData.applicantEmail}
            onChange={handleInputChange}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Phone"
            name="applicantPhone"
            value={formData.applicantPhone}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Current Company"
            name="currentCompany"
            value={formData.currentCompany}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Years of Experience"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Portfolio URL"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="LinkedIn Profile"
            name="linkedIn"
            value={formData.linkedIn}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Cover Letter"
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          <Box sx={{ mb: 2 }}>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="resume-upload"
            />
            <label htmlFor="resume-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<CloudUploadIcon />}
              >
                Upload Resume
              </Button>
            </label>
            {resumeName && (
              <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2">{resumeName}</Typography>
                <IconButton size="small" onClick={handleRemoveResume}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </Box>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplicationModal; 