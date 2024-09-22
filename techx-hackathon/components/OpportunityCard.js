import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Image } from 'react-native';

// Static image imports using require
const images = {
  'off1': require('../assets/images/off1.png'),
  'off2': require('../assets/images/off2.png'),
  'off3': require('../assets/images/off3.png'),
  'off4': require('../assets/images/off4.png'),
  'off5': require('../assets/images/off5.png'),
  'off6': require('../assets/images/off6.png'),
  'off7': require('../assets/images/off7.png'),
  'off8': require('../assets/images/off8.png'),
  'off9': require('../assets/images/off9.png'),
  'off10': require('../assets/images/off10.png'),
  'off11': require('../assets/images/off11.png'),
  'off12': require('../assets/images/off12.png'),
  'off13': require('../assets/images/off13.png'),
  'off14': require('../assets/images/off14.png'),
};

// Styled component for the card (for react-native-web support)
const CardContainer = styled(Box)(({ isSelected }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0', // Remove padding for a cleaner top image
  // borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  transition: 'border 0.3s ease',
  border: isSelected ? '2px solid #1e90ff' : '2px solid transparent',  // Highlight if selected
  '&:hover': {
    border: '2px solid rgba(30, 144, 255, 0.5)',  // Hover effect
  },
  backgroundColor: 'white', // Set card background to white
  width: '100%', // Ensure the card takes the full width
}));

function OpportunityCard({ card, isSelected, onClick }) {
  return (
    <CardContainer isSelected={isSelected} onClick={onClick}>
      
      {/* Move the image to the top */}
      {card.imageUrl ? (
        <Image
          source={images[card.imageUrl]}  // Use the corresponding image dynamically
          style={{ width: '100%' }} // Cover the full width of the card and set height
          resizeMode="cover" // Ensures the image covers the entire width
        />
      ) : null}

      {/* Display the card content below the image */}
      <Box sx={{ padding: '20px' }}> {/* Add padding to the content */}
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{card.category}</Typography>
        <Typography variant="body1" sx={{ marginTop: '10px' }}>{card.content}</Typography>
      </Box>
    </CardContainer>
  );
}

export default OpportunityCard;
