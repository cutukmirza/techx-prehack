import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import OpportunityCard from './OpportunityCard';

// Styled component for the horizontal scroll container
const RowContainer = styled(Box)({
  display: 'flex',
  overflowX: 'auto',  // Enable horizontal scrolling
  gap: '20px',       // Space between cards
  padding: '10px 0',
  scrollSnapType: 'x mandatory',  // Optional for snap scrolling effect
  '&::-webkit-scrollbar': {
    display: 'none',  // Hide scrollbar for better aesthetics
  },
});

const RowTitle = styled(Box)({
  fontFamily: "Arial",
  fontWeight: 'bold',
  fontSize: '18px',
  marginBottom: '10px',
});

function Opportunities({ opportunityCards = [], selectedOpportunities, setSelectedOpportunities }) {
  // Handle toggling the selection of an opportunity
  const handleSelectOpportunity = (index) => {
    if (selectedOpportunities.includes(index)) {
      // If already selected, deselect it
      setSelectedOpportunities((prev) => prev.filter((i) => i !== index));
    } else {
      // Otherwise, select it
      setSelectedOpportunities((prev) => [...prev, index]);
    }
  };

  const rows = [
    {
      title: 'Upsell Opportunities',
      cards: opportunityCards.slice(0, 3),  // First 3 cards
    },
    {
      title: 'Add-On Offers',
      cards: opportunityCards.slice(3, 6),  // Next 3 cards
    },
    {
      title: 'Partner Deals',
      cards: opportunityCards.slice(6, 9),  // Last 3 cards
    },
  ];

  return (
    <Box sx={{ height: '100%', padding: '10px' }}>
      {rows.map((row, rowIndex) => (
        <Box key={rowIndex} sx={{ marginBottom: '10px' }}>
          {/* Row title */}
          <RowTitle>{row.title}</RowTitle>

          {/* Horizontal scroll container */}
          <RowContainer>
            {row.cards.map((card, cardIndex) => {
              const overallIndex = rowIndex * 3 + cardIndex;
              const isSelected = selectedOpportunities.includes(overallIndex);

              return (
                <OpportunityCard
                  key={cardIndex}
                  card={card}
                  isSelected={isSelected}
                  onClick={() => handleSelectOpportunity(overallIndex)}  // Handle card click
                />
              );
            })}
          </RowContainer>
        </Box>
      ))}
    </Box>
  );
}

export default Opportunities;
