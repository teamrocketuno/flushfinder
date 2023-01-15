import { View, Button, Text } from 'react-native';

export const MapScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Map Screen</Text>
      <Button
        title="View Bathroom"
        onPress={() => navigation.navigate('Bathroom')}
      />
      <Button
        title="Add Bathroom"
        onPress={() => navigation.navigate('AddBathroom')}
      />
    </View>
  );
}