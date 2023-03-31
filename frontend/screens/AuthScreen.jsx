import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import styles from '../components/styles';
import Svg, {Image, Ellipse, ClipPath} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
  runOnJS,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

import {login, register} from '../utils/service';
import {useMutation} from 'react-query';

import {CredentialsContext} from '../components/CredentialsContext';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AuthScreen({navigation}) {
  const {height, width} = Dimensions.get('window');
  const imagePosition = useSharedValue(1);
  const formButtonScale = useSharedValue(1);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  //context
  const {storedCredentials, setStoredCredentials} =
    useContext(CredentialsContext);

  const {mutate, isLoading, error} = useMutation(
    isRegistering ? register : login,
    {
      onSuccess: data => {
        persistLogin(data);
        navigation.navigate('Nav', {screen: 'Home'});
      },
      onError: error => {
        Alert.alert('Error', error.response.data.message);
      },
      isLoading: setTimeout(() => {
        return isLoading;
      }, 5000),
    },
  );

  const persistLogin = async data => {
    await AsyncStorage.multiSet([
      ['token', data.token],
      ['userName', data.result.name],
      ['userId', data.result._id],
    ])
      .then(() => {
        setStoredCredentials(data.token, data.result.name, data.result._id);
        navigation.navigate('Nav', {screen: 'Home'});
      })
      .catch(error => {
        console.error(error);
      });
  };

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height / 2, 0],
    );
    return {
      transform: [{translateY: withTiming(interpolation, {duration: 1000})}],
    };
  });

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
    return {
      opacity: withTiming(imagePosition.value, {duration: 500}),
      transform: [{translateY: withTiming(interpolation, {duration: 1000})}],
    };
  });

  const closeButtonContainerStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, {duration: 800}),
      transform: [
        {rotate: withTiming(interpolation + 'deg', {duration: 1000})},
      ],
    };
  });

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        imagePosition.value === 0
          ? withDelay(400, withTiming(1, {duration: 800}))
          : withTiming(0, {duration: 300}),
    };
  });

  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: formButtonScale.value}],
    };
  });

  const loginHandler = async () => {
    imagePosition.value = 0;
    if (isRegistering) {
      runOnJS(setIsRegistering)(false);
    }
  };

  const registerHandler = () => {
    imagePosition.value = 0;
    if (!isRegistering) {
      runOnJS(setIsRegistering)(true);
    }
  };

  return (
    <Animated.View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
        <Svg height={height + 70} width={width}>
          <ClipPath id="clipPathId">
            <Ellipse cx={width / 2} rx={height} ry={height + 90} />
          </ClipPath>
          <Image
            href={require('../assets/bg.jpg')}
            width={width + 100}
            height={height + 100}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clipPathId)"
          />
        </Svg>
        <Animated.View
          style={[styles.closeButtonContainer, closeButtonContainerStyle]}>
          <Text
            onPress={() => (imagePosition.value = 1)}
            className="text-white">
            X
          </Text>
        </Animated.View>
      </Animated.View>
      <View style={styles.bottomContainer}>
        <Animated.View style={buttonsAnimatedStyle}>
          <Pressable style={styles.button} onPress={loginHandler}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={buttonsAnimatedStyle}>
          <Pressable style={styles.button} onPress={registerHandler}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="white"
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.textInput}
            onChangeText={text => setEmail(text)}
            value={email}
          />
          {isRegistering && (
            <TextInput
              placeholder="Enter your name"
              placeholderTextColor="white"
              style={styles.textInput}
              onChangeText={text => setName(text)}
              value={name}
            />
          )}
          <TextInput
            placeholder="********"
            placeholderTextColor="white"
            secureTextEntry={true}
            style={styles.textInput}
            onChangeText={text => setPassword(text)}
            value={password}
          />
          <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
            <Pressable
              onPress={() =>
                (formButtonScale.value = withSequence(
                  withSpring(1.5),
                  withSpring(1),
                ))
              }>
              <Text
                style={styles.buttonText}
                onPress={() => mutate({email, password, name})}>
                {isRegistering ? 'REGISTER' : 'LOG IN'}
              </Text>
            </Pressable>
          </Animated.View>
          {isLoading && (
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator size="large" color="white" />
            </View>
          )}
        </Animated.View>
      </View>
    </Animated.View>
  );
}
