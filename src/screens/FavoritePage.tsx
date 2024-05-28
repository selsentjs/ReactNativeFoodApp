import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../components/common/Header';
import {useNavigation} from '@react-navigation/native';
import {addItemToCart} from '../redux/slice/CartSlice';
import {removeFavoriteFood} from '../redux/slice/FavoriteFoodSlice';

const FavoritePage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const FavoriteFood = useSelector(state => state.FavoriteFood.data);

  //console.log('FavoriteFood:', FavoriteFood);

  // remove food from favorite
  const handleRemoveItem = itemId => {
    dispatch(removeFavoriteFood(itemId));
  };

  // handle image by id
  const handleImagePress = async item => {
    navigation.navigate('RecipeDetail', {item});
  };
  return (
    <View style={{flex: 1}}>
      <Header
        title={'My Favorite Food'}
        leftIcon={require('../assets/back-arrow.png')}
        rightIcon={require('../assets/shopping-bag.png')}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      {FavoriteFood.length > 0 ? (
        <FlatList
          data={FavoriteFood}
          renderItem={({item, index}) => (
            <View style={styles.imageContainer} key={index}>
              <TouchableOpacity
                onPress={() => handleImagePress({...item})}
                style={styles.touchableContainer}>
                {item.image && ( // Check if item.image is not null or undefined
                  <Image source={{uri: item.image}} style={styles.image} />
                )}
                <View style={styles.textContainer}>
                  <Text style={styles.text}>
                    {item.title.length > 15
                      ? item.title.substring(0, 15) + '...'
                      : item.title}
                  </Text>
                  <Text style={styles.priceText}> ₹ {item.price}</Text>

                  {/* // This Add To Cart button used to add item to the cart from favorite food page */}
                  <View style={styles.btnContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(addItemToCart({...item}));
                        // after added this item to cart, this item should remove from the favorite food
                        handleRemoveItem(item._id);
                        navigation.navigate('CartPage' as never);
                      }}
                      style={styles.btn}>
                      <Text style={{color: '#fff'}}>Add To Cart</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        handleRemoveItem(item._id);
                      }}
                      style={styles.rmvBtn}>
                      <Text style={{color: '#fff'}}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noData}>No Food in your favorite</Text>
      )}
    </View>
  );
};

export default FavoritePage;

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 10,
    backgroundColor: '#ffffff',
    width: 400,
    height: 130,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  touchableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    marginVertical: 10,
    width: 100,
    height: 100,
    borderRadius: 10,
    marginLeft: 20,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  priceText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    marginTop: 10,
  },
  noData: {
    color: 'red',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 40,
  },
  btnContainer: {
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: '#734F0A',
    width: 100,
    height: 40,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  rmvBtn: {
    backgroundColor: '#db4513',
    width: 70,
    height: 30,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 17,
    marginLeft: 20,
  },
});
