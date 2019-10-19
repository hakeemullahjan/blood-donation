import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

const TextArea = ({ placeholder, label, value, secureTextEntry, onChangeText, returnKeyType,  }) => {
    const { containerStyle, labelStyle, inputStyle, } = styles
    return (
        <View style={containerStyle}>
            <Text style={labelStyle} >{label}</Text>
            <TextInput style={inputStyle}
                placeholder={placeholder}
                value={value}
                secureTextEntry={secureTextEntry}
                autoCorrect={false}
                onChangeText={onChangeText}
                returnKeyType={returnKeyType}
                multiline={true}
                numberOfLines={4}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    containerStyle: {
        height: 80,
        flex: 1,
        flexDirection: 'row',
        // alignItems: 'center',
    },
    labelStyle: {
        flex: 1,
        fontSize: 18,
        paddingLeft: 20,
    },
    inputStyle: {
        color: '#000',
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2,
        // borderWidth:1,
    }
})
export { TextArea }