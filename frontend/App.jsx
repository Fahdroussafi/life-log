/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState, useCallback} from 'react';

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
  const [storedCredentials, setStoredCredentials] = useState({});

  const checkLoginCredentials = () => {
    AsyncStorage.multiGet(['token', 'userName', 'userId'])
      .then(value => {
        if (value !== null) {
          console.log(value);
          setStoredCredentials({
            token: value[0][1],
            userName: value[1][1],
            userId: value[2][1],
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onSignIn = useCallback((token, userName, userId) => {
    setStoredCredentials({token, userName, userId});
  }, []);

  const signOut = useCallback(() => {
    setStoredCredentials({});
  }, []);

  useEffect(() => {
    checkLoginCredentials();
    setAppReady(true);
  }, []);

  return (
    <CredentialsContext.Provider
      value={{
        storedCredentials,
        setStoredCredentials: onSignIn,
        signOut,
      }}>
      <QueryClientProvider client={queryClient}>
        {appReady && <RootStack />}
      </QueryClientProvider>
    </CredentialsContext.Provider>
  );
}

export default Root;
