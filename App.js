import React from 'react';
import { Text, View, Image } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import { Images, variable } from './src/assets';
const { primary, gray } = variable;

class HomeScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>Home!</Text>
			</View>
		);
	}
}

class SettingsScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>Settings!</Text>
			</View>
		);
	}
}

const TabNavigator = createBottomTabNavigator({
	Home: {
        screen: HomeScreen,
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
        screen: SettingsScreen,
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
        screen: SettingsScreen,
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
		initialRouteName: 'Home',
		tabBarOptions: {
			activeTintColor: primary,
			inactiveTintColor: gray,
			showIcon: true
		},
	});

export default createAppContainer(TabNavigator);