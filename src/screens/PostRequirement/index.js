import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Image, ScrollView, Picker, ActivityIndicator, AsyncStorage } from 'react-native';
import { Header, Card, CardSection, Input, Button, TextArea } from '../../components/common'
import axios from 'axios'
import api from './../../config/api'
import { Appbar, Drawer } from "react-native-paper";
import { DrawerActions } from 'react-navigation-drawer';
import Toast, { DURATION } from 'react-native-easy-toast'
import { Dropdown } from 'react-native-material-dropdown';


class PostRequirement extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bloodGroup: "",
            units: '',
            urgency: "",
            country: "",
            state: "",
            city: "",
            hospital: "",
            contactNo: "",
            instructions: "",
            relation: "",
            user: null
        }
        this._getUser();

    }

    async _getUser() {
        const user = await AsyncStorage.getItem('user');
        this.setState({ user: JSON.parse(user) })
    }

    _post() {
        const { bloodGroup,
            units,
            urgency,
            country,
            state,
            city,
            hospital,
            contactNo,
            instructions,
            relation, user } = this.state

        if (units.length === 0 ||
            urgency.length === 0 ||
            country.length === 0 ||
            state.length === 0 ||
            city.length === 0 ||
            hospital.length === 0 ||
            contactNo.length === 0 ||
            instructions.length === 0 ||
            relation.length === 0) {
            this.refs.toast.show('The input can\'t be empty')
        } else {
            axios.post(`${api}/post/bloodrequirement`, {
                bloodGroup,
                units,
                urgency,
                country,
                state,
                city,
                hospital,
                contactNo,
                instructions,
                relation,
                email: user.email,
                fullName: user.firstName + ' ' + user.lastName,
                createdAt: Date.now(),
                required: units
            }).then(response => {
                console.log('signup response-------', response.data)
                alert('Blood request successfully posted')
                this.refs.toast.show('Blood request successfully posted')
                this.props.navigation.navigate('HomeScreen')
            }).catch(err => {
                console.log('post error----------->', err)
            })
        }
    }


    render() {
        let data = [{
            value: 'A Positive',
        }, {
            value: 'B Positive',
        }, {
            value: 'O Nagative',
        },
        {
            value: 'A Negative',
        },
        {
            value: 'B Nagative',
        }];

        const { containerStyle, createFormContainer, drawerStyle, drawerViewStyle } = styles
        const { bloodGroup, units, urgency, country, state, city, hospital, contactNo, instructions, relation } = this.state
        return (
            <ScrollView style={containerStyle}>
                <KeyboardAvoidingView enabled behavior='padding' >

                    <Appbar.Header >
                        <Appbar.Action
                            icon="menu"
                            onPress={() =>
                                this.props.navigation.dispatch(DrawerActions.toggleDrawer())
                            }
                        />
                        <Appbar.Content title="" />
                    </Appbar.Header>

                    <View style={createFormContainer}>
                        <Card>



                            <CardSection>
                                <View style={{ flex: 1, paddingHorizontal: 20 }}>
                                    <Dropdown
                                        label='Blood Group'
                                        data={data}
                                        baseColor='#000'
                                        fontSize={18}
                                        value={bloodGroup}
                                        onChangeText={value => this.setState({ bloodGroup: value })}
                                    />
                                </View>
                            </CardSection>

                            <CardSection>
                                <Input placeholder='e.g 3' label='Units' value={units} returnKeyType='next' onChangeText={text => this.setState({ units: text })} />
                            </CardSection>


                            <CardSection>
                                <View style={{ flex: 1, paddingHorizontal: 20 }}>
                                    <Dropdown
                                        label='Urgency'
                                        data={[{ value: 'Urgent' }, { value: 'Within 5 hours' }, { value: 'Within 12 hours' }, { value: 'Within 24 hours' }, { value: 'Within 2 days' }, { value: 'Within Week' }]}
                                        baseColor='#000'
                                        fontSize={18}
                                        value={urgency}
                                        onChangeText={value => this.setState({ urgency: value })}
                                    />
                                </View>
                            </CardSection>


                            <CardSection>
                                <View style={{ flex: 1, paddingHorizontal: 20 }}>
                                    <Dropdown
                                        label='Country'
                                        data={[{ value: 'Pakistan' }]}
                                        baseColor='#000'
                                        fontSize={18}
                                        value={country}
                                        onChangeText={value => this.setState({ country: value })}
                                    />
                                </View>
                            </CardSection>


                            <CardSection>
                                <View style={{ flex: 1, paddingHorizontal: 20 }}>
                                    <Dropdown
                                        label='State'
                                        data={[{ value: 'Sindh' }]}
                                        baseColor='#000'
                                        fontSize={18}
                                        value={state}
                                        onChangeText={value => this.setState({ state: value })}
                                    />
                                </View>
                            </CardSection>


                            <CardSection>
                                <View style={{ flex: 1, paddingHorizontal: 20 }}>
                                    <Dropdown
                                        label='City'
                                        data={[{ value: 'Karachi' }]}
                                        baseColor='#000'
                                        fontSize={18}
                                        value={city}
                                        onChangeText={value => this.setState({ city: value })}
                                    />
                                </View>
                            </CardSection>





                            <CardSection>
                                <View style={{ flex: 1, paddingHorizontal: 20 }}>
                                    <Dropdown
                                        label='Hospital'
                                        data={[{ value: 'Indus Hospital' }, { value: 'Ziauddin Hospital' }, { value: 'Agha Khan Hospital' }, { value: 'Liaquat National Hospital' }, { value: 'OMI' }, { value: 'Jinnah Hospital' }]}
                                        baseColor='#000'
                                        fontSize={18}
                                        value={hospital}
                                        onChangeText={value => this.setState({ hospital: value })}
                                    />
                                </View>
                            </CardSection>



                            <CardSection>
                                <View style={{ flex: 1, paddingHorizontal: 20 }}>
                                    <Dropdown
                                        label='Relation'
                                        data={[{ value: 'Father' }, { value: 'Mother' }, { value: 'Son' }, { value: 'Daughter' }, { value: 'Uncle' }, { value: 'Nephew' }, { value: 'Niece' }, { value: 'Friend' }]}
                                        baseColor='#000'
                                        fontSize={18}
                                        value={relation}
                                        onChangeText={value => this.setState({ relation: value })}
                                    />
                                </View>
                            </CardSection>





                            <CardSection>
                                <Input placeholder='03XXXXXXXXX' value={contactNo} label='Contact no.' returnKeyType='next' onChangeText={text => this.setState({ contactNo: text })} />
                            </CardSection>

                            <CardSection>
                                <TextArea placeholder='info' value={instructions} label='Addional Instructions' onChangeText={text => this.setState({ instructions: text })} />
                            </CardSection>

                            <CardSection>
                                <Button onPress={this._post.bind(this)} >Post</Button>
                            </CardSection>
                        </Card>
                    </View>

                    <Toast ref='toast' position='top' />
                </KeyboardAvoidingView>
            </ScrollView >
        )
    }
}


const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#fff',
    },
    createFormContainer: {
        margin: 5,
        // flexGrow: 2,
        // borderWidth:1,
        marginTop: 15,
        marginBottom: 15
    },
    gotoSigninStyle: {
        // paddingTop: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        flexDirection: 'row',
        // borderWidth: 1
    },
    drawerViewStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    drawerStyle: {
        color: '#000',
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 18,
        height: 50,
        flex: 1,
    }
})


export default PostRequirement