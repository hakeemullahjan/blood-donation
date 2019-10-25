import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, AsyncStorage, TouchableOpacity } from 'react-native'
import { Header, Card, CardSection, Button } from '../../components/common'
import axios from 'axios'
import api from '../../config/api'
import { Appbar, Drawer } from "react-native-paper";
import { DrawerActions } from 'react-navigation-drawer';
import moment from 'moment'



class MyRequests extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: null,
            user: null
        }
        this._getUser()
    }

    _getUser = async () => {
        const user = await AsyncStorage.getItem('user');

        console.log('user in getuser', JSON.parse(user))
        this.setState({ user: JSON.parse(user) })
        this._getMyPosts();
    }

    componentDidMount() {
        // this._getMyPosts();
    }


    async _getMyPosts() {
        const user = this.state.user
        const email = await user.email

        await axios.get(`${api}/post/getmyposts/${email}`)
            .then(response => {
                console.log('my post response------->', response.data)
                this.setState({ posts: response.data })
            }).catch(err => {
                console.log('post error--------->', err)
            })
    }


    render() {
        return (
            <View>
                <Appbar.Header>
                    <Appbar.Action
                        icon="menu"
                        onPress={() =>
                            this.props.navigation.dispatch(DrawerActions.toggleDrawer())
                        }
                    />
                    <Appbar.Content title="My Posts" />
                </Appbar.Header>


                <Card>
                    {!!this.state.posts && this.state.posts.map((item, key) => {
                        return (
                            <TouchableOpacity key={key} onPress={() => this.props.navigation.navigate('MyPostDetails', { post: item })} >
                                <CardSection>
                                    <View style={{ flex: 1, margin: 5, marginLeft: 15, marginRight: 15 }}>
                                        <Text>Required {item.units} units of {item.bloodGroup} </Text>
                                        <Text>at {item.hospital}</Text>
                                        <Text>Status: {item.status}</Text>
                                    </View>
                                </CardSection>
                            </TouchableOpacity>

                        )
                    })}
                </Card>



            </View>
        )
    }
}

export default MyRequests