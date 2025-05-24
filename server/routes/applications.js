import express from 'express';
const router = express.Router();

// In-memory applications array
const applications = [];

// Get all applications
router.get('/', (req, res) => {
  res.json(applications);
});

// Create a new application
router.post('/', (req, res) => {
  try {
    const {
      jobId,
      resume,
      coverLetter,
      applicantName,
      applicantEmail,
      applicantPhone,
      currentCompany,
      experience,
      portfolio,
      linkedIn
    } = req.body;

    // Validate required fields
    if (!jobId || !applicantName || !applicantEmail || !resume) {
      return res.status(400).json({
        error: 'Missing required fields'
      });
    }

    // Create new application
    const newApplication = {
      id: applications.length + 1,
      jobId,
      applicantId: 'student123', // Hardcoded for mock data
      status: 'pending',
      applicationDate: new Date(),
      resume,
      coverLetter: coverLetter || '',
      applicantDetails: {
        name: applicantName,
        email: applicantEmail,
        phone: applicantPhone || '',
        currentCompany: currentCompany || '',
        experience: experience || '',
        portfolio: portfolio || '',
        linkedIn: linkedIn || ''
      },
      timeline: [
        {
          status: 'applied',
          date: new Date(),
          note: 'Application submitted'
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Add to mock database
    applications.push(newApplication);

    // Send success response
    res.status(201).json({
      message: 'Application submitted successfully',
      application: newApplication,
      nextSteps: {
        message: 'Your application has been received. Here\'s what happens next:',
        steps: [
          'Our team will review your application within 3-5 business days',
          'You will receive an email notification about the status of your application',
          'If selected, we will schedule an initial screening call'
        ]
      }
    });

  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({
      error: 'Failed to submit application'
    });
  }
});

// Get applications by job ID
router.get('/job/:jobId', (req, res) => {
  const jobApplications = applications.filter(
    app => app.jobId === req.params.jobId
  );
  res.json(jobApplications);
});

// Get applications by applicant ID
router.get('/applicant/:applicantId', (req, res) => {
  const applicantApplications = applications.filter(
    app => app.applicantId === req.params.applicantId
  );
  res.json(applicantApplications);
});

// Update application status
router.patch('/:id', (req, res) => {
  const { status, note } = req.body;
  const application = applications.find(a => a.id === parseInt(req.params.id));

  if (!application) {
    return res.status(404).json({ error: 'Application not found' });
  }

  if (!['pending', 'reviewing', 'shortlisted', 'interviewed', 'offered', 'rejected', 'withdrawn'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  // Update status
  application.status = status;
  application.updatedAt = new Date();

  // Add to timeline
  application.timeline.push({
    status,
    date: new Date(),
    note: note || `Application marked as ${status}`
  });

  res.json(application);
});

// Withdraw application
router.post('/:id/withdraw', (req, res) => {
  const application = applications.find(a => a.id === parseInt(req.params.id));

  if (!application) {
    return res.status(404).json({ error: 'Application not found' });
  }

  if (application.status === 'withdrawn') {
    return res.status(400).json({ error: 'Application already withdrawn' });
  }

  application.status = 'withdrawn';
  application.updatedAt = new Date();
  application.timeline.push({
    status: 'withdrawn',
    date: new Date(),
    note: 'Application withdrawn by applicant'
  });

  res.json({
    message: 'Application withdrawn successfully',
    application
  });
});

export default router; 