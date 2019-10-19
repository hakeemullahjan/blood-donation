import { SafeAreaView, ScrollView, Dimensions } from 'react-native'
import { createAppContainer, createNavigator, createSwitchNavigator, } from 'react-navigation'
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer'
import * as Router from '../screens'


const AuthNavigator = createSwitchNavigator({
    Login: {
        screen: Router.Login
    },
    Signup: {
        screen: Router.Signup
    }
})


const AppNavigator = createDrawerNavigator({
    Home: {
        screen: Router.HomeScreen
    },
    'My Requests': {
        screen: Router.MyRequests
    },
    'Post Requirement': {
        screen: Router.PostRequirement
    },
    Notification: {
        screen: Router.Notification
    },
    Settings: {
        screen: Router.Settings
    }
}, {
    initialRouteName: 'Home',
    contentOptions: {
        activeTintColor: "#F50041"
    }
})

const MainNavigator = createSwitchNavigator({
    Auth: {
        screen: AuthNavigator
    },
    App: {
        screen: AppNavigator
    },

},
    {
        initialRouteName: 'Auth'
    })

export default createAppContainer(MainNavigator)