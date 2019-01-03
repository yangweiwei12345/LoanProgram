import React from 'react';
import { Text, View, Image } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import { Images, variable } from './src/assets';
const { primary, gray } = variable;
import { HomePage, ListPage, MyPage } from './src/pages';

const TabNavigator = createBottomTabNavigator({
    Home: HomePage,
    List: ListPage,
    My: MyPage,
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Home') {
                iconName = `home${focused ? '' : '_active'}`;
            } else if (routeName === 'List') {
                iconName = `list${focused ? '' : '_active'}`;
            } else if (routeName === 'My') {
                iconName = `my${focused ? '' : '_active'}`;
            }

            return <Image style={{width: 20, height: 20}} source={Images[iconName]} />;
      },
    }),
    initialRouteName: 'Home',
    tabBarOptions: {
        activeTintColor: primary,
        inactiveTintColor: gray,
        showIcon: true
    },
  });

export default createAppContainer(TabNavigator);