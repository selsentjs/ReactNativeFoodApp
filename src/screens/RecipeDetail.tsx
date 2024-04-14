import {
  StyleSheet,
  Text,
  Image,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import axios from 'axios';

const RecipeDetail = ({navigation, route}) => {
  // console.log('Route:', route);
  const {item} = route.params;

  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(true);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const ingredientsIndexes = meal => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 15; i++) {
      if (meal['strIngredient' + i]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  // display allergen
  const allergenIndexes = meal => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 15; i++) {
      if (meal['allergen' + i]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  return (
    <View>
      <ScrollView>
        <Image source={{uri: item.image}} style={styles.banner} />
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.addRemoveButtonContainer}>
          <Text style={styles.priceText}>Price: ₹ {item.price}</Text>
          <TouchableOpacity style={styles.removeButton}>
            <Ionicons name={'remove'} size={40} color={'white'} />
          </TouchableOpacity>
          <Text style={styles.numberText}>1</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name={'add'} size={40} color={'white'} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.leftArrow} onPress={handleBackPress}>
          <MaterialIcons name={'keyboard-arrow-left'} size={40} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteIcon}>
          <Ionicons
            name={'heart'}
            size={40}
            color={isFavorite ? 'red' : 'gray'}
            onPress={handleFavorite}
          />
        </TouchableOpacity>

        {/* nutrition part */}

        <View style={styles.nutritionContainer}>
          <Text style={[styles.title, {marginBottom: 10}]}>Nutrition</Text>
          <View>
            <View style={styles.mainContainer}>
              <View style={styles.nutritionDetail}>
                <Text style={{color: 'white'}}>CALORIES</Text>
                <Text style={{color: 'white'}}>{item.calories}</Text>
                <Text style={{color: 'white'}}>KCAL</Text>
              </View>

              <View
                style={[styles.nutritionDetail, {backgroundColor: '#27AF11'}]}>
                <Text style={{color: 'white'}}>PROTEIN</Text>
                <Text style={{color: 'white'}}>{item.protein} g</Text>
              </View>

              <View
                style={[styles.nutritionDetail, {backgroundColor: '#734F0A'}]}>
                <Text style={{color: 'white'}}>CARBOHYDRATES</Text>
                <Text style={{color: 'white'}}>{item.carbohydrates} g</Text>
              </View>
            </View>

            {/* second line */}
            <View style={styles.mainContainer}>
              <View
                style={[styles.nutritionDetail, {backgroundColor: '#145EB5'}]}>
                <Text style={{color: 'white'}}>SALT</Text>
                <Text style={{color: 'white'}}>{item.salt} g</Text>
              </View>

              <View
                style={[styles.nutritionDetail, {backgroundColor: '#0A5A73'}]}>
                <Text style={{color: 'white'}}>SUGAR</Text>
                <Text style={{color: 'white'}}>{item.sugar} g</Text>
              </View>

              <View
                style={[styles.nutritionDetail, {backgroundColor: '#F11111'}]}>
                <Text style={{color: 'white'}}>FAT</Text>
                <Text style={{color: 'white'}}>{item.fat} g</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Allergens */}
        <View style={styles.nutritionContainer}>
          <Text style={styles.title}>Allergens</Text>
          <View
            style={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 20}}>
            {item &&
              ingredientsIndexes(item).length > 0 &&
              allergenIndexes(item).map((i, index) => {
                const allergenText = item['allergen' + i];
                const isLast = index === allergenIndexes(item).length - 1;
                const displayText = isLast ? allergenText : allergenText + ', ';
                return (
                  <Text key={i} style={styles.allergenText}>
                    {index === 0 ? '[ ' : ''}
                    {displayText}
                    {isLast ? ' ]' : ''}
                  </Text>
                );
              })}
          </View>
        </View>

        {/* ingredients */}
        <View>
          <Text style={styles.title}>Ingredients</Text>
          <View style={{marginLeft: 20}}>
            {item &&
              ingredientsIndexes(item).length > 0 &&
              ingredientsIndexes(item).map(i => {
                return (
                  <View key={i} style={{flexDirection: 'row', marginBottom: 5}}>
                    <View>
                      <Octicons name="dot-fill" size={20} color="#734F0A" />
                    </View>
                    <View style={styles.displayIngredient}>
                      <View style={{flexDirection: 'row', marginLeft: 10}}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 15,
                            fontWeight: '500',
                          }}>
                          {item['strMeasure' + i]}
                        </Text>
                        <Text
                          style={{marginLeft: 5, color: 'black', fontSize: 15}}>
                          {item['strIngredient' + i]}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
          </View>
        </View>

        {/* button */}
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Add To Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default RecipeDetail;

const styles = StyleSheet.create({
  banner: {
    width: 385,
    height: 277,
    borderRadius: 20,
    marginVertical: 5,
    marginHorizontal: 4,
  },
  title: {
    fontSize: 23,
    color: '#000',
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  priceText: {
    fontSize: 30,
    color: '#0A734D',
    fontWeight: '600',
  },
  leftArrow: {
    top: 20,
    left: 20,
    position: 'absolute',
    backgroundColor: '#eeeeef',
    borderRadius: 100,
    padding: 2,
  },
  favoriteIcon: {
    top: 20,
    right: 20,
    position: 'absolute',
    backgroundColor: '#eeeeef',
    borderRadius: 100,
    padding: 2,
  },
  addRemoveButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 2,
    alignItems: 'center',
    marginVertical: 20,
  },
  numberText: {
    fontSize: 30,
    color: 'black',
  },
  removeButton: {
    backgroundColor: '#0c0c0c',
  },
  addButton: {
    backgroundColor: '#0c0c0c',
  },

  nutritionContainer: {
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 5,
    marginBottom: 20,
  },
  displayIngredient: {
    paddingHorizontal: 10,
  },
  mainContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 7,
    marginBottom: 20,
  },
  nutritionDetail: {
    backgroundColor: 'green',
    width: 73,
    height: 67,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  allergenText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
    marginBottom: 20,
  },
  valueText: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  btn: {
    backgroundColor: '#734F0A',
    width: 275,
    height: 66,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
});
