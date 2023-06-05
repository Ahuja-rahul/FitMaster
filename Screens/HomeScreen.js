import React, { useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Pressable, ScrollView } from 'react-native';

const HomeScreen = ({ navigation }) => {
    const handleBoxPress = (screenName) => {
        navigation.navigate(screenName);
    };

    const windowWidth = Dimensions.get('window').width;
    const boxSize = (windowWidth / 2) - 30;
    const scrollViewRef = useRef(null);

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
                <Pressable style={styles.hriozontalBanner}
                onPress={() => handleBoxPress('W1')}>
                    <Text style={styles.bannerText}>Banner 1</Text>
                </Pressable>
                <Pressable style={styles.hriozontalBanner}
                onPress={() => handleBoxPress('W1')}>
                    <Text style={styles.bannerText}>Banner 2</Text>
                </Pressable>
            </ScrollView>
            
            <Text style={styles.popularWorkoutsText}>
                Popular Workouts
            </Text>

            <View style={styles.container}>
                <View style={styles.boxContainer}>
                    <Pressable
                        style={[styles.box, { width: boxSize, height: boxSize }]}
                        onPress={() => handleBoxPress('W1')}
                    >
                        <Image
                            source={require('../assets/image1.jpg')}
                            style={styles.image}
                        />
                        <Text style={styles.boxText}>Back n Bicep</Text>
                        <Text style={styles.boxText2}>Beginner</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.box, { width: boxSize, height: boxSize }]}
                        onPress={() => handleBoxPress('W2')}
                    >
                        <Image
                             source={require('../assets/image2.jpg')}
                            style={styles.image}
                        />
                        <Text style={styles.boxText}>Back n Bicep</Text>
                        <Text style={styles.boxText2}>Advanced</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.box, { width: boxSize, height: boxSize }]}
                        onPress={() => handleBoxPress('W3')}
                    >
                        <Image
                            source={require('../assets/image1.jpg')}
                            style={styles.image}
                        />
                        <Text style={styles.boxText}>Chest n Tricep</Text>
                        <Text style={styles.boxText2}>Beginner</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.box, { width: boxSize, height: boxSize }]}
                        onPress={() => handleBoxPress('W4')}
                    >
                        <Image
                             source={require('../assets/image2.jpg')}
                            style={styles.image}
                        />
                      <Text style={styles.boxText}>Chest n Tricep</Text>
                        <Text style={styles.boxText2}>Advanced</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.box, { width: boxSize, height: boxSize }]}
                        onPress={() => handleBoxPress('W5')}
                    >
                        <Image
                            source={require('../assets/image1.jpg')}
                            style={styles.image}
                        />
                         <Text style={styles.boxText}>Shoulders n Legs</Text>
                        <Text style={styles.boxText2}>Beginner</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.box, { width: boxSize, height: boxSize }]}
                        onPress={() => handleBoxPress('W6')}
                    >
                        <Image
                            source={require('../assets/image2.jpg')}
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
    },
    image: {
        width: '70%',
        height: '60%',
        resizeMode: 'contain',

    },
    hriozontalBanner: {
        width: 340,
        height: 180,
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
    },
    boxText2: {
        marginTop: 5,
        fontSize: 12,
    },
});

export default HomeScreen;
