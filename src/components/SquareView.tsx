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
interface SquareViewProps {
  search: string;
  selectedCategory: string;
}

const SquareView: React.FC<SquareViewProps> = ({
  search,
  selectedCategory,
  setSelectedCategory,
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
    fetchData();
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
  const handleImagePress = async (item: GridImageData) => {
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
                <View>
                  {/* // pass the data from here to RecipeDetail */}

                  <TouchableOpacity onPress={() => handleImagePress({...item})}>
                    <Image source={{uri: item.image}} style={styles.image} />
                    <Text style={styles.text}>
                      {item.title.length > 30
                        ? item.title.substring(0, 30) + '...'
                        : item.title}
                    </Text>
                    <Text style={styles.priceText}> ₹ {item.price}</Text>
                  </TouchableOpacity>
                </View>
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

export default SquareView;

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
    marginVertical: 10,
    backgroundColor: '#ffffff',
    width: 346,
    height: 307,
    alignItems: 'center',
    alignSelf: 'center',
    //marginBottom: 20,
  },
  image: {
    marginVertical: 10,
    width: 328,
    height: 200,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    justifyContent: 'flex-start',
    marginLeft: 10,
  },
  priceText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    justifyContent: 'flex-start',
    marginLeft: 10,
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
