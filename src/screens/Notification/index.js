import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { Header, Card, CardSection, Button } from '../../components/common'
import axios from 'axios'
import api from '../../config/api'
import { Appbar, Drawer } from "react-native-paper";
import { DrawerActions } from 'react-navigation-drawer';
import firebase from 'react-native-firebase'

class Notification extends Component {



    componentDidMount() {
        // Create a RemoteMessage
        const message = new firebase.messaging.RemoteMessage()
            .setMessageId('unique id')
            .setTo('senderId@gcm.googleapis.com')
            .setData({
                key1: 'value1',
                key2: 'value2',
            });
        // Send the message
        firebase.messaging().sendMessage(message).then(res => {
            console.log('res', res)
        }).catch(err => {
            console.log('err', err)
        })
    }


    render() {
        return (
            <View>

                <Appbar.Header >
                    <Appbar.Action
                        icon="menu"
                        onPress={() =>
                            this.props.navigation.dispatch(DrawerActions.toggleDrawer())
                        }
                    />
                    <Appbar.Content title="Notifications" />
                </Appbar.Header>

            </View>
        )
    }
}

export default Notification