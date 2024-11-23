import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import MainTabNavigation from './src/navigation/MainTabNavigation';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <MainTabNavigation />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
