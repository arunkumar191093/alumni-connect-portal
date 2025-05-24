export const cardStyles = {
  card: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    },
  },
  // For home page cards
  homeCard: {
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
  },
  homeCardMedia: {
    height: '200px',
    objectFit: 'cover',
  },
  // For job cards
  jobCard: {
    height: '600px',
    display: 'flex',
    flexDirection: 'column',
  },
  jobCardMedia: {
    height: '250px',
    objectFit: 'cover',
  },
  // For story cards
  storyCard: {
    height: '700px',
    display: 'flex',
    flexDirection: 'column',
  },
  storyCardMedia: {
    height: '300px',
    objectFit: 'cover',
  },
  // For guidance cards
  guidanceCard: {
    height: '600px',
    display: 'flex',
    flexDirection: 'column',
  },
  guidanceCardMedia: {
    height: '250px',
    objectFit: 'cover',
  },
  // Shared styles
  cardContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    overflow: 'hidden',
  },
  cardActions: {
    padding: '16px',
    marginTop: 'auto',
    width: '100%',
  },
  avatar: {
    width: 56,
    height: 56,
    marginRight: 2,
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
    marginBottom: 2,
  },
  // Text styles
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '8px',
    lineHeight: 1.2,
  },
  cardDescription: {
    fontSize: '0.875rem',
    color: 'rgba(0, 0, 0, 0.6)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },
  // Container styles
  gridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
  },
  gridItem: {
    flex: '1 1 calc(50% - 12px)',
    minWidth: 280,
    maxWidth: '100%',
  },
}; 