import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";

const MyInfo = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const isFormValid = firstName && phone && termsAccepted;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleContinue = () => {
    if (!isFormValid) return;
    console.log("Form Submitted");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View style={styles.header}>
          {navigation ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backButton}>Back</Text>
            </TouchableOpacity>
          ) : null}
          <Text style={styles.title}>My Details</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* First Name */}
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          {/* Last Name */}
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
          {/* Phone Number */}
          <View style={styles.phoneRow}>
            <TextInput
              style={[styles.input, { flex: 2 }]}
              placeholder="+92 3"
              value={phone}
              keyboardType="phone-pad"
              onChangeText={setPhone}
            />
            <TouchableOpacity
              style={[
                styles.otpButton,
                { backgroundColor: phone ? "#F2F2F2" : "#ddd" },
              ]}
              disabled={!phone}
            >
              <Text style={styles.otpText}>Send OTP</Text>
            </TouchableOpacity>
          </View>
          {/* OTP */}
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            value={otp}
            keyboardType="numeric"
            onChangeText={setOtp}
          />
          {/* Email */}
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
          />
          {/* Checkbox */}
          <View style={styles.checkboxRow}>
            <CheckBox
              value={termsAccepted}
              onValueChange={setTermsAccepted}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxLabel}>
              Sign up now to avail exclusive rewards & discounts
            </Text>
          </View>
          <Text style={styles.orText}>OR</Text>
          <Text style={styles.loginText}>
            Already got an account?{" "}
            <Text style={styles.linkText}>Login</Text>
          </Text>
          {/* Terms */}
          <Text style={styles.termsText}>
            By joining, you agree to receive messages from Domino's, and you
            agree to our{" "}
            <Text style={styles.linkText}>Terms and Conditions</Text> and{" "}
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerItem}>1 item | Rs. 549</Text>
          <TouchableOpacity
            style={[
              styles.continueButton,
              { backgroundColor: isFormValid ? "#007B7F" : "#ddd" },
            ]}
            disabled={!isFormValid}
            onPress={handleContinue}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    color: "#007B7F",
    fontSize: 16,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#F8F8F8",
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  otpButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginLeft: 10,
    alignItems: "center",
  },
  otpText: {
    color: "#007B7F",
    fontWeight: "bold",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  orText: {
    textAlign: "center",
    fontSize: 14,
    color: "#999",
    marginVertical: 10,
  },
  loginText: {
    textAlign: "center",
    fontSize: 14,
    color: "#333",
  },
  linkText: {
    color: "#007B7F",
    fontWeight: "bold",
  },
  termsText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginVertical: 15,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#F8F8F8",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  footerItem: {
    fontSize: 14,
    color: "#333",
  },
  continueButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  continueText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default MyInfo;
