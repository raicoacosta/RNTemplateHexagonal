import React, {useMemo, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import CreditCardUseCaseProvider, {
  useCreditCardImpl,
} from '@core/Modules/CreditCards/Applications/UseCases';
import {CreditCard} from '@core/Modules/CreditCards/Domain/Entities/CreditCard';

const Colors = {
  lighter: '#F3F3F3',
  darker: '#242c40',
  black: '#000000',
  white: '#FFFFFF',
};

function App(): React.JSX.Element {
  const creditCardImpl = useCreditCardImpl();

  const [creditCards, setCrediCards] = useState<CreditCard[]>();
  const [creditCardsError, setCrediCardsError] = useState<any>();

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const invokeCreditcards = async () => {
    try {
      const response = await creditCardImpl.executeGetAll();
      setCrediCards(response);
    } catch (error) {
      setCrediCardsError(error);
    }
  };

  useMemo(async () => {
    await invokeCreditcards();
  }, []);

  return (
    <CreditCardUseCaseProvider>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            {creditCards?.map((creditCard: CreditCard) => (
              <View style={{padding: 8}}>
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 8,
                    padding: 16,
                    shadowColor: '#000000',
                    shadowOpacity: 0.2,
                    shadowOffset: {width: 0, height: 2},
                    shadowRadius: 4,
                    elevation: 4,
                  }}>
                  <Text
                    style={{fontSize: 18, fontWeight: 'bold', marginBottom: 8}}>
                    {'US$ ' + creditCard.cashAdvance}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#777777',
                    }}>
                    {creditCard.alias}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#777777',
                    }}>
                    {creditCard.productNumber}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </CreditCardUseCaseProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
