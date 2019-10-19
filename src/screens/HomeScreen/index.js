import React, { Component } from 'react';
import { View, Text, Button, SafeAreaView, StyleSheet } from 'react-native'
import { Header, Card, CardSection, Input } from '../../components/common'
import axios from 'axios'
import api from '../../config/api'


class HomeScreen extends Component {

    async componentDidMount() {
        await axios.get(`${api}/post/getall`)
            .then(response => {
                console.log('post response------->', response.data)
            }).catch(err => {
                console.log('post error--------->', err)
            })
    }

    render() {
        return (
            <View style={styles.constainerStyle}>
                <Header headerText='Feed' />
                <Card>
                    <CardSection>

                    </CardSection>
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    constainerStyle: {
        flex: 1
    }
})
export default HomeScreen