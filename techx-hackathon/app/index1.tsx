import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // Using Ionicons for icons, but you can replace it with other libraries if needed
import { Router } from 'expo-router';
import { Link } from 'expo-router';
export default function AppScreen() {
  const sections = [
    {
      title: "Personalized Car Insurance Renewal",
      description: "Choose a customer and automatically prepare a new renewal offer for them including pre-selected add-ons and partner offers.",
      buttonText: "Try now",
      icon: "car", // Icon name from Ionicons
      link: '/'
    },
    {
      title: "Kubernetes",
      description: "DigitalOcean Kubernetes is a managed solution that is easy to scale and includes a 99.5% SLA and free control plane.",
      buttonText: "Learn more",
      icon: "cloud",
    },
    {
      title: "NVIDIA H100 GPUs",
      description: "NVIDIA H100 GPUs are now available via Paperspace by DigitalOcean. Build epic AI/ML applications.",
      buttonText: "Learn more",
      icon: "hardware-chip",
    },
    {
      title: "App Platform",
      description: "App Platform is our fully-managed PaaS solution to get your app to market fast that's super simple to set up and cost-effective.",
      buttonText: "Learn more",
      icon: "apps",
    },
    {
      title: "Managed databases",
      description: "Managed MongoDB, Kafka, MySQL, PostgreSQL, and Caching let you focus on your apps while we update and scale your databases.",
      buttonText: "Learn more",
      icon: "database",
    },
    {
      title: "Storage",
      description: "DigitalOcean Spaces object storage and Volumes block storage are business-ready storage solutions.",
      buttonText: "Learn more",
      icon: "cloud-upload",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.customHeader}>
        <Image
          source={require('../assets/images/watsoncare-logo.png')}  // Replace with your logo URL or local image
          style={styles.logo}
        />
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contact the developer</Text>
        </TouchableOpacity>
      </View>

      {/* <Text style={styles.heading}>Smart Insurance Solutions</Text> */}
      {/* <Text style={styles.subHeading}>DigitalOcean's suite of products is designed to be with you on every step of your journey, whether you want to do it yourself or get help from the experts.</Text> */}

      <View style={styles.grid}>
        {sections.map((section, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name={section.icon} size={24} color="#0069ff" style={styles.cardIcon} />
              <Text style={styles.cardTitle}>{section.title}</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.cardDescription}>{section.description}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{section.buttonText}</Text>
            </TouchableOpacity>
            <Link href="/DashboardHome" asChild>
            <TouchableOpacity>
              <Text>Go to the homepage</Text>
            </TouchableOpacity>
            </Link>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  customHeader: {
    position: 'relative',
    alignItems: 'center',  // Center the logo
    justifyContent: 'center',
    marginBottom: 20,
    paddingVertical: 10,
  },
  logo: {
    
  },
  contactButton: {
    position: 'absolute',  // Position the button absolutely
    right: 20,  // Position on the right side
    backgroundColor: '#0069ff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  contactButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#f5f5f5',
    width: '47%',
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardIcon: {
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#0069ff',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
