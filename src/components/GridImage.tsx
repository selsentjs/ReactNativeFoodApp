import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
interface GridViewProps {
  search: string;
  selectedCategory: string;
}

const GridImage: React.FC<GridViewProps> = ({
  selectedCategory,
  setSelectedCategory,
  search,
}) => {
  const dispatch = useDispatch();
  const GridFood = useSelector(state => state.GridFood.data);

  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [filteredGridImage, setFilteredGridImage] = useState<GridImageData[]>(
    [],
  );

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

  // Search functionality
  useEffect(() => {
    if (search) {
      const filteredData = GridFood.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()),
      );
      setFilteredGridImage(filteredData);
    } else {
      // If the search text is empty, reset the filtered data to the original GridFood array
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
    <View style={styles.backgroundView}>
      {filteredGridImage.length > 0 ? (
        <FlatList
          data={filteredGridImage}
          renderItem={({item, index}) => (
            <View style={styles.imageContainer} key={index}>
              <View>
                <TouchableOpacity onPress={() => handleImagePress({...item})}>
                  <Image source={{uri: item.image}} style={styles.image} />
                  <Text style={styles.text}>
                    {item.title.length > 15
                      ? item.title.substring(0, 15) + '...'
                      : item.title}
                  </Text>
                  <Text style={styles.priceText}> ₹ {item.price}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2} // Set number of columns to 2
        />
      ) : (
        <Text style={styles.noData}>No food available</Text>
      )}
    </View>
  );
};

export default GridImage;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundView: {
    backgroundColor: '#eae8e8',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 5,
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    marginTop: 5,
    textAlign: 'center',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    marginTop: 5,
    textAlign: 'center',
  },
  noData: {
    color: 'red',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 40,
  },
});
