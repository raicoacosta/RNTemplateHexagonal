import {NavigationProp, ParamListBase} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import FormRecoverPasswordComponent from '../Auth/components/FormRecoverPassword';

const RecoverPasswordPresenter = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  return (
    <View style={{flex: 1}}>
      <FormRecoverPasswordComponent navigation={navigation} />
    </View>
  );
};

export default RecoverPasswordPresenter;
