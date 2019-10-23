import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, AsyncStorage } from 'react-native'
import { Header, Card, CardSection, Button } from '../../components/common'
import axios from 'axios'
import api from '../../config/api'
import { Appbar, Drawer } from "react-native-paper";
import { DrawerActions } from 'react-navigation-drawer';
import moment from 'moment'

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: null,
            user: null,
        }
        this._getUser()
    }

    _getUser = async () => {
        const user = await AsyncStorage.getItem('user');

        console.log('user in getuser', JSON.parse(user))
        this.setState({ user: JSON.parse(user) })
    }


    componentDidMount() {
        this._getPosts();
    }

    async _getPosts() {
        await axios.get(`${api}/post/getall/`)
            .then(response => {
                // console.log('post response------->', response.data)
                this.setState({ posts: response.data })
            }).catch(err => {
                console.log('post error--------->', err)
            })
    }


    render() {
        return (
            <ScrollView style={styles.constainerStyle}>
                <Appbar.Header >
                    <Appbar.Action
                        icon="menu"
                        onPress={() =>
                            this.props.navigation.dispatch(DrawerActions.toggleDrawer())
                        }
                    />
                    <Appbar.Content title="Feed" />
                </Appbar.Header>

                <Card>
                    {!!this.state.posts && this.state.posts.map((item, key) => {
                        return (
                            <View key={key} >
                                <CardSection>
                                    <View style={{ flex: 1, margin: 5, marginLeft: 15, marginRight: 15 }}>
                                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }} >
                                            <Text style={{ fontWeight: 'bold' }}>{item.fullName}</Text>
                                            <Text>{moment(item.createdAt).fromNow()}</Text>
                                        </View>
                                        <Text>{item.units} units of {item.bloodGroup} blood required</Text>
                                        <Text>At {item.hospital} for my {item.relation}</Text>
                                        <Text>Urgency:{item.urgency}</Text>
                                        <Text>Contacy at:{item.contactNo}</Text>
                                        <Text>Additional Instructions:{item.contactNo}</Text>
                                        <Text>Volunteer uptill now:__</Text>
                                        <Text>Current Requirement:__</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Button>Volunteer</Button>
                                            <Button onPress={() => this.props.navigation.navigate('Comment', { post: item })}>Comment</Button>
                                        </View>
                                    </View>
                                </CardSection>
                            </View>
                        )
                    })}
                </Card>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    constainerStyle: {
        flex: 1
    }
})


export default HomeScreen