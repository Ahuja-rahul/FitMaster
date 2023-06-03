import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
import MyWorkoutScreen from '../Screens/MyWorkoutScreen';
import HomeScreen from '../Screens/HomeScreen';
import Dashboard from '../Dashboard';
import Workout1Screen from '../Screens/Workout1Screen';
import Workout2Screen from '../Screens/Workout2Screen';
import Workout3Screen from '../Screens/Workout3Screen';
import Workout4Screen from '../Screens/Workout4Screen';
import Workout5Screen from '../Screens/Workout5Screen';
import Workout6Screen from '../Screens/Workout1Screen';

const Stack = createStackNavigator();

function MyStack() {
    return (
        
          <Stack.Navigator>
          <Stack.Screen name="Dash" component={Dashboard} options={{headerShown:false}}/>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
            <Stack.Screen name="WorkOutScreen" component={MyWorkoutScreen} options={{headerShown:false}}/>
            <Stack.Screen name="W1" component={Workout1Screen} options={{headerShown:false}}/>
            <Stack.Screen name="W2" component={Workout2Screen} options={{headerShown:false}}/>
            <Stack.Screen name="W3" component={Workout3Screen} options={{headerShown:false}}/>
            <Stack.Screen name="W4" component={Workout4Screen} options={{headerShown:false}}/>
            <Stack.Screen name="W5" component={Workout5Screen} options={{headerShown:false}}/>
            <Stack.Screen name="W6" component={Workout6Screen} options={{headerShown:false}}/>
            
          </Stack.Navigator>
        
      )
}
export default MyStack