import { createStackNavigator } from '@react-navigation/stack';
import MyWorkoutScreen from '../Screens/MyWorkoutScreen';
import HomeScreen from '../Screens/HomeScreen';
import Dashboard from '../Dashboard';
import Workout1Screen from '../Screens/Workout1Screen';
import Workout2Screen from '../Screens/Workout2Screen';
import Workout3Screen from '../Screens/Workout3Screen';
import Workout4Screen from '../Screens/Workout4Screen';
import Workout5Screen from '../Screens/Workout5Screen';
import Workout6Screen from '../Screens/Workout6Screen';
import Banner from '../Screens/Banner';
import SearchScreen from '../Screens/SearchScreen';


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dash" component={Dashboard} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="WorkOutScreen" component={MyWorkoutScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: true }} />
      <Stack.Screen name="BackBicepB" component={Workout1Screen} options={{headerShown: true,headerBackTitleVisible: false,}}/>
      <Stack.Screen name="BacknBicepA" component={Workout2Screen} options={{ headerShown: true, headerBackTitleVisible: false }} />
      <Stack.Screen name="ChestnTricepB" component={Workout3Screen} options={{ headerShown: true, headerBackTitleVisible: false }} />
      <Stack.Screen name="ChestnTricepA" component={Workout4Screen} options={{ headerShown: true, headerBackTitleVisible: false }} />
      <Stack.Screen name="LegnShoulderB" component={Workout5Screen} options={{ headerShown: true, headerBackTitleVisible: false }} />
      <Stack.Screen name="LegnShoulderA" component={Workout6Screen} options={{ headerShown: true, headerBackTitleVisible: false }} />
      <Stack.Screen name="Banner" component={Banner} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default MyStack;
