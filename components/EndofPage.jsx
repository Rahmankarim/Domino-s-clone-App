import React from 'react';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';

const EndofPage = () => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.innerFooter}>
        {/* DOMINO'S PIZZA Section */}
        <View style={styles.footerSection}>
          <Text style={styles.footerTitle}>DOMINO'S PIZZA</Text>
          <Text style={styles.footerLink}>About Us</Text>
          <Text style={styles.footerLink}>Privacy Policy</Text>
          <Text style={styles.footerLink}>Terms & Conditions</Text>
          <Text style={styles.footerLink}>Nutritional Info</Text>
          <Text style={styles.footerLink}>Download Menu</Text>
        </View>

        {/* CONTACT Section */}
        <View style={styles.footerSection}>
          <Text style={styles.footerTitle}>CONTACT</Text>
          <Text style={styles.footerLink}>Call 111 366 466</Text>
          <Text style={styles.footerLink}>Feedback</Text>
        </View>
      </View>

      {/* HELP Section */}
      <View style={styles.footerSection}>
        <Text style={styles.footerTitle}>HELP</Text>
        <Text style={styles.footerLink}>Track Order</Text>
        <Text style={styles.footerLink}>Store Finder</Text>
      </View>

      {/* Social Icons Section */}
      <View style={styles.footerSocial}>
        <View style={styles.socialIcons}>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/dominospakistan')}>
            <Image source={require('../assets/images/facebook.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/channel/UCsHUR9AyjKUTtWWoLmpUd-A')}>
            <Image source={require('../assets/images/youtube.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/dominospakistan')}>
            <Image source={require('../assets/images/X_logo.jpg')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/dominos_pk/?hl=en')}>
            <Image source={require('../assets/images/instagram.jpg')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer Bottom Section */}
      <View style={styles.footerBottom}>
        <Text style={styles.footerBottomText}>2024 Domino's. All rights reserved</Text>
        <Text style={styles.footerBottomText}>Powered By SimpleX Technology Solutions</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: '#f4f4f4',
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginTop: 20,
  },
  innerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
  },
  footerSection: {
    marginBottom: 20,
    // Remove any margin between DOMINO'S PIZZA and CONTACT sections
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#002D62',
    marginBottom: 10,
  },
  footerLink: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  footerSocial: {
    marginBottom: 20,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  appStore: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  storeIcon: {
    width: 130,
    height: 40,
  },
  footerBottom: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  footerBottomText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
});

export default EndofPage;
