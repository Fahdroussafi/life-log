import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

// import Icon from "react-native-vector-icons/FontAwesome";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // perform login logic here
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <View style={{ flex: 1, marginTop: 36, paddingHorizontal: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Login
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          paddingVertical: 10,
          paddingHorizontal: 15,
          marginBottom: 10,
        }}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          paddingVertical: 10,
          paddingHorizontal: 15,
          marginBottom: 20,
        }}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "#0099ff",
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 5,
        }}
        onPress={handleLogin}>
        <Text style={{ color: "#fff", fontSize: 18 }}>Login</Text>
      </TouchableOpacity>

      <View className="mt-5">
        <Text className="text-[#000000] text-sm">
          Dont have an account?
          <Text className="text-[#20B08E]"> Register</Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
