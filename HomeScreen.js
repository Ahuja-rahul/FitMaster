import React, { useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Pressable, ScrollView } from 'react-native';

const HomeScreen = ({ navigation }) => {
    const handleBoxPress = (screenName) => {
        navigation.navigate(screenName);
    };

    const windowWidth = Dimensions.get('window').width;
    const boxSize = (windowWidth / 3) - 40;
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
                <Pressable style={styles.hriozontalBanner}>
                    <Text style={styles.bannerText}>Banner 1</Text>
                </Pressable>
                <Pressable style={styles.hriozontalBanner}>
                    <Text style={styles.bannerText}>Banner 2</Text>
                </Pressable>
            </ScrollView>

            <View style={styles.container}>
                <View style={styles.boxContainer}>
                    <Pressable
                        style={[styles.box, { width: boxSize, height: boxSize }]}
                        onPress={() => handleBoxPress('Screen1')}
                    >
                        <Image
                            source={require('./assets/image1.jpg')}
                            style={styles.image}
                        />
                        <Text style={styles.boxText}>Box 1</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.box, { width: boxSize, height: boxSize }]}
                        onPress={() => handleBoxPress('Screen2')}
                    >
                        <Image
                            source={require('./assets/image2.jpg')}
                            style={styles.image}
                        />
                        <Text style={styles.boxText}>Box 2</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.box, { width: boxSize, height: boxSize }]}
                        onPress={() => handleBoxPress('Screen3')}
                    >
                        <Image
                            source={require('./assets/image1.jpg')}
                            style={styles.image}
                        />
                        <Text style={styles.boxText}>Box 3</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.box, { width: boxSize, height: boxSize }]}
                        onPress={() => handleBoxPress('Screen4')}
                    >
                        <Image
                            source={require('./assets/image1.jpg')}
                            style={styles.image}
                        />
                        <Text style={styles.boxText}>Box 4</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.box, { width: boxSize, height: boxSize }]}
                        onPress={() => handleBoxPress('Screen5')}
                    >
                        <Image
                            source={require('./assets/image1.jpg')}
                            style={styles.image}
                        />
                        <Text style={styles.boxText}>Box 5</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.box, { width: boxSize, height: boxSize }]}
                        onPress={() => handleBoxPress('Screen6')}
                    >
                        <Image
                            source={require('./assets/image1.jpg')}
                            style={styles.image}
                        />
                        <Text style={styles.boxText}>Box 6</Text>
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
    boxContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
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
        width: 300,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        marginHorizontal: 10,
        marginTop: 10,
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
});

export default HomeScreen;
