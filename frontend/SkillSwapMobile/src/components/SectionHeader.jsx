import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View } from

'react-native';
import theme from '../constants/theme';








export const SectionHeader = ({
  title,
  actionText,
  onActionPress,
  style
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      {Boolean(actionText) && Boolean(onActionPress) &&
      <TouchableOpacity onPress={onActionPress}>
          <Text style={styles.action}>{actionText}</Text>
        </TouchableOpacity>
      }
    </View>);

};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.md
  },
  title: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.text
  },
  action: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.primary
  }
});

export default SectionHeader;