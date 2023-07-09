import axios from "axios";
import { connect } from "socket.io-client";

// export const apiURL = `http://localhost:3001/`
export const apiURL = `https://threeway-studio-node.onrender.com/`

export const socket = connect(apiURL, {
    autoConnect: false,
    extraHeaders: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})

export const loginUser = (body) => {
    return axios.post(apiURL + 'auth/login', body, {
        headers: {
            "Content-Type": 'application/json'
        }
    })
}

export const logoutUser = () => {
    return axios.post(apiURL + 'auth/logout', {
        headers: {
            "Content-Type": 'application/json'
        }
    })
}

export const registerUser = (body) => {
    return axios.post(apiURL + 'auth/register', body, {
        headers: {
            "Content-Type": 'application/json'
        }
    })
}

export const getAllTransporters = () => {
    return axios.get(apiURL + 'transporters', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export const createMessage = (body) => {
    return socket.emit('createMessage', body)
}

export const replyMessage = (body) => {
    return socket.emit('replyMessage', body)
}