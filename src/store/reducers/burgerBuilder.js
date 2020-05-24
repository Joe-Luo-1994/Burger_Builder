import * as actTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initState = {
	ingredients: null,
	totalPrice: 4,
	error: false,
	building: false,
};

const INGREDIENT_PRICES = {
	salad: 0.5,
	bacon: 0.7,
	cheese: 0.4,
	meat: 1.3,
};

const addIngredient = (state, action) => {
	const updatedIngredient = {
		[action.ingredientName]: state.ingredients[action.ingredientName] + 1,
	};
	const updatedIngredients = updateObject(
		state.ingredients,
		updatedIngredient
	);
	const updatedState = {
		ingredients: updatedIngredients,
		totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
		building: true,
	};

	return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
	const updatedIngredient = {
		[action.ingredientName]: state.ingredients[action.ingredientName] - 1,
	};
	const updatedIngredients = updateObject(
		state.ingredients,
		updatedIngredient
	);
	const updatedState = {
		ingredients: updatedIngredients,
		totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
		building: true,
	};
	return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
	return updateObject(state, {
		ingredients: {
			salad: action.ingredients.salad,
			bacon: action.ingredients.bacon,
			cheese: action.ingredients.cheese,
			meat: action.ingredients.meat,
		},
		totalPrice: 4,
		error: false,
		building: false,
	});
};

const reducer = (state = initState, action) => {
	switch (action.type) {
		case actTypes.ADD_INGREDIENT: {
			return addIngredient(state, action);
		}
		case actTypes.REMOVE_INGREDIENT: {
			return removeIngredient(state, action);
		}
		case actTypes.SET_INGREDIENTS: {
			return setIngredients(state, action);
		}
		case actTypes.FETCH_INGREDIENTS_FAILED: {
			return updateObject(state, { error: true });
		}
		default:
			return state;
	}
};

export default reducer;
