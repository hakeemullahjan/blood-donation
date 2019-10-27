import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import firebase from 'react-native-firebase'

class AuthLoadingScreen extends React.Component {
    constructor() {
        super();
        this._bootstrapAsync();
        // this.checkPermission();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('user');

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userToken ? 'MainScreen' : 'Auth', { user: userToken });
    };


    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        console.log("before fcmToken: ", fcmToken);
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                console.log("after fcmToken: ", fcmToken);
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
    }

    async requestPermission() {
        firebase.messaging().requestPermission()
            .then(() => {
                this.getToken();
            })
            .catch(error => {
                console.log('permission rejected');
            });
    }

    async checkPermission() {
        firebase.messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    console.log("Permission granted");
                    this.getToken();
                } else {
                    console.log("Request Permission");
                    this.requestPermission();
                }
            });
    }

    async componentDidMount() {
        this.checkPermission();
    }

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color='red' />
                <StatusBar barStyle="default" />
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default AuthLoadingScreen