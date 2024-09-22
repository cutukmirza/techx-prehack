import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import { Image } from 'react-native';
import { Asset } from 'expo-asset';
import { Link } from 'expo-router';
// Full-width Header Component
const Header = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#FFFFFF', // White background for the header
  color: theme.palette.text.primary, // Dark text color
  width: '100%', // Full width
  top: 0, // Stick to the top of the page
  height:'70px'
}));

function HeaderComponent() {
  return (
    <Header position="fixed">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Link href='/' asChild>
        <Image source={Asset.fromModule(require('../assets/images/watsoncare-logo.png'))} />
        </Link>
        <Box display="flex" alignItems="center">
          <Typography variant="body1" sx={{ marginRight: '10px' }}>
            Agent Smith
          </Typography>
          <Image source={Asset.fromModule(require("../assets/images/avatar_147133.png"))} style={{
            resizeMode: 'contain',
            height: 50,
            width: 50,
          }} />
          {/* Hamburger Menu */}
          <IconButton edge="end" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </Header>
  );
}

export default HeaderComponent;
