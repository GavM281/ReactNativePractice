// import * as React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useState} from "react";

import styles from './../styles';

function Create({navigation}) {
    const [name, setName] = useState("");

    // Create User
    const submitData = () =>{
        console.log("Submitting data");
        fetch("http://192.168.2.135:3000/createUser", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                navigation.navigate("Home")
            }).catch(err => {
            console.log("error",err)
        })
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.card}>
                <Text style={styles.header}>Create User</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={text => setName(text)}
                    placeholder="Enter Name"
                    label='Name'
                />

                <TouchableOpacity style={styles.button} onPress={() => submitData()} title="Save" >
                    <Text style={{ color: 'white' }}>Save</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

export default Create;