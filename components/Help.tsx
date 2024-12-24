import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Linking, 
  ScrollView 
} from 'react-native';

const Help: React.FC = () => {
  const handleEmailPress = () => {
    Linking.openURL('mailto:Dominos@gmmail.com?subject=Help%20Request');
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:03465750452');
  };

  const handleLiveChatPress = () => {
    // Replace with your Live Chat URL
    Linking.openURL('https://your-live-chat-url.com');
  };

  const handleFeedbackPress = () => {
    // Replace with a feedback form link or other logic
    Linking.openURL('https://your-feedback-form-url.com');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Help & Support</Text>
      <Text style={styles.text}>
        Need assistance? Contact us or explore helpful resources below.
      </Text>

      {/* Contact Options */}
      <View style={styles.contactContainer}>
        <Text style={styles.subHeader}>Contact Us:</Text>

        <TouchableOpacity onPress={handleEmailPress}>
          <Text style={styles.linkText}>📧 Email: Dominos@gmmail.com</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePhonePress}>
          <Text style={styles.linkText}>📞 Phone: 03465750452</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLiveChatPress}>
          <Text style={styles.linkText}>💬 Live Chat Support</Text>
        </TouchableOpacity>
      </View>

      {/* Support Hours */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Support Hours:</Text>
        <Text style={styles.text}>
          🕒 Monday to Friday: 9:00 AM - 6:00 PM
        </Text>
        <Text style={styles.text}>
          📅 Saturday to Sunday: 10:00 AM - 4:00 PM
        </Text>
      </View>

      {/* FAQ Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Frequently Asked Questions:</Text>
        <Text style={styles.faqQuestion}>1. How can I reset my password?</Text>
        <Text style={styles.faqAnswer}>
          Go to the login screen, tap on "Forgot Password?" and follow the steps.
        </Text>

        <Text style={styles.faqQuestion}>2. How can I track my order?</Text>
        <Text style={styles.faqAnswer}>
          Visit the "Orders" section in your account to see your order status.
        </Text>

        <Text style={styles.faqQuestion}>3. How can I contact customer support?</Text>
        <Text style={styles.faqAnswer}>
          You can email, call, or use the live chat option listed above.
        </Text>
      </View>

      {/* Feedback Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Feedback:</Text>
        <Text style={styles.text}>
          We value your opinion! Help us improve by sharing your thoughts.
        </Text>
        <TouchableOpacity onPress={handleFeedbackPress}>
          <Text style={styles.feedbackButton}>📝 Give Feedback</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>
        Our team is dedicated to providing 24/7 support to assist you!
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 12,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  linkText: {
    fontSize: 16,
    color: '#007BFF',
    marginBottom: 12,
  },
  section: {
    marginBottom: 20,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
    marginBottom: 8,
  },
  feedbackButton: {
    fontSize: 16,
    color: '#28A745',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
  },
  footerText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
  contactContainer: {
    marginBottom: 16,
  },
});

export default Help;
