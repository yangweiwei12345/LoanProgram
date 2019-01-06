import React from 'react';
import { Text, View, Image, Easing, Animated } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import { Images, variable } from './src/assets';
import Pages from './src/pages';
const { primary, gray } = variable;
const {
    HomePage,
    ListPage,
    MyPage,
    FeedBackPage,
    InvitationPage,
    SettingPage,
    LoginPage,
    accountLoginPage,
    forgetPasswordPage
} = Pages;

const stackConfig = {
    mode: 'modal',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),
};

const barConfig = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#fff',
        },
        headerTintColor: '#230E02',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    }
}

const HomeStack = createStackNavigator({
    Home: { screen: HomePage }
}, {
    ...stackConfig,
    ...barConfig
});

const ListStack = createStackNavigator({
    List: { screen: ListPage }
}, {
    ...stackConfig,
    ...barConfig
});

const MyStack = createStackNavigator({
    My: { screen: MyPage },    
    FeedBack: { screen: FeedBackPage },    
    Invitation: { screen: InvitationPage },    
    Setting: { screen: SettingPage },    
    Login: { screen: LoginPage },    
    accountLogin: { screen: accountLoginPage },  
    forgetPassword: { screen: forgetPasswordPage },  
}, {
    ...stackConfig,
    ...barConfig
});

const TabNavigator = createBottomTabNavigator({
	Home: {
        screen: HomeStack,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: "首页",
            tabBarIcon: ({ focused }) => {
                
                let { isFocused } = navigation;
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
        screen: ListStack,
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
        screen: MyStack,
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
    initialRouteName: "My",
    tabBarOptions: {
        activeTintColor: primary,
        inactiveTintColor: gray,
        showIcon: true
    },
});

export default createAppContainer(TabNavigator);