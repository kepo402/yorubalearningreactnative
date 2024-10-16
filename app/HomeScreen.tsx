// app/HomeScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Yoruba Learning App</Text>
        <View style={styles.navContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.navLink}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('DailyWords')}>
            <Text style={styles.navLink}>Daily Words</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Quiz')}>
            <Text style={styles.navLink}>Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.navLink}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.navLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Text style={styles.title}>Welcome to the Yoruba Learning App!</Text>
        <Text style={styles.description}>
          This app helps you learn Yoruba words at different levels: Beginner, Intermediate, and Pro.
        </Text>
        <Text style={styles.subtitle}>Quick Links</Text>
        <View style={styles.quickLinks}>
          <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('DailyWords')}>
            <Text style={styles.linkButtonText}>View Today's Words</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Progress')}>
            <Text style={styles.linkButtonText}>Check Your Progress</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>&copy; 2024 Yoruba Learning App. All rights reserved.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9',
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: '#4a4e69',
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  navLink: {
    color: '#ffffff',
    marginHorizontal: 15,
    fontWeight: '500',
    fontSize: 16,
  },
  mainContent: {
    flex: 1,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 20,
    color: '#22223b',
  },
  description: {
    fontSize: 18,
    marginBottom: 30,
    color: '#555',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
    color: '#22223b',
  },
  quickLinks: {
    marginTop: 20,
    width: '100%',
  },
  linkButton: {
    backgroundColor: '#9a6d9a',
    padding: 12,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  linkButtonText: {
    color: '#ffffff',
    fontSize: 20,
  },
  footer: {
    backgroundColor: '#4a4e69',
    padding: 15,
    alignItems: 'center',
  },
  footerText: {
    color: '#ffffff',
    fontSize: 14,
  },
});
