import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HorizontalImage from '../components/HorizontalImage';
import GridImage from '../components/GridImage';
import Search from '../components/common/Search';
import RecommendedRecipes from '../components/RecommendedRecipes';
import EllipsisView from '../components/EllipsisView';
import SquareView from '../components/SquareView';
import {useSelector} from 'react-redux';

const HomePage = () => {
  const [search, setSearch] = useState('');
  // Add a new state to keep track of the selected category
  const [selectedCategory, setSelectedCategory] = useState('All');
  // when i press grid icon it should work
  const [showGridView, setShowGridView] = useState(true);
  const [showSquareView, setShowSquareView] = useState(false);
  const [showEllipsisView, setShowEllipsisView] = useState(false);

  // Get the user's name from the Redux store
  const userName = useSelector(state => state.auth.data?.name);

  console.log('username:', userName);

  // Function to toggle grid view
  const toggleGridView = () => {
    setShowGridView(true);
    setShowSquareView(false); // Hide square view
    setShowEllipsisView(false);
  };

  // Function to toggle square view
  const toggleSquareView = () => {
    setShowSquareView(true);
    setShowGridView(false); // Hide grid view
    setShowEllipsisView(false);
  };

  // Function to toggle ellipsis view
  const toggleEllipsisView = () => {
    setShowEllipsisView(true);
    setShowGridView(false); // Hide grid view
    setShowSquareView(false); // Hide square view
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        {/* <TouchableOpacity>
          <Ionicons name="menu" size={30} color={'black'} style={styles.icon} />
        </TouchableOpacity> */}

        <Ionicons
          name="person-circle-outline"
          size={60}
          color={'black'}
          style={styles.userIcon}
        />
        <Text style={styles.welcomeText}>
          {`Welcome ${userName || 'Guest'}!`}
        </Text>
      </View>
      <HorizontalImage
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Search
        value={search}
        onChangeText={setSearch}
        placeholder="Search Food"
      />
      <RecommendedRecipes
        toggleGridView={toggleGridView}
        toggleSquareView={toggleSquareView}
        toggleEllipsisView={toggleEllipsisView}
      />

      {showGridView && (
        <GridImage search={search} selectedCategory={selectedCategory} />
      )}
      {showEllipsisView && (
        <EllipsisView search={search} selectedCategory={selectedCategory} />
      )}
      {showSquareView && (
        <SquareView search={search} selectedCategory={selectedCategory} />
      )}
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  icon: {
    padding: 12,
  },
  userIcon: {
    color: '#674007',
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'space-evenly',
    marginTop: 15,
    marginHorizontal: 7,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    marginLeft: 10,
  },
});
