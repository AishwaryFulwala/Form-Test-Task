import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import TabBar from './TabBar';
import TabHeader from './TabHeader';
import NewRecordScreen from '../screens/NewRecordScreen';
import SaveRecordScreen from '../screens/SaveRecordScreen';

const Tab = createBottomTabNavigator();
const renderTabBar = props => <TabBar {...props} />;
const renderHeader = props => <TabHeader {...props} />;

const MainTabNavigation = () => {
  return (
    <Tab.Navigator tabBar={renderTabBar} screenOptions={{header: renderHeader}}>
      <Tab.Screen name="NewRecord" component={NewRecordScreen} />
      <Tab.Screen name="SaveRecord" component={SaveRecordScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigation;
