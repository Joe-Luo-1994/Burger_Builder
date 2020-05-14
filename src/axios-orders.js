import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://build-burger-c8e7b.firebaseio.com/',
});

export default instance;
