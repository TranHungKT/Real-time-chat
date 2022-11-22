import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppNavigator } from './navigators';
import { store } from './stores';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <PaperProvider>
            <AppNavigator />
          </PaperProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
};
