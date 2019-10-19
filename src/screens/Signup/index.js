import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Image, ScrollView, Picker, ActivityIndicator } from 'react-native';
import { Input, Card, CardSection, Button, Spinner } from '../../components/common'
import api from '../../config/api'
import axios from 'axios'

class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            bloodGroup: "",
            password: "",
        }
    }

    _signup() {
        const { firstName, lastName, email, password, bloodGroup } = this.state
        // console.log(firstName, lastName, email, password, bloodGroup)
        axios.post(`${api}/signup`, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            bloodGroup: bloodGroup,
            password: password
        }).then(response => {
            console.log('signup response-------', response.data)
            alert('Account Successfully Created!')
        }).catch(err => {
            console.log('signup error----------->', err)
        })

    }

    render() {
        const { containerStyle, createFormContainer, logoContainer, logo, gotoSigninStyle } = styles
        const { firstName, lastName, email, password, bloodGroup } = this.state
        return (
            <ScrollView style={containerStyle}>
                <KeyboardAvoidingView enabled behavior='padding' >

                    <View style={logoContainer}>
                        <Image source={require('../../assets/images/logo7.png')} style={logo} />
                    </View>

                    <View style={createFormContainer}>
                        <Card>

                            <CardSection>
                                <Input placeholder='John' value={firstName} label='First Name' returnKeyType='next' onChangeText={text => this.setState({ firstName: text })} />
                            </CardSection>

                            <CardSection>
                                <Input placeholder='Cena' value={lastName} label='Last Name' returnKeyType='next' onChangeText={text => this.setState({ lastName: text })} />
                            </CardSection>


                            <CardSection>
                                <Input placeholder='user@sectorlink.com' value={email} label='Email' returnKeyType='next' onChangeText={text => this.setState({ email: text })} />
                            </CardSection>



                            <CardSection>
                                <View style={{
                                    height: 40, flex: 1, flexDirection: 'row', alignItems: 'center',
                                }}>
                                    <Picker
                                        selectedValue={bloodGroup}
                                        style={{
                                            color: '#000',
                                            paddingLeft: 5,
                                            paddingRight: 5,
                                            fontSize: 18,
                                            height: 50,
                                            flex: 1,
                                        }}

                                        onValueChange={(itemValue, itemIndex) => this.setState({ bloodGroup: itemValue })}
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
                                <Input placeholder='password' value={password} label='Password' returnKeyType='next' onChangeText={text => this.setState({ password: text })} secureTextEntry />
                            </CardSection>


                            <CardSection>
                                <Button onPress={this._signup.bind(this)} >Sign Up</Button>
                            </CardSection>
                        </Card>
                    </View>


                    <View style={gotoSigninStyle}>
                        <Text>Already have an account? </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}  >
                            <Text style={{ color: '#F50041', fontWeight: 'bold' }}>Sign In</Text>
                        </TouchableOpacity>
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
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
        margin: 15,
        // borderWidth:1,
    },
    logo: {
        width: 270,
        height: 120,
        resizeMode: 'stretch'
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
    }
})

export default Signup