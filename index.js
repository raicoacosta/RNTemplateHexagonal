/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import CreditCardUseCaseProvider from './src/app/core/Modules/CreditCards/Applications/UseCases';
import App from './src/app/App';
import {name as appName} from './app.json';

function AppWithProvider() {
  return (
    <SafeAreaProvider>
      <CreditCardUseCaseProvider>
        <App />
      </CreditCardUseCaseProvider>
    </SafeAreaProvider>
  );
}

AppRegistry.registerComponent(appName, () => AppWithProvider);
