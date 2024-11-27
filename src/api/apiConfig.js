import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL|| '';
console.log(process.env.REACT_APP_BASE_URL)
export const apiConfig = axios.create({
	baseURL: BASE_URL,
	validateStatus: function (status) {
		return status >= 200 && status < 300;
	},
});
const useRequest = () => {
	apiConfig.interceptors.request.use((config) => {
		const token = localStorage.getItem('access_token');
		config.headers.Authorization = `Bearer ${token}`;
		return config;
	});
	apiConfig.interceptors.response.use((res) => {
		return res;
	});
	return apiConfig;
};
export default useRequest;
