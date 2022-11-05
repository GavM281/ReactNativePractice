import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList,StyleSheet, Text, View, Button, TouchableOpacity, TextInput, List } from 'react-native';

let App;
export default App = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState();
  // const [isLoading, setLoading] = useState(true);
  // const [data, setData] = useState([]);

  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  // Get data from Mongo
  const fetchData = () => {
    fetch("http://192.168.1.19:3000/")
        .then(res => res.json())
        .then(results => {
          console.log("Results: ", results)
          setData(results)
          setLoading(false)
        })
  }

  // Component with user name, id. Option to delete/update
  const renderList = ((item) => {
    return(
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>

          <Text>ID: {item._id}</Text>

          {/*<View>*/}
          <TextInput
              style={styles.input}
              placeholder="Update Name"
              onChangeText={text => setNewName(text)}
              label='Name'
              // value={text}
          />

          <Button onPress={() => updateUser(item._id) } title="Update" />

          <Button style={{marginTop: 100}} onPress={() => deleteUser(item._id)} title="Delete" />
          {/*</View>*/}
        </View>
    )
  })

  const deleteUser = (_id) =>{
    console.log("delete user with id: ", _id);
    fetch("http://192.168.1.19:3000/delete", {
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

  useEffect(() => {
    if(loading==true) {
      fetchData()
    }
  })

  // Create User
  const submitData = () =>{
    console.log("Submitting data");
    fetch("http://192.168.1.19:3000/createUser", {
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
          fetchData()
        }).catch(err => {
      console.log("error",err)
    })
  }

  const updateUser = (_id) =>{
    console.log("Updating user");
    fetch("http://192.168.1.19:3000/update", {
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

  // Display
  return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.header}>Create User</Text>
          <TextInput
              style={styles.input}
              onChangeText={text => setName(text)}
              placeholder="New User Name"
              label='Name'
              // value={text}
          />
          <Button
              onPress={() => submitData()} title="Save"
          />
        </View>


        {/*<Text style={{ fontSize: 25, padding: 30, fontWeight: "Bold" }}>Hello World</Text>*/}

        {/*<TouchableOpacity style={styles.button} onPress={() => {setCount(count + 1)}} >*/}
        {/*    <Text style={{ color: 'white' }}>Increase</Text>*/}
        {/*</TouchableOpacity>*/}
        {/*<TouchableOpacity style={styles.button} onPress={() => {setCount(count - 1)}} >*/}
        {/*    <Text style={{ color: 'white' }}>Decrease</Text>*/}
        {/*</TouchableOpacity>*/}
        {/*<Text>Current Count: {count} </Text>*/}
        {/*<Text>{text}</Text>*/}


        <Text style={styles.header}>Users</Text>
        {/*{loading ? <ActivityIndicator/> : (*/}
        <FlatList style={styles.userList}
                  data={data}

                  renderItem={({ item }) => {
                    return renderList(item)
                  }}
            // keyExtractor={item => `$item._id`}
        />
        {/*onRefresh = {() => fetchData()}*/}
        {/*refreshing = {loading}*/}
        {/*)}*/}



        {/*{isLoading ? <ActivityIndicator/> : (*/}
        {/*    <FlatList*/}
        {/*        data={data}*/}
        {/*        keyExtractor={({ data }, index) => 0}*/}
        {/*        renderItem={({ item }) => (*/}
        {/*            <Text>{item}</Text>*/}
        {/*        )}*/}
        {/*    />*/}
        {/*)}*/}
      </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 40,
  },
  button: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 50,
    paddingBottom: 1000,
    // margin: 30,
    marginBottom: 500,
  },
  header: {
    fontSize: 25,
    fontWeight: "Bold",
    paddingBottom: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: 200,
  },
  name: {
    fontSize: 20,
    fontWeight: "Bold",
    paddingBottom: 10,
  },
  card: {
    backgroundColor: "#dedede",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: 'center',
    // minWidth: "100%",
  },
  userList: {
    backgroundColor: "#edebeb",
    borderRadius: 10,
    borderWidth: 1,
    // flex: 4,
    // minWidth: "100%",
  }
});
