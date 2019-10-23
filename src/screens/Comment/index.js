import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, CardSection } from '../../components/common'
import moment from 'moment'

class Comment extends Component {
    render() {
        console.log(this.props.navigation.getParam('post'))
        const post = this.props.navigation.getParam('post')
        return (
            <ScrollView style={{ flex: 1 }}>
                <Card>
                    <CardSection>
                        <View style={{ flex: 1, margin: 5, marginLeft: 15, marginRight: 15 }}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }} >
                                <Text style={{ fontWeight: 'bold' }}>{post.fullName}</Text>
                                <Text>{moment(post.createdAt).fromNow()}</Text>
                            </View>
                            <Text>Units required: {post.units}</Text>
                            <Text>Donation recieved: __</Text>
                            <Text>Still require: __</Text>
                            <Text>Blood Group: {post.bloodGroup}</Text>
                            <Text>Location: {post.city} {post.state} {post.country} </Text>
                            <Text>Urgency: {post.urgency}</Text>
                            <Text>Relation with patient: {post.relation}</Text>
                            <Text>Contact No: {post.contactNo}</Text>
                            <Text>Additional Instructions: {post.instructions}</Text>
                        </View>
                    </CardSection>
                </Card>






                <Card>
                    <Text>Volunteers</Text>
                    <CardSection>

                    </CardSection>
                </Card>


                <Card>
                    <Text>Comments</Text>
                    <CardSection>

                    </CardSection>
                </Card>






            </ScrollView>
        )
    }
}

export default Comment