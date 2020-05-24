import * as actTypes from './actionTypes';
import myAxios from '../../axios-orders';

export const puchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData,
	};
};

export const puchaseBurgerFail = (error) => {
	return {
		type: actTypes.PURCHASE_BURGER_FAIL,
		error: error,
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actTypes.PURCHASE_BURGER_START,
	};
};

export const purchaseBurger = (orderData, token) => {
	return (dispatch) => {
		dispatch(purchaseBurgerStart());
		myAxios
			.post('/orders.json?auth=' + token, orderData)
			.then((res) => {
				dispatch(puchaseBurgerSuccess(res.data.name, orderData));
			})
			.catch((err) => {
				dispatch(puchaseBurgerFail(err));
			});
	};
};

export const purchaseInit = () => {
	return {
		type: actTypes.PURCHASE_INIT,
	};
};

export const fetchOrderSuccess = (orders) => {
	return {
		type: actTypes.FETCH_ORDERS_SUCCESS,
		orders: orders,
	};
};
export const fetchOrderFail = (error) => {
	return {
		type: actTypes.FETCH_ORDERS_FAIL,
		error: error,
	};
};

export const fetchOrderStart = () => {
	return {
		type: actTypes.FETCH_ORDERS_START,
	};
};

export const fetchOrders = (token, userId) => {
	return (dispatch) => {
		dispatch(fetchOrderStart());
		const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
		myAxios
			.get('/orders.json' + queryParams)
			.then((res) => {
				const fetchOrders = [];
				for (let key in res.data) {
					fetchOrders.push({ ...res.data[key], id: key });
				}
				dispatch(fetchOrderSuccess(fetchOrders));
			})
			.catch((err) => dispatch(fetchOrderFail(err)));
	};
};
