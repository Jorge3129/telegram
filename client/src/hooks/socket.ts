import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import {addMessage} from "../redux/messages.reducer";
import {useAppDispatch} from "../redux/store";
import {SERVER_WS_URL} from "../config";

export const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const newSocket = io(`${SERVER_WS_URL}`, {
            query: {
                username: localStorage.getItem('user')
            }
        });

        newSocket.on('message-to-client', (data) => {
            console.log(data)
            dispatch(addMessage({
                text: data.message,
                timestamp: new Date().toISOString(),
                author: data.author
            }))
        })

        setSocket(newSocket);
        return () => {
            newSocket.close()
        };
    }, [])

    return [socket, setSocket] as
        [Socket | null, Dispatch<SetStateAction<Socket | null>>];
}
