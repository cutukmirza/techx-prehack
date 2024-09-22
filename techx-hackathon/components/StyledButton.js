import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButtonComponent = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, #1e90ff 90%)`,
  borderRadius: '20px',
  padding: '10px 20px',
  color: '#12324',
  position: 'sticky',              // Keep the button sticky
  bottom: '0',                     // Stick to the bottom of the scrollable area
  zIndex: 1,                       // Ensure it's above content
  alignSelf: 'flex-start',          // Align the button to the left side
  marginTop: 'auto',               // Push button to the bottom of the container
  transition: 'all 0.3s ease',
  '&:hover': {
    background: `linear-gradient(45deg, #1e90ff 30%, ${theme.palette.primary.main} 90%)`,
    boxShadow: `0px 0px 12px #1e90ff`,
  },
}));

function StyledButton({ text, onClick }) {
  return (
    <StyledButtonComponent variant="contained" onClick={onClick}>
      {text}
    </StyledButtonComponent>
  );
}

export default StyledButton;
