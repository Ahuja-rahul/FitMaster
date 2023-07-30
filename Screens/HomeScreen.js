import React, { useRef, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Pressable, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';


const HomeScreen = ({ navigation }) => {
    const handleBoxPress = (screenName) => {
        navigation.navigate(screenName);
    };

    const windowWidth = Dimensions.get('window').width;
    const boxSize = (windowWidth / 2) - 30;
    const scrollViewRef = useRef(null);
    const { colors, isDarkTheme } = useContext(AppContext);

    useEffect(() => {
        const interval = setInterval(() => {
            scrollViewRef.current.scrollTo({ x: windowWidth, animated: true });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <ScrollView>
           
              <ScrollView
                horizontal
                ref={scrollViewRef}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
            >
                <Pressable style={[styles.hriozontalBanner, isDarkTheme && styles.darkText]} onPress={() => handleBoxPress('Six Pack Abs')}>
                    <Image source={require('../assets/banner1abs/absPic.jpeg')} style={styles.bannerImage} />
                </Pressable>
                <Pressable style={styles.hriozontalBanner} onPress={() => handleBoxPress('Weight Loss')}>
                    <Image source={require('../assets/banner1abs/loss.jpg')} style={styles.bannerImage} />
                </Pressable>
                <Pressable style={styles.hriozontalBanner} onPress={() => handleBoxPress('HIIT')}>
                    <Image source={require('../assets/banner1abs/HIIT.webp')} style={styles.bannerImage} />
                </Pressable>
                {/* <Pressable style={styles.hriozontalBanner} onPress={() => handleBoxPress('Banner')}>
                    <Image source={require('../assets/bannerImage1.jpg')} style={styles.bannerImage} />
                </Pressable> */}
            </ScrollView>


            <Text style={[styles.popularWorkoutsText, isDarkTheme && styles.darkText]}>Popular Workouts</Text>

            <View style={[styles.container, isDarkTheme && styles.darkText]}>
                <View style={[styles.boxContainer, isDarkTheme && styles.darkText]}>
                   
                   <Pressable
                        style={[styles.box, { width: boxSize, height: boxSize }, isDarkTheme && styles.darkBox]}
                        onPress={() => handleBoxPress('BacknBicep Beginner')}
                    >
                        <Image
                            source={require('../assets/WorkoutScreen/BacknBicepB.png')}
                            style={styles.image}
                        />
                        <Text style={[styles.boxText, isDarkTheme && styles.darkText]}>Back n Bicep</Text>
                        <Text style={[styles.boxText2, isDarkTheme && styles.darkText]}>Beginner</Text>
                    </Pressable>


                    <Pressable
                        style={[styles.box, { width: boxSize, height: boxSize }, isDarkTheme && styles.darkBox]}
                        onPress={() => handleBoxPress('BacknBicep Advanced')}
                    >
                        <Image
                            source={require('../assets/WorkoutScreen/BacknBicep.png')}
                            style={styles.image}
                        />
                        <Text style={[styles.boxText, isDarkTheme && styles.darkText]}>Back n Bicep</Text>
                        <Text style={[styles.boxText2, isDarkTheme && styles.darkText]}>Advanced</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.box, { width: boxSize, height: boxSize }, isDarkTheme && styles.darkBox]}
                        onPress={() => handleBoxPress('ChestnTricep Beginner')}
                    >
                        <Image
                            source={require('../assets/WorkoutScreen/ChestnTricepB.png')}
                            style={styles.image}
                        />
                        <Text style={[styles.boxText, isDarkTheme && styles.darkText]}>Chest n Tricep</Text>
                        <Text style={[styles.boxText2, isDarkTheme && styles.darkText]}>Beginner</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.box, { width: boxSize, height: boxSize }, isDarkTheme && styles.darkBox]}
                        onPress={() => handleBoxPress('ChestnTricep Advanced')}
                    >
                        <Image
                            source={require('../assets/WorkoutScreen/ChestnTricepA.png')}
                            style={styles.image}
                        />
                        <Text style={[styles.boxText, isDarkTheme && styles.darkText]}>Chest n Tricep</Text>
                        <Text style={[styles.boxText2, isDarkTheme && styles.darkText]}>Advanced</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.box, { width: boxSize, height: boxSize }, isDarkTheme && styles.darkBox]}
                        onPress={() => handleBoxPress('LegnShoulder Beginner')}
                    >
                        <Image
                            source={require('../assets/WorkoutScreen/LegnShoulderB.png')}
                            style={styles.image}
                        />
                        <Text style={[styles.boxText, isDarkTheme && styles.darkText]}>Shoulders n Legs</Text>
                        <Text style={[styles.boxText2, isDarkTheme && styles.darkText]}>Beginner</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.box, { width: boxSize, height: boxSize }, isDarkTheme && styles.darkBox]}
                        onPress={() => handleBoxPress('LegnShoulder Advanced')}
                    >
                        <Image
                            source={require('../assets/WorkoutScreen/LegnShoulderA.png')}
                            style={styles.image}
                        />
                        <Text style={[styles.boxText, isDarkTheme && styles.darkText]}>Shoulders n Legs</Text>
                        <Text style={[styles.boxText2, isDarkTheme && styles.darkText]}>Advanced</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    darkContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#000000', // Dark mode background color
      },
    bannerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    boxContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    box: {
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
    },
    image: {
        width: '70%',
        height: '60%',
        resizeMode: 'contain',

    },
    hriozontalBanner: {
        width: 340,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        marginHorizontal: 10,
        marginTop: 10,
    },
    popularWorkoutsText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 10,
    },
    bannerText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    boxText: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    boxText2: {
        marginTop: 5,
        fontSize: 12,
        textAlign: 'center',
    },
    darkText: {
        color: '#FFFFFF', // Dark mode text color
      },
      darkBox: {
        backgroundColor: '#333333', // Dark mode background color for the box
    },
    image: {
        width: '70%',
        height: '60%',
        resizeMode: 'contain',// for darkmode
    },
});


export default HomeScreen;
