import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
import MyWorkoutScreen from '../MyWorkoutScreen';
import HomeScreen from '../HomeScreen';
import Dashboard from '../Dashboard';

const Stack = createStackNavigator();

function MyStack() {
    return (
        
          <Stack.Navigator>
          <Stack.Screen name="Dash" component={Dashboard} options={{headerShown:false}}/>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
            <Stack.Screen name="WorkOutScreen" component={MyWorkoutScreen} options={{headerShown:false}}/>
            {/* <Stack.Screen name="Cart" component={CartScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}}/> */}
            
          </Stack.Navigator>
        
      )
}
export default MyStack