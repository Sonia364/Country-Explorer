import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import Svg, { Image } from 'react-native-svg';

const DetailScreen = ({ route }) => {
  const { item } = route.params;
  console.log(item);
  const [flag, setFlag] = useState('');
  const [capital, setCapital] = useState('');
  const [region, setRegion] = useState('');
  const [languages, setLanguages] = useState('');
  const [population, setPopulation] = useState('');

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/name/${item.text}`)
      .then(response => {
        const countryData = response.data[0];
        setFlag(countryData.flags['png']);
        setCapital(countryData.capital[0]);
        setRegion(countryData.region); 
        const languageString = Object.values(countryData.languages).join(', ');
        setLanguages(languageString); 
        setPopulation(countryData.population); 
        
      })
      .catch(error => {
        console.error(error);
      });
  }, [item.text]);

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        {flag && <Svg width="80" height="80">
            <Image href={{ uri: flag }} width="50" height="50" />
        </Svg>}
      </View>
      <Text style={styles.heading}>{item.text}</Text>
      {capital && <Text style={styles.label}>Capital: <Text style={styles.info}>{capital}</Text></Text> }
      {region && <Text style={styles.label}>Region: <Text style={styles.info}>{region}</Text></Text> }
      {population && <Text style={styles.label}>Population: <Text style={styles.info}>{population}</Text></Text>}
      {languages && <Text style={styles.label}>Language: <Text style={styles.info}>{languages}</Text></Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9F9F9', // Light background color
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Add some space between the image and text
  },
  flagImage: {
    width: 70,
    height: 70,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold', // Make the labels bold
    marginBottom: 8,
    marginTop: 20
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'normal'
  },
});

export default DetailScreen;
