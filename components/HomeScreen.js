import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Alert, Modal, TextInput } from 'react-native';
import * as Crypto from 'expo-crypto';
import Header from './Header';
import ListItem from './ListItem';
import AddItem from './AddItem';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();

    const handleAddBtnPress = () => {
        navigation.navigate('AddItem', {addItem: addItem});
        
    };

    const handleEditBtnPress = (id, text) => {
        navigation.navigate('AddItem', { editItem: editItem, editMode: true, id: id, text: text }); 
    };

    const [items, setItems] = useState([
        {
            id: Crypto.randomUUID(),
            text: 'Italy'
        },
        {
            id: Crypto.randomUUID(),
            text: 'Japan'
        },
        {
            id: Crypto.randomUUID(),
            text: 'Philippines'
        },
        {
            id: Crypto.randomUUID(),
            text: 'Canada'
        },
        {
            id: Crypto.randomUUID(),
            text: 'Australia'
        },
    ]);



    const deleteItem = (id) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this item?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete", onPress: () => {
                        setItems(prevItems => prevItems.filter(item => item.id !== id))
                    }
                }
            ]
        );
    };

    const [editingItemId, setEditingItemId] = useState(null);

    const editItem = (id, text) => {
        setItems(prevItems => prevItems.map(item =>
            item.id === id ? { ...item, text } : item
        ));
        setEditingItemId(null); // Exit editing mode
    }

    const addItem = (text) => {
        if (!text) {
            Alert.alert('Error', 'Please Enter Country Name', { text: 'Ok' });
        } else {
            if (editingItemId !== null) {
                // Editing mode
                editItem(editingItemId, text);
            } else {
                // Adding mode
                setItems(prevItems => [
                    { id: Crypto.randomUUID(), text },
                    ...prevItems
                ]);
            }
        }
    }

    return (
        <View style={styles.container}>
            <Header />
            <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ListItem
                        item={item}
                        deleteItem={deleteItem}
                        handleEditBtnPress={handleEditBtnPress}
                    />
                )}
            />
            <TouchableOpacity style={styles.addItemButton} onPress={handleAddBtnPress}>
                <Feather name="plus" size={30} color="white" />
            </TouchableOpacity>
        </View>


    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60
    },
    addItemButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#734F6B',
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        width: 300,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#d7d7d7',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5,
    },
    cancelButton: {
        backgroundColor: 'grey',
        borderRadius: 5,
        padding: 10,
        width: 200
    },
    cancelButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },

});

export default HomeScreen;