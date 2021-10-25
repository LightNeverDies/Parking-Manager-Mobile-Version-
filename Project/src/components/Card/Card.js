import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';


const Cards = ({ information, onPress, active }) => {
  return information.map((park) => {
    return(
        <View key={park.parkSpace} style={{ flexDirection: 'row'}}>
          {CardPosition(park, onPress, active)}
        </View>
    )
  })

}

const CardPosition = (park) => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.textParkSpace}>Parking Place {park.parkSpace}</Text>
            <Text style={styles.textCarNumber}>CarNumber: {park.carNumber}</Text>
            <View style={styles.textSpot}>
              <Text style={{ alignItems: 'center', textAlign: 'center', color: 'white'}}>{park.isFreeSpace == 1 ? 'Free Parking Space' : 'Parking Space is Taken'}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex:1,
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#000000',
    borderColor: 'yellow',
    borderWidth: 2,
    width: Dimensions.get('window').width,
    height: 100,
  },
  textSpot: {
    marginTop: 10
  },
  textParkSpace: {
    textAlign: 'center',
    color:'white',
  },
  textCarNumber: {
    textAlign: 'center',
    color:'white', 
  } 
});

module.exports = Cards