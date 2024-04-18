import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from '../screens/HomePage';
import FavoritePage from '../screens/FavoritePage';
import OrderPage from '../screens/OrderPage';
import CartPage from '../screens/CartPage';
import RecipeDetail from '../screens/RecipeDetail';
import User from '../screens/User';
import Checkout from '../screens/Checkout';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'grey',
      }}>
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarIcon: ({size, color, focused}) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={28}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="FavoritePage"
        component={FavoritePage}
        options={{
          headerShown: false,
          tabBarIcon: ({size, color, focused}) => (
            <Ionicons
              name={focused ? 'heart' : 'heart-outline'}
              size={28}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="OrderPage"
        component={OrderPage}
        options={{
          headerShown: false,
          tabBarIcon: ({size, color, focused}) => (
            <Ionicons
              name={focused ? 'reader' : 'reader-outline'}
              size={28}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="CartPage"
        component={CartPage}
        options={{
          headerShown: false,
          tabBarIcon: ({size, color, focused}) => (
            <Ionicons
              name={focused ? 'cart' : 'cart-outline'}
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const StackNavigate = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const BottomTab = () => {
  return (
    <NavigationContainer>
      <StackNavigate />
    </NavigationContainer>
  );
};
export default BottomTab;
