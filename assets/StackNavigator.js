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
import Banner1 from '../Screens/Banner1';
import SearchScreen from '../Screens/SearchScreen';
import SettingScreen from '../Screens/SettingScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import Banner2 from '../Screens/Banner2WeightLoss';
import Banner3 from '../Screens/HIIT';


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dash" component={Dashboard} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="WorkOutScreen" component={MyWorkoutScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: true }} />
      <Stack.Screen name="BacknBicep Beginner" component={Workout1Screen} options={{headerShown: true,headerBackTitleVisible: false,}}/>
      <Stack.Screen name="BacknBicep Advanced" component={Workout2Screen} options={{ headerShown: true, headerBackTitleVisible: false }} />
      <Stack.Screen name="ChestnTricep Beginner" component={Workout3Screen} options={{ headerShown: true, headerBackTitleVisible: false }} />
      <Stack.Screen name="ChestnTricep Advanced" component={Workout4Screen} options={{ headerShown: true, headerBackTitleVisible: false }} />
      <Stack.Screen name="LegnShoulder Beginner" component={Workout5Screen} options={{ headerShown: true, headerBackTitleVisible: false }} />
      <Stack.Screen name="LegnShoulder Advanced" component={Workout6Screen} options={{ headerShown: true, headerBackTitleVisible: false }} />
      {/* <Stack.Screen name="Banner" component={Banner} options={{ headerShown: false }} /> */}
      <Stack.Screen name="Six Pack Abs" component={Banner1} options={{ headerShown: true, headerBackTitleVisible: false }} />
      <Stack.Screen name="Weight Loss" component={Banner2} options={{ headerShown: true, headerBackTitleVisible: false }} />
      <Stack.Screen name="HIIT" component={Banner3} options={{ headerShown: true, headerBackTitleVisible: false }} />


      <Stack.Screen name="Settings" component={SettingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
}

export default MyStack;
