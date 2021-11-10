import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

import Colors from '../constants/Colors';

const MealsNavigator = createStackNavigator(
    {
        Categories: {
            screen: CategoriesScreen
        },
        CategoryMeals: {
            screen: CategoryMealsScreen,  // Example of longer form
            // Could have navigationOptions key here if per screen options needed
        },
        MealDetail: MealDetailScreen,
    },
    {
        initialRouteName: 'Categories',  // Specify the initial screen to show
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
            // See https://github.com/react-navigation/react-navigation/issues/1679
            // https://stackoverflow.com/questions/42408034/white-flickering-when-transitioning-to-a-new-screen-and-the-background-is-a-dark
            // animationEnabled: false,  // KBD fix - this eliminates the flickering white bar during animation, the other options below don't
            // cardStyle: { backgroundColor: 'transparent' }
            // cardStyle: { opacity: 1 }

        }
    }
);

const tabsScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />;
            },
            tabBarColor: Colors.primaryColor,
        }
    },
    Favorites: {
        screen: FavoritesScreen,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />;
            },
            tabBarColor: Colors.accentColor,
        }
    }
};



const MealsFavTabNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabsScreenConfig, {
        activeColor: 'white',
        shifting: true,
    })
    : createBottomTabNavigator(tabsScreenConfig, {
        tabBarOptions: {
            activeTintColor: Colors.accentColor,
        }
    });

export default createAppContainer(MealsFavTabNavigator);