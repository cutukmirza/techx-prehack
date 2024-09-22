import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Footer Component (full width, always at bottom)
const Footer = styled(Box)({
  height: '30px', // Define the height of the footer
  backgroundColor: '#1A1D2F', // Dark blue footer
  color: '#FFFFFF', // White text
  textAlign: 'center', // Center the text horizontally
  padding: '20px 0', // Padding for vertical space
  width: '100%', // Full width of the footer
  marginTop: 'auto', // Push the footer to the bottom
  position: 'relative', // Ensure it stays at the bottom of the page
  bottom: 0, // Stick to bottom
});

function FooterComponent() {
  return (
    <Footer>
      <Typography variant="body2">
        IBM TechXchange Pre-Conference watsonx Hackathon
      </Typography>
    </Footer>
  );
}

export default FooterComponent;
