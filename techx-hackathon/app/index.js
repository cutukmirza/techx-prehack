import React from 'react';
import { Typography, Box, Grid, Card, CardContent, Button } from '@mui/material';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { styled } from '@mui/material/styles';
import { Link } from 'expo-router';

// Gradient button with only blue gradient
const StyledButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, #1e90ff 90%)`, // Blue gradient
  borderRadius: '20px',
  padding: '10px 20px',
  color: '#FFFFFF',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: `linear-gradient(45deg, #1e90ff 30%, ${theme.palette.primary.main} 90%)`,
    boxShadow: `0px 0px 12px #1e90ff`, // Blue glow on hover
  },
}));

// Card with shadow and hover effect
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

// Page Container with Flexbox to ensure Footer sticks to bottom
const PageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column', // Make the content stack vertically
  minHeight: '100vh', // Full viewport height
});

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

function DashboardHome() {
  return (
    <PageContainer>
      {/* Full-width Header */}
      

      {/* Main Dashboard Content */}
      <ContentContainer>
        <Typography variant="h3" sx={{ color: '#FFFFFF', fontSize: '1.8rem', marginBottom: '20px', marginTop: '20px' }}>
          Welcome, Agent Smith!
        </Typography>

        <Grid container spacing={2}>
          {/* Adjust grid spacing and card sizing so all cards fit on one screen */}

          <Grid item xs={12} sm={4}>
            <StyledCard>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <HowToRegIcon sx={{ fontSize: 40, marginRight: '10px', color: '#1e90ff' }} /> {/* All icons are now blue */}
                <Box>
                  <Typography variant="h6" color="textSecondary" sx={{ fontSize: '1rem' }}>
                    Clients Managing
                  </Typography>
                  <Typography variant="h2" color="textPrimary" sx={{ fontSize: '2rem' }}>12</Typography>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} sm={4}>
            <StyledCard>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <BubbleChartIcon sx={{ fontSize: 40, marginRight: '10px', color: '#1e90ff' }} /> {/* Blue icon */}
                <Box>
                  <Typography variant="h6" color="textSecondary" sx={{ fontSize: '1rem' }}>
                    Gaps Identified
                  </Typography>
                  <Typography variant="h2" color="textPrimary" sx={{ fontSize: '2rem' }}>5</Typography>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} sm={4}>
            <StyledCard>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <BeenhereIcon sx={{ fontSize: 40, marginRight: '10px', color: '#1e90ff' }} /> {/* Blue icon */}
                <Box>
                  <Typography variant="h6" color="textSecondary" sx={{ fontSize: '1rem' }}>
                    Offers Sent
                  </Typography>
                  <Typography variant="h2" color="textPrimary" sx={{ fontSize: '2rem' }}>3</Typography>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* New Opportunities Section */}
          <Grid item xs={12}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" color="textSecondary" sx={{ fontSize: '1rem' }} style={{fontWeight:"bold"}}>
                Opportunity Identification
                </Typography>
                <Typography variant="body1" color="textSecondary">
                Use AI to identify gaps in clients' coverage and suggest additional products.
                </Typography>
                <Link href="/OpportunityIdentification" asChild>
                <StyledButton sx={{ marginTop: '10px' }}>
                  FIND NEW OPPORTUNITIES
                </StyledButton>
                </Link>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Recent Recommendations Section (now below New Opportunities) */}
          {/* <Grid item xs={12}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" color="textSecondary" sx={{ fontSize: '1rem' }} style={{fontWeight:"bold"}}>
                Personalized Recommendations
                </Typography>
                <Typography variant="body1" color="textSecondary">
                Use AI to suggest customized insurance products based on individual client behaviors and preferences.
                </Typography>
                <Link href="/Recommendations" asChild>
                <StyledButton sx={{ marginTop: '10px' }}>
                  MAKE NEW RECOMMENDATIONS
                </StyledButton>
                </Link>
              </CardContent>
            </StyledCard>
          </Grid>*/}
        </Grid> 
      </ContentContainer>
    </PageContainer>
  );
}

export default DashboardHome;
