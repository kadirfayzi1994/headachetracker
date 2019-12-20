import React from "react";
import 'react-native-gesture-handler';
import _ from 'lodash'; //for warnings
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Dimensions, YellowBox } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LogoutScreen from './screens/LogoutScreen';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import CreateScreen from './screens/CreateScreen';
import EditScreen from './screens/EditScreen';
import ShareScreen from './screens/ShareScreen'

import SideBar from "./components/SideBar";


YellowBox.ignoreWarnings(['Setting a timer']);




const DrawerNavigator = createDrawerNavigator(
    {
        // Profile: {
        //     screen: ProfileScreen,
        //     navigationOptions: {
        //         title: "Profil",
        //         drawerIcon: ({ tintColor }) => <Feather name="user" size={16} color={tintColor} />
        //     }
        // },
        Share: {
            screen: ShareScreen,
            navigationOptions: {
                title: "Paylaş",
                drawerIcon: ({ tintColor }) => <Feather name="share" size={16} color={tintColor} />
            }
        },
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                title: "Kayıtlar",
                drawerIcon: ({ tintColor }) => <Feather name="list" size={16} color={tintColor} />
            }
        },
        SignOut: {
            screen: LogoutScreen,
            navigationOptions: {
                title: "Çıkış Yap",
                drawerIcon: ({ tintColor }) => <Feather name="log-out" size={16} color={tintColor} />
            }
        }
    },
    {
        contentComponent: props => <SideBar {...props} />,

        drawerWidth: Dimensions.get("window").width * 0.85,

        contentOptions: {
            activeBackgroundColor: "rgba(212,118,207, 0.2)",
            activeTintColor: "#53115B",
            itemsContainerStyle: {
                marginTop: 16,
                marginHorizontal: 8
            },
            itemStyle: {
                borderRadius: 4
            }
        }
    }
);


const AppStack = createStackNavigator(
    {
        Home: {
            screen: DrawerNavigator,
            navigationOptions: {
                header: null
            }
        },
        Details: DetailScreen,
        Create: CreateScreen,
        Edit: EditScreen,
    },
    {
        headerMode: 'float'
    }
);


const AuthStack = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen
});

const App = createSwitchNavigator({
    Loading: LoadingScreen,
    App: AppStack,
    Auth: AuthStack,
},
    {
        initialRouteName: "Loading"
    }
)

export default createAppContainer(App);
