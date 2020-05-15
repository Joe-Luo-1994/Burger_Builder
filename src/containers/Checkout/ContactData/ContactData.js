import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import myAxios from '../../../axios-orders';

import classes from './ContactData.module.css';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: '',
		},
		loading: false,
	};

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Max',
				address: {
					street: 'Teststreet',
					zip: '413333',
					country: 'Germany',
				},
				email: 'test@test.com',
			},
			deliveryMethod: 'fast',
		};
		myAxios
			.post('/orders.json', order)
			.then((res) => {
				this.props.history.push('/');
				this.setState({ loading: false });
			})
			.catch((err) => this.setState({ loading: false }));
	};

	render() {
		let form = (
			<form action="">
				<input
					className={classes.Input}
					type="text"
					name="name"
					placeholder="Your name"
				></input>
				<input
					className={classes.Input}
					type="text"
					name="email"
					placeholder="Your email"
				></input>
				<input
					className={classes.Input}
					type="text"
					name="street"
					placeholder="Street"
				></input>
				<input
					className={classes.Input}
					type="text"
					name="postal"
					placeholder="Postal Code"
				></input>
				<Button btnType="Success" clicked={this.orderHandler}>
					Order
				</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;
