import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '11452ed1-3660-45e9-b8d1-a254f78a41b8_'
    }
})

export const usersAPI = {
    getUsers(page, count) {
        return instance.get(`users?page=${page}&count=${count}`);
    }
}

export const followAPI = {
    postFollow(id) {
        return instance.post(`follow/${id}`);
    },
    deleteFollow(id) {
        return instance.delete(`follow/${id}`);
    }
}

export const profileAPI = {
    getProfile(id) {
        return instance.get(`profile/${id}`);
    },
    putImage(img) {
        const formData = new FormData();
        formData.append('image', img);
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    putProfile(obj) {
        return instance.put('profile', obj);
    },
    getStatus(id) {
        return instance.get(`profile/status/${id}`);
    },
    putStatus(status) {
        return instance.put('profile/status', { status });
    }
}

export const authAPI = {
    getAuth() {
        return instance.get('auth/me');
    },
    postAuth(email, password, rememberMe, captcha) {
        return instance.post('auth/login', { email, password, rememberMe, captcha });
    },
    deleteAuth() {
        return instance.delete('auth/login');
    }
}

export const captchaAPI = {
    getCaptcha() {
        return instance.get('security/get-captcha-url');
    }
}