import { View, Text } from 'react-native';

export default function Test() {
  console.log('TEST PAGE LOADED!!!!');
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
      <Text style={{ fontSize: 48, color: 'white', fontWeight: 'bold' }}>
        TEST PAGE WORKS!!!
      </Text>
    </View>
  );
}

