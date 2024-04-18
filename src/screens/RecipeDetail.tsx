import {
  StyleSheet,
  Text,
  Image,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

import Header from '../components/common/Header';
import Button from '../components/common/Button';
import {useDispatch} from 'react-redux';
import {addFavoriteFood} from '../redux/slice/FavoriteFoodSlice';
import {addItemToCart} from '../redux/slice/CartSlice';

interface recipeProps {
  navigation: any;
  route: any;
}
interface Item {
  [key: string]: string;
}

const RecipeDetail = ({navigation, route}: recipeProps) => {
  const dispatch = useDispatch();

  // console.log('Route:', route);
  const {item} = route.params;

  const [isFavorite, setIsFavorite] = useState(false);
  const [qty, setQty] = useState(1);

  const increaseQuantity = () => {
    setQty(qty + 1);
  };

  const decreaseQuantity = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const handleAddToFavorite = async () => {
    dispatch(addFavoriteFood(item));
    setIsFavorite(!isFavorite);
  };

  const ingredientsIndexes = (meal: Item) => {
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
  const allergenIndexes = (meal: Item) => {
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
        <Header
          leftIcon={require('../assets/back-arrow.png')}
          rightIcon={require('../assets/shopping-bag.png')}
          title={'Recipe Details'}
          onClickLeftIcon={() => {
            navigation.goBack();
          }}
          onClickRightIcon={() => {
            navigation.navigate('CartPage');
          }}
          isCart={true} // Pass the isCart prop
        />
        <Image source={{uri: item.image}} style={styles.banner} />
        <Text style={styles.title}>{item.title}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.price, {color: '#000'}]}>{'Price:'}</Text>
          <Text style={styles.price}> ₹ {item.price}</Text>
          <View style={styles.qtyView}>
            <TouchableOpacity style={styles.button} onPress={decreaseQuantity}>
              <Text style={{fontSize: 20, fontWeight: '600'}}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qty}>{qty}</Text>
            <TouchableOpacity style={styles.button} onPress={increaseQuantity}>
              <Text style={{fontSize: 20, fontWeight: '600'}}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

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

        {/* Favorite Button */}
        <TouchableOpacity style={styles.favoriteIcon}>
          <Ionicons
            name={'heart'}
            size={40}
            color={isFavorite ? 'red' : 'gray'}
            // while pressing favorite icon, that favorite food should add to FavoritePage
            onPress={handleAddToFavorite}
          />
        </TouchableOpacity>

        {/* Add To Cart button */}
        <Button
          bg={'#734F0A'}
          title={'Add To Cart'}
          color={'#fff'}
          onClick={() => {
            dispatch(addItemToCart({...item, qty}));
            navigation.navigate('CartPage');
          }}
        />
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
  qtyView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 20,
  },
  button: {
    padding: 10,
    borderWidth: 1,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 20,
  },
  qty: {
    marginLeft: 15,
    fontSize: 20,
  },
  price: {
    fontSize: 23,
    color: 'green',
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 20,
  },
});
