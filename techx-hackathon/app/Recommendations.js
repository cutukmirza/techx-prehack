import React from 'react';
import { Typography, Grid, Card, CardContent, Box } from '@mui/material';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import { styled } from '@mui/material/styles';


// Styled Card with the same design as Dashboard Home
const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '12px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)', // Soft shadow
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)', // Lift effect on hover
    transform: 'translateY(-5px)',
  },
}));

// Main content area that grows and scrolls if necessary, with increased side margins
const ContentContainer = styled(Box)({
  flex: 1, // This makes the content area take up as much space as possible
  background: 'linear-gradient(180deg, #3399FF, #1A1D2F)', // Blue gradient background
  paddingTop: '70px', // Padding added to ensure content doesn't overlap the header
  paddingBottom: '20px', // Ensure there's padding above the footer
  paddingLeft: '40px', // Increased side margins
  paddingRight: '40px', // Increased side margins
  overflowY: 'auto', // Enable scroll for overflow content
});

function PersonalizedRecommendations() {
  return (
    <ContentContainer>
      <Typography variant="h3" sx={{ color: '#FFFFFF', fontSize: '1.8rem', marginBottom: '20px', marginTop: '20px' }}>
        Personalized Recommendations
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <StyledCard>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <BeenhereIcon sx={{ fontSize: 40, marginRight: '10px', color: '#1e90ff' }} />
              <Box>
                <Typography variant="h6" color="textSecondary" sx={{ fontSize: '1rem' }}>
                  Tailored Recommendations
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Use AI to suggest customized insurance products based on individual client behaviors and preferences.
                </Typography>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </ContentContainer>
  );
}

export default PersonalizedRecommendations;
