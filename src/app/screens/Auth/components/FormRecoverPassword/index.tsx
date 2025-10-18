import {NavigationProp, ParamListBase} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import 'react-native-get-random-values';
import ButtonComponent from '@components/Button';

const FormRecoverPasswordComponent = ({
  navigation: _navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  return (
    <View style={{flex: 1}}>
      <ButtonComponent />
    </View>
  );
};

export default FormRecoverPasswordComponent;
