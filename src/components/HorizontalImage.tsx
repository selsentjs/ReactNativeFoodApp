import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setHorizontalFood} from '../redux/slice/HorizontalFoodSlice';

const url =
  'https://selsentjs.github.io/ReactNativeFoodApp/horizontalImage.json';

const HorizontalImage = () => {
  const dispatch = useDispatch();
  const HorizontalFood = useSelector(state => state.HorizontalFood.data);
  //console.log('horizontalFood:', HorizontalFood);

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      const data = response.data.food;
      // console.log('data:', data);
      dispatch(setHorizontalFood(data));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}>
        {/* Map through the food items and render each item */}
        {HorizontalFood.map(
          (item: {image: string; category: string}, index: number) => (
            <View key={index} style={styles.itemContainer}>
              {/* Display the item regardless of the category */}
              <TouchableOpacity>
                <Image
                  source={{uri: item.image}}
                  style={styles.image}
                  onError={() => console.log('Error loading image')}
                />
                <Text style={styles.category}>{item.category}</Text>
              </TouchableOpacity>
            </View>
          ),
        )}
      </ScrollView>
    </View>
  );
};

export default HorizontalImage;

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    paddingHorizontal: 4,
    marginVertical: 30,
  },
  itemContainer: {marginRight: 20},
  image: {width: 70, height: 70, borderRadius: 100},
  category: {marginTop: 5, textAlign: 'center', fontWeight: '700'},
});
