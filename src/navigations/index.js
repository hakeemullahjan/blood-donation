import React from "react";
import { ScrollView, Text, Image, View, AsyncStorage } from "react-native";
import { Appbar, Drawer } from "react-native-paper";
import { SafeAreaView } from "react-navigation"; // ⚠ you need the package 'react-navigation'
import { createAppContainer, createSwitchNavigator, } from 'react-navigation'
import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack'
import * as Router from '../screens'



const AuthNavigator = createStackNavigator({
    Login: {
        screen: Router.Login,
        navigationOptions: {
            header: null
        }
    },
    Signup: {
        screen: Router.Signup,
        navigationOptions: {
            header: null
        }
    }
})


const CustomDrawerComponent = (props) => {
    const user = JSON.parse(props.navigation.state.params.user)
    // console.log('user in nav', JSON.parse(props.navigation.state.params.user))

    return (
        < ScrollView >
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}  >
                {
                    user && <View style={{ flex: 1, padding: 23 }}>
                        <Text style={{ fontSize: 23, color: "#F50041", fontWeight: "bold", fontStyle: "italic" }}>{user.firstName} {user.lastName}</Text>
                        <Text style={{ fontSize: 18, color: "#F50041", fontWeight: "bold" }}>{user.bloodGroup}</Text>
                        <Text style={{ color: "#F50041" }}>{user.email}</Text>
                    </View>
                }

                <Drawer.Item
                    icon='home'
                    label='Home'
                    active="true"
                    onPress={() => props.navigation.navigate("HomeScreen")}
                />
                <Drawer.Item
                    icon='inbox'
                    label="My Requests"
                    active="true"
                    onPress={() => props.navigation.navigate("MyRequests")}
                />
                <Drawer.Item
                    icon='send'
                    label="Post Requirement"
                    active="true"
                    onPress={() => props.navigation.navigate("PostRequirement")}
                />
                <Drawer.Item
                    icon='notifications'
                    label="Notification"
                    active="true"
                    onPress={() => props.navigation.navigate("Notification")}
                />
                <Drawer.Item
                    icon='settings'
                    label="Settings"
                    active="true"
                    onPress={() => props.navigation.navigate("Settings")}
                />
                <Drawer.Item
                    icon='help'
                    label="Help & feedback"
                    active="true"
                />
                <Drawer.Item
                    icon='close'
                    label="Log Out"
                    active="true"
                    onPress={() => {
                        AsyncStorage.clear();
                        props.navigation.navigate("Auth")
                    }}
                />
            </SafeAreaView>
        </ScrollView >
    );
}


const AppNavigator = createStackNavigator({
    Comment: {
        screen: Router.Comment,
        navigationOptions: {
            headerTitle: "Post Details",
            headerTintColor: "#fff",
            headerStyle: {
                backgroundColor: "#F50041"
            }
        }
    },
    MyPostDetails: {
        screen: Router.MyPostDetails,
        navigationOptions: {
            headerTitle: "My Post Details",
            headerTintColor: "#fff",
            headerStyle: {
                backgroundColor: "#F50041"
            }
        }
    },
    MainScreen: {
        screen: createDrawerNavigator(
            {
                HomeScreen: {
                    screen: Router.HomeScreen,
                },
                MyRequests: {
                    screen: Router.MyRequests
                },
                PostRequirement: {
                    screen: Router.PostRequirement
                },
                Notification: {
                    screen: Router.Notification
                },
                Settings: {
                    screen: Router.Settings
                }
            },
            {
                initialRouteName: "HomeScreen",
                contentComponent: CustomDrawerComponent
            }
        ),
        navigationOptions: {
            header: null
        }
    }

}, {
    initialRouteName: 'MainScreen',
})



// const AppNavigator = createDrawerNavigator(
//     {
//         HomeScreen: {
//             screen: Router.HomeScreen,
//         },
//         MyRequests: {
//             screen: Router.MyRequests
//         },
//         PostRequirement: {
//             screen: Router.PostRequirement
//         },
//         Notification: {
//             screen: Router.Notification
//         },
//         Settings: {
//             screen: Router.Settings
//         }
//     },
//     {
//         initialRouteName: "HomeScreen",
//         contentComponent: CustomDrawerComponent
//     }
// );




const MainNavigator = createSwitchNavigator({
    AuthLoading: {
        screen: Router.AuthLoading
    },
    Auth: {
        screen: AuthNavigator
    },
    App: {
        screen: AppNavigator
    },
},
    {
        initialRouteName: 'AuthLoading'
    })


export default createAppContainer(MainNavigator)
