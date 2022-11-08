import {Text,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/home'
import Create from './screens/create'
import styles from './styles';

const Stack = createNativeStackNavigator();

function App({navigation}) {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={({navigation}) => ({
                        title: "Home",
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate('Create')} >
                                <Text style={{ color: 'blue' }}>Create User</Text>
                            </TouchableOpacity>
                        ),
                    })
                    }
                />
                <Stack.Screen
                    name="Create"
                    component={Create}
                    options={{title: "Create User"}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default App;
