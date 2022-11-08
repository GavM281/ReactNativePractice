import {FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";

import styles from './../styles';

function Home({navigation}) {
    const [newName, setNewName] = useState("");
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    // Get data from Mongo
    const fetchData = () => {
        // fetch("http://192.168.2.135:3000/")
        fetch("http://149.157.108.197:3000/")
            .then(res => res.json())
            .then(results => {
                console.log("Results: ", results)
                setData(results)
                setLoading(false)
            })
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // When the screen is focused (like loading from another screen), call function to refresh data
            fetchData();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        if(loading==true) {
            fetchData()
        }
    })



    const deleteUser = (_id) =>{
        console.log("delete user with id: ", _id);
        // fetch("http://192.168.2.135:3000/delete", {
        fetch("http://149.157.108.197:3000/delete", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: _id
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                fetchData()
            }).catch(err => {
            console.log("error",err)
        })
    }

    const updateUser = (_id) =>{
        console.log("Updating user");
        // fetch("http://192.168.2.135:3000/update", {
        fetch("http://149.157.108.197:3000/update", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: _id,
                name: newName
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                fetchData()
            }).catch(err => {
            console.log("error",err)
        })
    }


    // Component with username, id. Option to delete/update
    const renderList = ((item) => {
        return(
            <View style={styles.card}>
                <Text style={styles.name}>{item.name}</Text>

                <View style={{ flexDirection:'row' }}>
                    <TextInput
                        style={styles.input}
                        placeholder="Update Name"
                        onChangeText={text => setNewName(text)}
                        label='Name'
                    />

                    <TouchableOpacity style={styles.button} onPress={() => updateUser(item._id)} >
                        <Text style={{ color: 'white' }}>Update</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => deleteUser(item._id)} >
                    <Text style={{ color: 'white' }}>Delete</Text>
                </TouchableOpacity>
            </View>
        )
    })

    // Display
    return (
        <View style={styles.container}>
            <FlatList
                data={data}

                renderItem={({ item }) => {
                    return renderList(item)
                }}
            />

        </View>
    );
};

export default Home;