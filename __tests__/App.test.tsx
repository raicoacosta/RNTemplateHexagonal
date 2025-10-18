/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/app/App';

// Note: import explicitly to use the types shiped with jest.
import {it, expect} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer, {act, ReactTestRenderer} from 'react-test-renderer';

it('renders correctly', async () => {
  let component: ReactTestRenderer | undefined;
  
  await act(async () => {
    component = renderer.create(<App />);
    // Wait for all async operations (useEffect, API calls, state updates)
    await new Promise(resolve => setTimeout(resolve, 1000));
  });
  
  expect(component).toBeDefined();
  
  // Cleanup - wrap unmount in act to avoid warnings
  await act(async () => {
    if (component) {
      component.unmount();
    }
  });
});
