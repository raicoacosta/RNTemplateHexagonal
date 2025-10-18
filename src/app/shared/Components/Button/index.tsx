/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  GestureResponderEvent,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

const ButtonComponent: React.FC<{
  label?: string;
  fill?: 'solid' | 'outline' | 'transparent';
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  size?: 'small' | 'default' | 'large' | 'largeSmall' | 'largeIcon';
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconStyle?: TextStyle;
}> = ({
  fill = 'solid',
  disabled = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{opacity: disabled ? (fill === 'solid' ? 0.5 : 0.2) : 1}}
      disabled={disabled}
      onPress={onPress}
    />
  );
};

export default ButtonComponent;
