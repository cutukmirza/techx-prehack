import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

function ClientList({ clientsData, handleClientClick }) {
  return (
    <>
      <Typography variant="h5" gutterBottom>Clients</Typography>
      <List>
        {clientsData.map((client) => (
          <ListItem button key={client.id} onClick={() => handleClientClick(client)}>
            <ListItemText primary={client.name} />
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default ClientList;
