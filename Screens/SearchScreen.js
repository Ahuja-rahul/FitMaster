import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { data } from './Data/workouts';

const SearchScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredWorkouts, setFilteredWorkouts] = useState(data);

    const handleSearchQueryChange = (query) => {
        setSearchQuery(query);

        const filtered = data.filter((workout) =>
            workout.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredWorkouts(filtered);
    };

    const renderItem = ({ item }) => (
        <View style={styles.workoutContainer}>
            <View style={styles.workoutImageContainer}>
                <Image source={item.image} style={styles.workoutImage} />
            </View>
            <View style={styles.workoutInfoContainer}>
                <Text style={styles.workoutName}>{item.name}</Text>
                <Text>{item.reps}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.toolbar}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search workouts..."
                    value={searchQuery}
                    onChangeText={handleSearchQueryChange}
                />
            </View>
            <FlatList
                data={filteredWorkouts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    toolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: '#f5f5f5',
    },
    workoutContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        borderColor: 'gray',
        padding: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: '#fff',
    },
    workoutImageContainer: {
        alignItems: 'flex-start',
    },
    workoutInfoContainer: {
        flex: 1,
        marginLeft: 20,
    },
    workoutImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginTop: 10,
    },
    workoutName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 10,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
    },
});

export default SearchScreen;
