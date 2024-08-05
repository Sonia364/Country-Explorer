import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { useNavigation, useRoute  } from '@react-navigation/native';

const AddItem = () => {
  const [text, setText] = useState('');

  const onChange = (textValue) => setText(textValue);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route.params?.editMode) {
      setText(route.params?.text);
    }
  }, [route.params]);

  const handleAction = () => {
    if (route.params?.editMode) {
      route.params?.editItem(route.params?.id, text);
    } else {
      route.params?.addItem(text);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder="Enter Country name" 
      style={styles.input} 
      onChangeText={onChange}
      value={text}/>
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAction}
      >
      <Text style={styles.addButtonText}>{route.params?.editMode ? 'Edit' : 'Add'}</Text>
      </TouchableOpacity>
    </View>

  )
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: 'white'
    },
    input: {
        height: 60,
        width: 200,
        padding: 8,
        fontSize: 16
    },
    addButton: {
      backgroundColor: '#007BFF',
      borderRadius: 5,
      padding: 10,
      elevation: 2,
      marginBottom: 10,
    },
    addButtonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },


});

export default AddItem;