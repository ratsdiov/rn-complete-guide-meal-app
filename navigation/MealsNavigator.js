import React from 'react';
import { Platform, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import { Ionicons } from '@expo/vector-icons';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';

import Colors from '../constants/Colors';
import Meal from '../models/meal';

const defaultStackNavOptions = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold',
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
        // See https://github.com/react-navigation/react-navigation/issues/1679
        // https://stackoverflow.com/questions/42408034/white-flickering-when-transitioning-to-a-new-screen-and-the-background-is-a-dark
        // animationEnabled: false,  // KBD fix - this eliminates the flickering white bar during animation, the other options below don't
        // cardStyle: { backgroundColor: 'transparent' }
        // cardStyle: { opacity: 1 }

    }
};

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
    }, defaultStackNavOptions
);

const FavNavigator = createStackNavigator(
    {
        Favorites: FavoritesScreen,
        MealDetail: MealDetailScreen,
    }, defaultStackNavOptions
);

const tabsScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />;
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Meals'
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />;
            },
            tabBarColor: Colors.accentColor,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Favorites</Text> : 'Favorites'
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
            labelStyle: {
                fontFamily: 'open-sans',
            },
            activeTintColor: Colors.accentColor,
        }
    });

const FiltersNavigator = createStackNavigator(
    {
        Filters: FiltersScreen,
    }, 
    // {
    // navigationOptions: {  // Example of how to override the name of the key
    //     drawerLabel: ' Filters!!!!'
    // },
    // }
    defaultStackNavOptions
);

const MainNavigator = createDrawerNavigator({
    MealsFavs: {
        screen: MealsFavTabNavigator,
        navigationOptions: {
            drawerLabel: 'Meals',
        }
    },
    Filters: FiltersNavigator,
},
{
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'open-sans-bold',
        }
    }
}
);

export default createAppContainer(MainNavigator);