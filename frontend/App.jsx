/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';

import {QueryClient, QueryClientProvider} from 'react-query';

// aysnc-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import {CredentialsContext} from './components/CredentialsContext';

// RootStack
import RootStack from './navigators/RootStack';

const queryClient = new QueryClient();

function Root() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState('');

  const checkLoginCredentials = () => {
    AsyncStorage.getItem('token')
      .then(result => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    checkLoginCredentials();
    setAppReady(true);
  }, []);

  return (
    <CredentialsContext.Provider
      value={{storedCredentials, setStoredCredentials}}>
      <QueryClientProvider client={queryClient}>
        {appReady && <RootStack />}
      </QueryClientProvider>
    </CredentialsContext.Provider>
  );
}

export default Root;
