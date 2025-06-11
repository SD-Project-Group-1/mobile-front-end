import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Homescreen() {
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'InstrumentSans-VariableFont_wdth,wght' }}>Testing the font! fill lol</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
