import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';

import {COLORS, tabData} from '../utils/constant';
import {scaledSize} from '../utils/helper';

const TabBar = ({state, navigation}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const color = isFocused ? COLORS.app3480EB : COLORS.app3A3A3A;
        const icon = `${tabData[route.name].icon}${
          isFocused ? '' : '-outline'
        }`;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tabItem}>
            <IIcon name={icon} size={scaledSize(22)} color={color} />
            <Text style={{...styles.tabName, color: color}}>
              {tabData[route.name].name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItem: {
    flex: 1,
    marginTop: scaledSize(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabName: {
    fontSize: scaledSize(15),
    marginTop: scaledSize(5),
  },
});

export default TabBar;
