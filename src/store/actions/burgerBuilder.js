import * as actTypes from './actionTypes';
import myAxios from '../../axios-orders';

export const addIngredient = (ingName) => {
	return {
		type: actTypes.ADD_INGREDIENT,
		ingredientName: ingName,
	};
};
export const removeIngredient = (ingName) => {
	return {
		type: actTypes.REMOVE_INGREDIENT,
		ingredientName: ingName,
	};
};

const setIngredients = (ingredients) => {
	return {
		type: actTypes.SET_INGREDIENTS,
		ingredients: ingredients,
	};
};

const fetchIngredientsFailed = () => {
	return {
		type: actTypes.FETCH_INGREDIENTS_FAILED,
	};
};

export const initIngredients = () => {
	return (dispatch) => {
		myAxios
			.get('https://build-burger-c8e7b.firebaseio.com/ingredients.json')
			.then((res) => {
				dispatch(setIngredients(res.data));
			})
			.catch((err) => {
				dispatch(fetchIngredientsFailed());
			});
	};
};
