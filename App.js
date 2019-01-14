import React from 'react';
import { Text, View, Image, Easing, Animated } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import { Images, variable } from './src/assets';
import Pages from './src/pages';
const { primary, gray } = variable;
const {
    HomePage,
    ListPage,
    ListDetailPage,
    MyPage,
    FeedBackPage,
    InvitationPage,
    SettingPage,
    LoginPage,
    accountLoginPage,
    forgetPasswordPage,
    createAccountPage
} = Pages;

const stackConfig = {
    mode: 'modal',
    headerBackTitleVisible: false,
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

        // const height = layout.initHeight;
        const width = layout.initWidth;
        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [width, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateX }] };
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

const HomeStack = createStackNavigator(
    {
        HomePage: { screen: HomePage }
    },
    {
        headerMode: 'none'
    }
);

const ListStack = createStackNavigator(
    {
        ListPage: { 
            screen: ListPage
        }
    },
    {
        headerMode: 'none'
    });

const MyStack = createStackNavigator(
    {
        MyPage: {
            screen: MyPage
        }
    }, 
    {
        headerMode: 'none'
    }
);

const TabNavigator = createBottomTabNavigator({
	Home: {
        screen: HomeStack,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '首页',
            tabBarIcon: ({ focused }) => {
                
                let { isFocused } = navigation;
                return (
                    !isFocused()
                        ? <Image style={{ width: 22, height: 22 }} source={Images["home"]} />
                        : <Image style={{ width: 22, height: 22 }} source={Images["home_active"]} />
                )
            }
        })
    },
	List: {
        screen: ListStack,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '列表',
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
            tabBarLabel: '我的',
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
    initialRouteName: "Home",
    tabBarOptions: {
        activeTintColor: primary,
        inactiveTintColor: gray,
        showIcon: true
    },
});

TabNavigator.navigationOptions = ({ navigation }) => {
    const {
        routes,
        index
    } = navigation.state;
    const navigationOptions = {};
  
    if (routes[index].routeName === 'Home') {
        navigationOptions.title = '贷款超市'; 
    } else if (routes[index].routeName === 'List') {
        navigationOptions.title = '列表'; 
    } else if (routes[index].routeName === 'My') {
        navigationOptions.title = '我的';
    }
    
    return navigationOptions;
}

const RootStack = createStackNavigator({
        Tabs: {
            screen: TabNavigator
        },
        ListDetail: { screen: ListDetailPage },
        FeedBack: { screen: FeedBackPage },    
        Invitation: { screen: InvitationPage },    
        Setting: { screen: SettingPage },    
        Login: { screen: LoginPage },    
        accountLogin: { screen: accountLoginPage },  
        forgetPassword: { screen: forgetPasswordPage },  
        createAccount: { screen: createAccountPage },  
    }, {
        ...stackConfig,
        ...barConfig
});

export default createAppContainer(RootStack);