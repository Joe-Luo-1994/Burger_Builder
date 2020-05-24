import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		constructor(props) {
			super(props);
			this.state = { error: null };
			this.reqInterceptor = axios.interceptors.request.use(
				(req) => {
					//送出req前皆設定成無錯誤
					this.setState({ error: null });
					return req;
				},
				(err) => Promise.reject(err)
			);

			this.resInterceptor = axios.interceptors.response.use(
				(res) => res,
				//若res status code不是2xx，進入catch前
				(err) => {
					this.setState({ error: err });
					return Promise.reject(err);
				}
			);
		}

		componentWillUnmount = () => {
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.resInterceptor);
		};

		//觸發後關閉錯誤提示視窗
		errorConfirmedHandler = () => {
			this.setState({ error: null });
		};

		render() {
			return (
				<Aux>
					<Modal
						show={this.state.error}
						modalClosed={this.errorConfirmedHandler}
					>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</Aux>
			);
		}
	};
};

export default withErrorHandler;
