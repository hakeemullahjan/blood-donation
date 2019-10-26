import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { Card, CardSection } from '../../components/common'
import moment from 'moment'
import api from '../../config/api'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from 'axios'
import Toast, { DURATION } from 'react-native-easy-toast'



class MyPostDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {

            post: this.props.navigation.getParam('post'),
            user: null
        }
        this._getUser()
    }

    _getUser = async () => {
        const user = await AsyncStorage.getItem('user');

        console.log('user in getuser', JSON.parse(user))
        this.setState({ user: JSON.parse(user) })
    }

    _comment() {
        const { post, comment, user } = this.state
        const postId = post._id
        const volunteerId =
            axios.post(`${api}/post/comment/${postId}`, {
                comment: comment,
                createdAt: Date.now(),
                fullName: user.firstName + ' ' + user.lastName,
                email: user.email
            }).then(response => {
                console.log('post response------>', response.data)
                this.refs.toast.show(response.data.message)
                this.setState({ comment: "" })
            }).catch(err => {
                console.log('comment error------>', err)
                this.refs.toast.show(err)
            })
    }

    _donatedButtonPress(volunteer) {
        const { user, post } = this.state
        const postId = post._id
        const volunteerId = volunteer._id

        console.log(postId, volunteerId)
        axios.post(`${api}/post/donated/${postId}/${volunteerId}`)
            .then(response => {
                console.log('donated response------> ', response.data)
                this.refs.toast.show(response.data.message)
            }).catch(err => {
                console.log('donated error', err)
            })
    }
    _notDonatedButtonPress(volunteer) {
        const { user, post } = this.state
        const postId = post._id
        const volunteerId = volunteer._id

        console.log(postId, volunteerId)
        axios.post(`${api}/post/notdonated/${postId}/${volunteerId}`)
            .then(response => {
                console.log('donated response------> ', response.data)
                this.refs.toast.show(response.data.message)
            }).catch(err => {
                console.log('donated error', err)
            })
    }





    render() {
        // console.log(this.props.navigation.getParam('post'))
        const { post, comment } = this.state
        return (
            <View style={{ flex: 1 }}>


                <ScrollView >

                    <Card>
                        <CardSection>
                            <View style={{ flex: 1, margin: 5, marginLeft: 15, marginRight: 15 }}>
                                <Text style={{ marginLeft: 'auto', margin: 5 }} >Tick Button</Text>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }} >
                                    <Text style={{ fontWeight: 'bold' }}>{post.fullName}</Text>
                                    <Text>{moment(post.createdAt).fromNow()}</Text>
                                </View>
                                <Text>Units required: {post.units}</Text>
                                <Text>Donation recieved: {post.recieved}</Text>
                                <Text>Still require: {post.required}</Text>
                                <Text>Blood Group: {post.bloodGroup}</Text>
                                <Text>Location: {post.city} {post.state} {post.country} </Text>
                                <Text>Hospital: {post.hospital}</Text>
                                <Text>Urgency: {post.urgency}</Text>
                                <Text>Relation with patient: {post.relation}</Text>
                                <Text>Contact No: {post.contactNo}</Text>
                                <Text>Additional Instructions: {post.instructions}</Text>
                            </View>
                        </CardSection>
                    </Card>




                    <Text>{'\n'}</Text>

                    <CardSection>
                        <Text style={{ paddingLeft: 15, fontWeight: 'bold' }}>Volunteers</Text>
                    </CardSection>
                    <Card>

                        {post.volunteers && post.volunteers.map((item, key) => {
                            let donatedStyle, notDonatedStyle
                            if (item.status === 'Not Donated') {
                                notDonatedStyle = { color: '#fff', backgroundColor: "#F50041", padding: 7, borderRadius: 4, borderColor: '#F50041', borderWidth: 1 }
                                donatedStyle = { backgroundColor: '#fff', color: "#F50041", padding: 7, borderRadius: 4, borderColor: '#F50041', borderWidth: 1 }
                            } else {
                                notDonatedStyle = { backgroundColor: '#fff', color: "#F50041", padding: 7, borderRadius: 4, borderColor: '#F50041', borderWidth: 1 }
                                donatedStyle = { color: '#fff', backgroundColor: "#F50041", padding: 7, borderRadius: 4, borderColor: '#F50041', borderWidth: 1 }
                            }
                            return (
                                <View key={key}>
                                    <CardSection>
                                        <View style={{ flex: 1, margin: 5, marginLeft: 15, marginRight: 15 }}>
                                            <Text>{item.fullName}</Text>
                                            <Text>{item.bloodGroup}</Text>
                                            <Text>Exchange Donation</Text>
                                            {/* <Text>{item.status}</Text> */}
                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity onPress={this._donatedButtonPress.bind(this, item)} style={{ margin: 5 }}><Text style={donatedStyle} >Donated</Text></TouchableOpacity>
                                                <TouchableOpacity onPress={this._notDonatedButtonPress.bind(this, item)} style={{ margin: 5 }}><Text style={notDonatedStyle}>Not Donated</Text></TouchableOpacity>
                                            </View>

                                        </View>
                                    </CardSection>
                                </View>
                            )
                        })}

                    </Card>


                    <Text>{'\n'}</Text>




                    <CardSection>
                        <Text style={{ paddingLeft: 15, fontWeight: 'bold' }}>Comments</Text>
                    </CardSection>
                    <Card>


                        {post.comments && post.comments.map((item, key) => {
                            return (
                                <View key={key}>
                                    <CardSection>
                                        <View style={{ flex: 1, margin: 5, marginLeft: 15, marginRight: 15 }}>
                                            <Text>{item.fullName}</Text>
                                            <Text>{item.comment}</Text>
                                        </View>
                                    </CardSection>
                                </View>
                            )
                        })}


                        <CardSection>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#F50041', borderRadius: 10 }}>
                                <TextInput placeholder='Comment' value={comment} onChangeText={text => this.setState({ comment: text })} style={{ flex: 1 }} />
                                <TouchableOpacity onPress={this._comment.bind(this)}>
                                    <MCIcon name={'send'} color={'#F50041'} size={33} style={{ margin: 5 }} />
                                </TouchableOpacity>
                            </View>
                        </CardSection>
                    </Card>








                </ScrollView>
                <Toast ref='toast' position='top' />

            </View>
        )
    }
}

const styles = StyleSheet.create({

})

export default MyPostDetails