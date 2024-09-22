import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import StyledButton from '../components/StyledButton';  // Import your StyledButton component
import { View, Text, TextInput, StyleSheet, Image, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';  // For file downloading
import { LinearGradient } from 'expo-linear-gradient';  // Use LinearGradient for background

function ResultScreen() {
  const { result } = useLocalSearchParams();  // Retrieve the passed params

  // Safely parse the result or handle missing result
  let parsedResult = {};
  let generatedText = '';

  try {
    parsedResult = result ? JSON.parse(result) : {};

    // Access the generated_text from the results array
    if (parsedResult.results && parsedResult.results.length > 0) {
      generatedText = parsedResult.results[0].generated_text || '';
    }
  } catch (error) {
    console.error('Error parsing result:', error);
  }

  // Add state to handle email editing
  const [emailContent, setEmailContent] = useState(generatedText);

  // Handler for sending email (could be linked to a real email sending service)
  const handleSend = () => {
    Alert.alert('Success', 'Email sent successfully!');
    // You could also trigger an API call here to actually send the email
  };

  // Handler for PDF download (Ensure only one download happens)
  const handleDownloadPdf = async () => {
    try {
      const pdfUri = `${FileSystem.documentDirectory}generated-offers.pdf`;  // Example local path
      const { uri } = await FileSystem.downloadAsync(
        'https://example.com/generated-offers.pdf',  // URL of your PDF file
        pdfUri
      );
      Alert.alert('Download Complete', `File saved to: ${uri}`);
    } catch (error) {
      Alert.alert('Download Error', 'An error occurred while downloading the PDF');
      console.error(error);
    }
  };

  return (
    <LinearGradient
      colors={['#3399FF', '#1A1D2F']}  // Apply the gradient background
      style={styles.container}         // Use the gradient container
    >
      <Text style={styles.title}>Generated Email</Text>

      <View style={styles.contentBox}>
        {/* Editable text box */}
        <TextInput
          style={styles.textArea}
          value={emailContent}
          onChangeText={setEmailContent}  // Allow editing of the email content
          multiline={true}
          rows={15}
        />

        {/* Horizontal buttons: PDF download icon and StyledButton */}
        <View style={styles.buttonRow}>
          {/* PDF download icon */}
          <View style={styles.pdfContainer}>
            <Image
              source={require('../assets/images/pdf-icon.png')}  // Use the correct local path to the PDF icon
              style={styles.pdfIcon}
              onTouchEnd={handleDownloadPdf}  // Trigger download when the icon is touched
            />
            <Text>Download Offers PDF</Text>
          </View>

          {/* Send button */}
          <StyledButton text="Send Offer" onClick={handleSend} />
        </View>
      </View>
    </LinearGradient>
  );
}

export default ResultScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,  // Apply padding like in index.js
  },
  title: {
    fontSize: 24,
    color: '#ffffff',  // White title for contrast against gradient background
    marginBottom: 20,
  },
  contentBox: {
    width: '100%',
    maxWidth: 800,  // Match index.js max width
    backgroundColor: '#ffffff',  // White background for the content area
    padding: 20,
    borderRadius: 8,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',  // Similar to index.js shadow
  },
  textArea: {
    width: '100%',
    padding: 10,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,  // Space between text area and buttons
    lineHeight: 24,
    backgroundColor: '#fff',  // White background for text area
    textAlignVertical: 'top',  // For proper multiline behavior
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',  // Ensure vertical alignment
    justifyContent: 'space-between',
  },
  pdfContainer: {
    alignItems: 'center',
    cursor: 'pointer',
  },
  pdfIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
});
