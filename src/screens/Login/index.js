import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView, AsyncStorage } from 'react-native'
import { Input, Card, CardSection, Button, Spinner } from '../../components/common'
import api from '../../config/api'
import axios from 'axios'


class Login extends Component {

    state = {
        email: "",
        password: ""
    }

    async _login() {
        const { email, password } = this.state
        console.log(email, password)

        await axios.post(`${api}/login`, {
            email: email,
            password: password
        }).then(response => {
            console.log('login response------------>', response.data)
            alert('User successfully Login')
            this.props.navigation.navigate('App')
        }).catch(err => {
            console.log('login error---------->', err.response.data.message)
            alert(err.response.data.message)
        })
    }



    render() {
        const { containerStyle, logoContainer, logo, loginFormContainer, createAccountContainer } = styles
        const { email, password } = this.state
        return (
            <KeyboardAvoidingView enabled behavior='padding' style={containerStyle} >
                <View style={logoContainer}>
                    <Image source={require('../../assets/images/logo7.png')} style={logo} />
                </View>
                <View style={loginFormContainer}>
                    <Card>
                        <CardSection>
                            <Input placeholder='user@gmail.com' label='Email' value={email} returnKeyType='next' onChangeText={text => this.setState({ email: text })} />
                        </CardSection>

                        <CardSection>
                            <Input placeholder='password' label='Password' returnKeyType='go' value={password} secureTextEntry onChangeText={text => this.setState({ password: text })} />
                        </CardSection>

                        <CardSection>
                            <Button onPress={this._login.bind(this)}>Log In</Button>
                        </CardSection>

                    </Card>
                </View>

                <View style={createAccountContainer}>
                    <Text>Don't have an account?</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ margin: 3 }} onPress={() => this.props.navigation.navigate('Signup')}>
                            <Text style={{ color: '#F50041', fontWeight: 'bold' }}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#fff'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
        margin: 15,
        // borderWidth:1,
        marginBottom: 0
    },
    logo: {
        width: 400,
        height: 120,
        resizeMode: 'stretch'
    },
    loginFormContainer: {
        // borderWidth:1,
        margin: 5,
        marginTop: 15,
        marginBottom: 15
    },
    createAccountContainer: {
        // paddingTop: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        flexDirection: 'column',
        // borderWidth: 1
    }
})

export default Login