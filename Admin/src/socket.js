import { io } from 'socket.io-client';

// Using url from env file
// const URL = process.env.REACT_APP_BASE_API_URL

export const socket = io("http://localhost:5000");