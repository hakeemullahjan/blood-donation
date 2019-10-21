import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Image, ScrollView, Picker, ActivityIndicator } from 'react-native';
import { Header, Card, CardSection, Input, Button, TextArea } from '../../components/common'
import axios from 'axios'
import api from './../../config/api'
import { Appbar, Drawer } from "react-native-paper";
import { DrawerActions } from 'react-navigation-drawer';


class PostRequirement extends Component {

    state = {
        bloodGroup: "",
        units: 0,
        urgency: "",
        country: "",
        state: "",
        city: "",
        hospital: "",
        contactNo: "",
        instructions: ""
    }

    _post() {
        const { bloodGroup, units, urgency, country, state, city, hospital, contactNo, instructions } = this.state

        axios.post(`${api}/post/bloodrequirement`, {
            bloodGroup,
            units,
            urgency,
            country,
            state,
            city,
            hospital,
            contactNo,
            instructions

        }).then(response => {
            console.log('signup response-------', response.data)
            alert('Account Successfully Created!')
        }).catch(err => {
            console.log('signup error----------->', err)
        })
    }

    render() {
        const { containerStyle, createFormContainer, drawerStyle, drawerViewStyle } = styles
        const { bloodGroup, units, urgency, country, state, city, hospital, contactNo, instructions } = this.state
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
                                <View style={drawerViewStyle}>
                                    <Picker
                                        selectedValue={bloodGroup}
                                        style={drawerStyle}

                                    //onValueChange={(itemValue, itemIndex) => this.setState({ bloodGroup: itemValue })}
                                    >
                                        <Picker.Item label="Blood Group" value="" />
                                        <Picker.Item label="A Positive" value="A Positive" />
                                        <Picker.Item label='B Positive' value='B Positive' />
                                        <Picker.Item label='O Nagative' value='O Nagative' />
                                        <Picker.Item label='A Negative' value='A Negative' />
                                        <Picker.Item label='B Nagative' value='B Nagative' />
                                        <Picker.Item label='O Negative' value='O Negative' />
                                    </Picker>
                                </View>
                            </CardSection>

                            <CardSection>
                                <Input placeholder='e.g. 3' label='Units' returnKeyType='next' />
                            </CardSection>

                            <CardSection>
                                <View style={
                                    drawerViewStyle
                                }>
                                    <Picker
                                        selectedValue={urgency}
                                        style={
                                            drawerStyle
                                        }
                                    //onValueChange={(itemValue, itemIndex) => this.setState({ bloodGroup: itemValue })}
                                    >
                                        <Picker.Item label="Urgency" value="" />
                                        <Picker.Item label="Urgent" value="Urgent" />
                                        <Picker.Item label='Within 5 hours' value='Within 5 hours' />
                                        <Picker.Item label='Within 12 hours' value='Within 12 hours' />
                                        <Picker.Item label='Within 24 hours' value='Within 24 hours' />
                                        <Picker.Item label='Within 2 days' value='Within 2 days' />
                                        <Picker.Item label='Within Week' value='Within Week' />
                                    </Picker>
                                </View>
                            </CardSection>


                            <CardSection>
                                <View style={drawerViewStyle}>
                                    <Picker
                                        selectedValue={state}
                                        style={drawerStyle}
                                    //onValueChange={(itemValue, itemIndex) => this.setState({ bloodGroup: itemValue })}
                                    >
                                        <Picker.Item label='State' value="" />
                                        <Picker.Item label="Pakistan" value="Pakistan" />
                                        <Picker.Item label='India' value='India' />
                                        <Picker.Item label='Bangladesh' value='Bangladesh' />
                                    </Picker>
                                </View>
                            </CardSection>

                            <CardSection>
                                <View style={drawerViewStyle}>
                                    <Picker
                                        selectedValue={city}
                                        style={drawerStyle}
                                    //onValueChange={(itemValue, itemIndex) => this.setState({ bloodGroup: itemValue })}
                                    >
                                        <Picker.Item label="City" value="" />
                                        <Picker.Item label="Pakistan" value="Pakistan" />
                                        <Picker.Item label='India' value='India' />
                                        <Picker.Item label='Bangladesh' value='Bangladesh' />
                                    </Picker>
                                </View>
                            </CardSection>

                            <CardSection>
                                <View style={drawerViewStyle}>
                                    <Picker
                                        selectedValue={hospital}
                                        style={drawerStyle}
                                    //onValueChange={(itemValue, itemIndex) => this.setState({ bloodGroup: itemValue })}
                                    >
                                        <Picker.Item label="Hospital" value="" />
                                        <Picker.Item label="Pakistan" value="Pakistan" />
                                        <Picker.Item label='India' value='India' />
                                        <Picker.Item label='Bangladesh' value='Bangladesh' />
                                    </Picker>
                                </View>
                            </CardSection>

                            <CardSection>
                                <View style={drawerViewStyle}>
                                    <Picker
                                        selectedValue={country}
                                        style={drawerStyle}
                                    //onValueChange={(itemValue, itemIndex) => this.setState({ bloodGroup: itemValue })}
                                    >
                                        <Picker.Item label="Country" value="" />
                                        <Picker.Item label="Pakistan" value="Pakistan" />
                                        <Picker.Item label='India' value='India' />
                                        <Picker.Item label='Bangladesh' value='Bangladesh' />
                                    </Picker>
                                </View>
                            </CardSection>

                            <CardSection>
                                <View style={drawerViewStyle}>
                                    <Picker
                                        // selectedValue={}
                                        style={drawerStyle}
                                    //onValueChange={(itemValue, itemIndex) => this.setState({ bloodGroup: itemValue })}
                                    >
                                        <Picker.Item label="Relation" value="" />
                                        <Picker.Item label="Pakistan" value="Pakistan" />
                                        <Picker.Item label='India' value='India' />
                                        <Picker.Item label='Bangladesh' value='Bangladesh' />
                                    </Picker>
                                </View>
                            </CardSection>

                            <CardSection>
                                <Input placeholder='03XXXXXXXXX' value={contactNo} label='Contact no.' returnKeyType='next' />
                            </CardSection>

                            <CardSection>
                                <TextArea placeholder='info' value={instructions} label='Addional Instructions' />
                            </CardSection>

                            <CardSection>
                                <Button onPress={this._post.bind(this)} >Post</Button>
                            </CardSection>
                        </Card>
                    </View>


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