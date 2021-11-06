import { Platform } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';

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
    });

export default createAppContainer(MealsNavigator);