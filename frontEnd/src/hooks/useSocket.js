// src/hooks/useSocket.js
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import {setUserOnline} from "../redux/auth";
import { setIsChange } from '../redux/statistical';
const useSocket = () => {
    const {account} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const socket = io(import.meta.env.VITE_APP_URLADMIN, {
            query: {
                userId: account.id, // Gửi userId từ Redux store
            },
        });


        socket.on('updateCart', () => {
            dispatch(setIsChange());
        });

        socket.on('getOnlineUsers', (data) => {
            dispatch(setUserOnline(data));
        });

        return () => {
            socket.disconnect();
        };
    }, [account.id]);

    return null;
};

export default useSocket;
