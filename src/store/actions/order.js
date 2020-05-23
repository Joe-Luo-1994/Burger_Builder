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

export const purchaseBurger = (orderData) => {
	return (dispatch) => {
		dispatch(purchaseBurgerStart());
		myAxios
			.post('/orders.json', orderData)
			.then((res) => {
				console.log(res.data);
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

export const fetchOrders = () => {
	return (dispatch) => {
		dispatch(fetchOrderStart());
		myAxios
			.get('/orders.json')
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
