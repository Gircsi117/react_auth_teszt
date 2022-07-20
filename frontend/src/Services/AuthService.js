import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

let accesstoken = null;

//Email és jelszó alapján leteszteli, hogy engedélyezi-e a belépést
export const login = (email, pass) => {
	return axios({ method: 'post', url: 'http://localhost:3001/auth/login', data: { email, pass } })
		.then((res) => {
      if(!res.data.success) return {success: res.data.success}

			accesstoken = res.data.accessToken;
      cookies.set("refreshtoken", res.headers.refreshtoken)
      return {success: res.data.success}
		})
};

//A refreshtoken alapján leteszteli, hogy a felhasználó jogosult e belépésre
export const checkAuth = () => {
  return axios({ method: 'get', url: 'http://localhost:3001/auth/checkAuth', headers: { refreshtoken: cookies.get("refreshtoken") } })
		.then((res) => {
      return {success: res.data.success}
		})
};

export const logout = (setIsAuth) => {
	accesstoken = null;
	cookies.remove('refreshtoken');
	setIsAuth(false)
};

//My Axios-------------------------------------------------------
export const axiosWithToken = axios.create();

axiosWithToken.interceptors.request.use(
	(config)=>{
		if(!accesstoken) return config;

		return{
			...config,
			headers:{
				...config.headers,
				accesstoken: accesstoken
			}
		}
	},
	(error)=>{
		Promise.reject(error)
	}
)

axiosWithToken.interceptors.response.use(
	(response)=>{
		return response
	},
	(err)=>{
		if (err.response.status !== 403) {
      return err;
    }

		const originalRequest = err.config;

		if (originalRequest.isRetry) {
      return err;
    }

		originalRequest.isRetry = true;

		return axios({method:"get", url:'http://localhost:3001/token/getNewAccessToken', headers:{refreshtoken: cookies.get('refreshtoken')}})
			.then((res)=>{
				accesstoken = res.data.accessToken;
			})
			.then(()=>{
				return axiosWithToken(originalRequest)
			})
	}
)
