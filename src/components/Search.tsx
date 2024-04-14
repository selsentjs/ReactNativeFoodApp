import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface SearchProps {
  onChangeText: (text: string) => void; // Define type for onChangeText function
  value: string; // Define type for value
  placeholder: string; // Define type for placeholder
}

const Search: React.FC<SearchProps> = ({onChangeText, value, placeholder}) => {
  return (
    <TouchableOpacity style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
      />
      <Ionicons name="search" size={24} style={styles.searchIcon} />
    </TouchableOpacity>
  );
};

export default Search;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.4,
    borderRadius: 15,
    marginHorizontal: 20,
    backgroundColor: '#f1f1f1',
    padding: 3,
    marginVertical: 5,
  },

  input: {
    flex: 1,
    height: 45,
    padding: 10,
    marginHorizontal: 10,
  },
  searchIcon: {
    marginHorizontal: 10,
  },
});
