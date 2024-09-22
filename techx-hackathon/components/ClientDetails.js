import React from 'react';
import { Typography, Box, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ClientInfo = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)', // Two columns for client information
  gap: '10px', // Spacing between fields
  zIndex: 1, // Make sure the content is above any background icon
  paddingBottom: '10px',
});

const IconWrapper = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  opacity: 0.2,
});

function ClientDetails({ selectedClient }) {
  if (!selectedClient) {
    return <Typography>Select a client to see details</Typography>;
  }

  return (
    <Box sx={{ position: 'flex' }}>
      <ClientInfo>
        <Typography variant="body1"><strong>Name:</strong> {selectedClient.name}</Typography>
        <Typography variant="body1"><strong>Date of Birth:</strong> {selectedClient.dateOfBirth}</Typography>
        <Typography variant="body1"><strong>Gender:</strong> {selectedClient.gender}</Typography>
        <Typography variant="body1"><strong>Home Address:</strong> {selectedClient.homeAddress}</Typography>
        <Typography variant="body1"><strong>Email Address:</strong> {selectedClient.email}</Typography>
        <Typography variant="body1"><strong>Phone Number(s):</strong> {selectedClient.phoneNumbers.join(', ')}</Typography>
        <Typography variant="body1"><strong>Social Security Number:</strong> {selectedClient.socialSecurityNumber}</Typography>
        <Typography variant="body1"><strong>Marital Status:</strong> {selectedClient.maritalStatus}</Typography>
        <Typography variant="body1"><strong>Occupation:</strong> {selectedClient.occupation}</Typography>
        <Typography variant="body1"><strong>Employment Status:</strong> {selectedClient.employmentStatus}</Typography>
        <Typography variant="body1"><strong>Income Level:</strong> {selectedClient.incomeLevel}</Typography>
        <Typography variant="body1"><strong>Dependents:</strong> {selectedClient.dependents}</Typography>
        <Divider />
        <Typography variant="body1"><strong>Policy Number:</strong> {selectedClient.policyNumber}</Typography>
        <Typography variant="body1"><strong>Policy Type:</strong> {selectedClient.policyType}</Typography>
        <Typography variant="body1"><strong>Policy Premium:</strong> {selectedClient.policyPremium}</Typography>
      </ClientInfo>
    </Box>
  );
}

export default ClientDetails;
