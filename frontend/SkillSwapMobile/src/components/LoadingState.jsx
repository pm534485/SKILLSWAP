import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View } from

'react-native';
import theme from '../constants/theme';






export const LoadingState = ({
  message = 'Loading campus gigs...',
  style
}) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text style={styles.text}>{message}</Text>
    </View>);

};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    marginTop: 12,
    fontSize: 14,
    color: theme.colors.mutedText,
    fontWeight: '500'
  }
});

export default LoadingState;