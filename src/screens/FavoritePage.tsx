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
import {useSelector} from 'react-redux';
import Header from '../components/common/Header';
import {useNavigation} from '@react-navigation/native';

const FavoritePage = () => {
  const navigation = useNavigation();

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
});
