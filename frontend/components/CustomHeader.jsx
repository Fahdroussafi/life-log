import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const CustomHeader = () => {
  const navigation = useNavigation();

  return (
    <View className="p-3 mt-2">
      <Icon
        name="arrow-back"
        size={24}
        color="#000"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default CustomHeader;
