import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Pressable } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const handleBoxPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const windowWidth = Dimensions.get('window').width;
  const boxSize = (windowWidth / 2) - 30;

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.box, { width: boxSize, height: boxSize }]}
        onPress={() => handleBoxPress('Screen1')}
      >
        <Image
          source={require('./assets/image1.jpg')}
          style={styles.image}
        />
      </Pressable>

      <Pressable
        style={[styles.box, { width: boxSize, height: boxSize }]}
        onPress={() => handleBoxPress('Screen2')}
      >
        <Image
          source={require('./assets/image2.jpg')}
          style={styles.image}
        />
      </Pressable>

      <Pressable
        style={[styles.box, { width: boxSize, height: boxSize }]}
        onPress={() => handleBoxPress('Screen3')}
      >
        <Image
          source={require('./assets/image1.jpg')}
          style={styles.image}
        />
      </Pressable>

      <Pressable
        style={[styles.box, { width: boxSize, height: boxSize }]}
        onPress={() => handleBoxPress('Screen4')}
      >
        <Image
          source={require('./assets/image1.jpg')}
          style={styles.image}
        />
      </Pressable>

      <Pressable
        style={[styles.box, { width: boxSize, height: boxSize }]}
        onPress={() => handleBoxPress('Screen5')}
      >
        <Image
          source={require('./assets/image1.jpg')}
          style={styles.image}
        />
      </Pressable>

      <Pressable
        style={[styles.box, { width: boxSize, height: boxSize }]}
        onPress={() => handleBoxPress('Screen6')}
      >
        <Image
          source={require('./assets/image1.jpg')}
          style={styles.image}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  box: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  image: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
});

export default HomeScreen;
