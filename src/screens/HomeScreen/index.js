import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { Header, Card, CardSection, Button } from '../../components/common'
import axios from 'axios'
import api from '../../config/api'
import { Appbar, Drawer } from "react-native-paper";
import { DrawerActions } from 'react-navigation-drawer';


class HomeScreen extends Component {
    state = {
        posts: null,
        user: this.props.navigation.getParam('user'),
    }


    async componentDidMount() {
        await axios.get(`${api}/post/getall/`)
            .then(response => {
                // console.log('post response------->', response.data)
                this.setState({ posts: response.data })
            }).catch(err => {
                console.log('post error--------->', err)
            })
    }

    render() {
        console.log('POSTS---------->', this.state.posts)
        console.log('USER---------->', this.state.user)
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
                                    <View style={{ alignSelf: 'center' }}>
                                        <Text>{item.hospital}</Text>
                                        <Text>Urgency:{item.urgency}</Text>
                                        <Text>Contacy at:{item.contactNo}</Text>
                                        <Text>Additional Instructions:{item.contactNo}</Text>
                                        <Text>Volunteer uptill now:{item.units}</Text>
                                        <View style={{ flexDirection: 'row' }}><Button>Volunteer</Button><Button>Comment</Button></View>
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