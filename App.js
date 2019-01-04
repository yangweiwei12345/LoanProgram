import React from 'react';
import { Text, View, Image } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import { Images, variable } from './src/assets';
import Pages from './src/pages';
const { primary, gray } = variable;
const { HomePage, ListPage, MyPage } = Pages;

const TabNavigator = createBottomTabNavigator({
	Home: {
        screen: HomePage,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: "首页",
            tabBarIcon: ({ focused }) => {
                
                let { isFocused } = navigation;
                console.log(isFocused())
                return (
                    !isFocused()
                        ? <Image style={{ width: 22, height: 22 }} source={Images["home"]} />
                        : <Image style={{ width: 22, height: 22 }} source={Images["home_active"]} />
                )
            },
            tabBaronPress: () => {
                navigation.navigate('Home')
            }
        })
    },
	List: {
        screen: ListPage,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: "列表",
            tabBarIcon: ({ focused }) => {

                let { isFocused } = navigation;
                
                return (
                    !isFocused()
                        ? <Image style={{ width: 22, height: 22 }} source={Images["list"]} />
                        : <Image style={{ width: 22, height: 22 }} source={Images["list_active"]} />
                )
			},
        })
    },
	My: {
        screen: MyPage,
        navigationOptions:({ navigation }) => ({
            tabBarLabel: "我的",
            tabBarIcon: ({ focused }) => {

                let { isFocused } = navigation;
                
                return (
                    !isFocused()
                        ? <Image style={{ width: 22, height: 22 }} source={Images["my"]} />
                        : <Image style={{ width: 22, height: 22 }} source={Images["my_active"]} />
                )
			},
        })
    },
}, {
		initialRouteName: 'My',
		tabBarOptions: {
			activeTintColor: primary,
			inactiveTintColor: gray,
			showIcon: true
		},
	});

export default createAppContainer(TabNavigator);