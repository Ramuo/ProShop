import axios from 'axios'

//Set up the api URL
const API_URL = '/api/users/';

//  1 - Register user
const register = async(userData) => {
    const response = await axios.post(API_URL, userData);

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
};

// 2 - Login user
const login = async(userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
};

// 3 - Logout user 
const logout = async () => {
    localStorage.removeItem('user');
};

// 4 - Update user profile
const updateUserProfile = async(userData, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + 'profile', userData, config);

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const authService = {
    register,
    login,
    logout,
    updateUserProfile
}

export default authService