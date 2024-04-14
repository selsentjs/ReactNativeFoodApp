import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const RecommendedRecipes = ({toggleGridView, toggleEllipsisView, toggleSquareView}) => {
  return (
    <View style={styles.recipesContainer}>
      <Text style={styles.text}>RecommendedRecipes</Text>
      <TouchableOpacity onPress={toggleEllipsisView}>
        <FontAwesome name="ellipsis-v" size={30} />
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleGridView}>
        <Ionicons name="grid" size={24} />
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleSquareView}>
        <Ionicons name="square" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default RecommendedRecipes;

const styles = StyleSheet.create({
  recipesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  text: {
    marginHorizontal: 10,
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 15,
  },
});
