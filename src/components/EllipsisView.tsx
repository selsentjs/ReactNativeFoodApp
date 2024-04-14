import {
  FlatList,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setGridFood} from '../redux/slice/GridFoodSlice';

const url = 'https://selsentjs.github.io/ReactNativeFoodApp/gridImage.json';
interface GridImageData {
  image: string;
  title: string;
  price: string;
  category: string;
}
interface EllipsisViewProps {
  search: string;
  selectedCategory: string;
}

const EllipsisView: React.FC<EllipsisViewProps> = ({
  selectedCategory,
  setSelectedCategory,
  search,
}) => {
  const [loading, setLoading] = useState(true);
  const [filteredGridImage, setFilteredGridImage] = useState<GridImageData[]>(
    [],
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const GridFood = useSelector(state => state.GridFood.data);

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      const data = response.data.food;
      dispatch(setGridFood(data));
      setFilteredGridImage(data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Pass selectedCategory to fetchData function
  }, []);

  useEffect(() => {
    // Filter GridFood based on selectedCategory
    const filteredData = GridFood.filter(
      item => selectedCategory === 'All' || item.category === selectedCategory,
    );
    setFilteredGridImage(filteredData);
  }, [selectedCategory, GridFood]);

  // search
  useEffect(() => {
    if (search) {
      const filteredData = GridFood.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()),
      );
      setFilteredGridImage(filteredData);
    } else {
      setFilteredGridImage(GridFood);
    }
  }, [search, GridFood]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // handle image by id
  const handleImagePress = async item => {
    navigation.navigate('RecipeDetail', {item});
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.backgroundView}>
        {filteredGridImage.length > 0 ? (
          <FlatList
            data={filteredGridImage}
            renderItem={({item, index}) => (
              <View style={styles.imageContainer} key={index}>
                <TouchableOpacity
                  onPress={() => handleImagePress({...item})}
                  style={styles.touchableContainer}>
                  <Image source={{uri: item.image}} style={styles.image} />
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
          <Text style={styles.noData}>No Food Available</Text>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default EllipsisView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundView: {
    backgroundColor: '#eae8e8',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  imageContainer: {
    marginTop: 25,
    backgroundColor: '#ffffff',
    width: 360,
    height: 180,
    // marginBottom: 10,
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
