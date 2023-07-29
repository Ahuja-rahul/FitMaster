import React, { useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Pressable, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
    const handleBoxPress = (screenName) => {
        navigation.navigate(screenName);
    };

    const windowWidth = Dimensions.get('window').width;
    const boxSize = (windowWidth / 2) - 30;
    const scrollViewRef = useRef(null);
    const { colors } = useTheme();

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
                <Pressable style={styles.hriozontalBanner} onPress={() => handleBoxPress('Banner')}>
                    <Image source={require('../assets/bannerImage1.jpg')} style={styles.bannerImage} />
                </Pressable>
                <Pressable style={styles.hriozontalBanner} onPress={() => handleBoxPress('Banner')}>
                    <Image source={require('../assets/bannerImage2.jpg')} style={styles.bannerImage} />
                </Pressable>
            </ScrollView>


            <Text style={styles.popularWorkoutsText}>Popular Workouts</Text>

            <View style={styles.container}>
                <View style={styles.boxContainer}>
                    <Pressable
                        style={[styles.box, { width: boxSize, height: boxSize }]}
                        onPress={() => handleBoxPress('BacknBicep Beginner')}
                    >
                        <Image
                            source={require('../assets/WorkoutScreen/BacknBicepB.png')}
                            style={styles.image}
                        />
                        <Text style={styles.boxText}>Back n Bicep</Text>
                        <Text style={styles.boxText2}>Beginner</Text>
                    </Pressable>


                    <Pressable
                        style={[styles.box, { width: boxSize, height: boxSize }]}
                        onPress={() => handleBoxPress('BacknBicep Advanced')}
                    >
                        <Image
                            source={require('../assets/WorkoutScreen/BacknBicep.png')}
                            style={styles.image}
                        />
                        <Text style={styles.boxText}>Back n Bicep</Text>
                        <Text style={styles.boxText2}>Advanced</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.box, { width: boxSize, height: boxSize }]}
                        onPress={() => handleBoxPress('ChestnTricep Beginner')}
                    >
                        <Image
                            source={require('../assets/WorkoutScreen/ChestnTricepB.png')}
                            style={styles.image}
                        />
                        <Text style={styles.boxText}>Chest n Tricep</Text>
                        <Text style={styles.boxText2}>Beginner</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.box, { width: boxSize, height: boxSize }]}
                        onPress={() => handleBoxPress('ChestnTricep Advanced')}
                    >
                        <Image
                            source={require('../assets/WorkoutScreen/ChestnTricepA.png')}
                            style={styles.image}
                        />
                        <Text style={styles.boxText}>Chest n Tricep</Text>
                        <Text style={styles.boxText2}>Advanced</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.box, { width: boxSize, height: boxSize }]}
                        onPress={() => handleBoxPress('LegnShoulder Beginner')}
                    >
                        <Image
                            source={require('../assets/WorkoutScreen/LegnShoulderB.png')}
                            style={styles.image}
                        />
                        <Text style={styles.boxText}>Shoulders n Legs</Text>
                        <Text style={styles.boxText2}>Beginner</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.box, { width: boxSize, height: boxSize }]}
                        onPress={() => handleBoxPress('LegnShoulder Advanced')}
                    >
                        <Image
                            source={require('../assets/WorkoutScreen/LegnShoulderA.png')}
                            style={styles.image}
                        />
                        <Text style={styles.boxText}>Shoulders n Legs</Text>
                        <Text style={styles.boxText2}>Advanced</Text>
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
    // boxContainer: {
    //     flexDirection: 'row',
    //     flexWrap: 'wrap',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    bannerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10,
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
});

export default HomeScreen;
