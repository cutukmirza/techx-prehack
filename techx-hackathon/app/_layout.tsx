import { Stack } from "expo-router";
import HeaderComponent from '../components/Header';
import FooterComponent from '../components/Footer';
import { LogBox } from 'react-native';

import styled, { ThemeProvider } from 'styled-components/native';
import theme from '../theme/theme'; // Import the custom theme

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
    <HeaderComponent/>
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}}/>
      <Stack.Screen name="OpportunityIdentification" options={{headerShown: false}}/>
      <Stack.Screen name="Recommendations" options={{headerShown: false}}/>
    </Stack>
    {/* <FooterComponent/> */}
    </ThemeProvider>
  );
}

