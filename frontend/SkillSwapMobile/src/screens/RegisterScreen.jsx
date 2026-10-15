import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View } from
'react-native';
import theme from '../constants/theme';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validateRequired } from
'../utils/validators';
import { useSkillSwap } from '../context/SkillSwapContext';
import authApi from '../services/authApi';
import { Picker } from '@react-native-picker/picker';




export const RegisterScreen = ({ navigation }) => {
  const { login } = useSkillSwap();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState(





    {});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleRegister = async () => {
    setApiError('');
    const nameVal = validateRequired(name, 'Full name');
    const emailVal = validateEmail(email);
    const deptVal = validateRequired(department, 'Campus department / program');
    const passVal = validatePassword(password);
    const confVal = validateConfirmPassword(password, confirmPassword);

    const newErrors = {};
    if (!nameVal.isValid) newErrors.name = nameVal.error;
    if (!emailVal.isValid) newErrors.email = emailVal.error;
    if (!deptVal.isValid) newErrors.department = deptVal.error;
    if (!passVal.isValid) newErrors.password = passVal.error;
    if (!confVal.isValid) newErrors.confirmPassword = confVal.error;

    setErrors(newErrors);

    if (
    !nameVal.isValid ||
    !emailVal.isValid ||
    !deptVal.isValid ||
    !passVal.isValid ||
    !confVal.isValid)
    {
      return;
    }

    setLoading(true);
    try {
      const response = await authApi.register({
        name: name.trim(),
        email: email.trim(),
        department: department.trim(),
        password
      });
      await login(response.user, response.token);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }]
      });
    } catch (err) {
      setApiError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backBtnText}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>Join SkillSwap</Text>
            <Text style={styles.subtitle}>
              Create your peer freelancing profile on campus
            </Text>
          </View>

          {Boolean(apiError) &&
          <View style={styles.apiErrorBanner}>
              <Text style={styles.apiErrorText}>{apiError}</Text>
            </View>
          }

          <View style={styles.formCard}>
            <InputField
              label="Full Name"
              placeholder="e.g. Sneha Kulkarni"
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              error={errors.name} />
            

            <InputField
              label="Campus or Personal Email"
              placeholder="e.g. sneha@campus.edu"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false} />
            

            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Department / Course</Text>
              <View style={[styles.pickerWrapper, errors.department && styles.pickerError]}>
                <Picker
                  selectedValue={department}
                  onValueChange={(itemValue) => {
                    setDepartment(itemValue);
                    if (errors.department) setErrors({ ...errors, department: undefined });
                  }}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Department" value="" color={theme.colors.mutedText} />
                  <Picker.Item label="Computer Science" value="Computer Science" />
                  <Picker.Item label="Information Technology" value="Information Technology" />
                  <Picker.Item label="Business Administration" value="Business Administration" />
                  <Picker.Item label="Engineering" value="Engineering" />
                  <Picker.Item label="Design & Arts" value="Design & Arts" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
              {errors.department && <Text style={styles.errorText}>{errors.department}</Text>}
            </View>
            

            <InputField
              label="Password (min 6 characters)"
              placeholder="Create a secure password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              error={errors.password}
              isPassword
              autoCapitalize="none" />
            

            <InputField
              label="Confirm Password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (errors.confirmPassword)
                setErrors({ ...errors, confirmPassword: undefined });
              }}
              error={errors.confirmPassword}
              isPassword
              autoCapitalize="none" />
            

            <PrimaryButton
              title="Create Account"
              onPress={handleRegister}
              loading={loading}
              style={styles.submitBtn} />
            
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already registered? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>);

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  keyboardView: {
    flex: 1
  },
  scrollContent: {
    padding: theme.spacing.lg,
    flexGrow: 1
  },
  backBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    marginBottom: 8
  },
  backBtnText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '700'
  },
  header: {
    marginBottom: 20
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: theme.colors.text,
    marginBottom: 4
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.mutedText
  },
  apiErrorBanner: {
    backgroundColor: '#FEE2E2',
    borderRadius: theme.radius.sm,
    padding: 12,
    marginBottom: 16
  },
  apiErrorText: {
    color: theme.colors.error,
    fontSize: 13,
    fontWeight: '600'
  },
  formCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.card,
    marginBottom: 16
  },
  submitBtn: {
    marginTop: 8
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24
  },
  footerText: {
    fontSize: 14,
    color: theme.colors.mutedText
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.primary
  },
  pickerContainer: {
    marginBottom: 16,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 8,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    backgroundColor: '#F9FAFB',
    overflow: 'hidden',
  },
  pickerError: {
    borderColor: theme.colors.error,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    marginTop: 4,
  }
});

export default RegisterScreen;