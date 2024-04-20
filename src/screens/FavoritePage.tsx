import {
  FlatList,
  Image,
  ScrollView,
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

const FavoritePage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const FavoriteFood = useSelector(state => state.FavoriteFood.data);

  //console.log('FavoriteFood:', FavoriteFood);

  // handle image by id
  const handleImagePress = async item => {
    navigation.navigate('RecipeDetail', {item});
  };
  return (
    <View>
      <ScrollView>
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
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(addItemToCart({...item}));
                        navigation.navigate('CartPage' as never);
                      }}
                      style={styles.btn}>
                      <Text style={{color: '#fff'}}>Add To Cart</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noData}>No Food in your favorite</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default FavoritePage;

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 10,
    backgroundColor: '#ffffff',
    width: 400,
    height: 180,
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
    width: 170,
    height: 150,
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
  btn: {
    backgroundColor: '#734F0A',
    width: 100,
    height: 40,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
