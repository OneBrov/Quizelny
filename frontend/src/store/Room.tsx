import {makeAutoObservable} from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';
import { io, Socket } from 'socket.io-client';
import { RoomType } from '../types/RoomType';

enableStaticRendering(typeof window === 'undefined')

export class RoomStore {
    room: RoomType = {} as RoomType
    socket: Socket
    
    constructor(roomId: string = "615617f484e35ae62661bcb4") {
        makeAutoObservable(this, {}, {deep:true}) 
        this.socket = io( 
            `${process.env.API_URL}`,
            {
                transports: ['websocket', 'polling', 'flashsocket'],
                withCredentials: true,
                auth: { token: `Bearer ${localStorage.getItem('token')}` }
            }
        )

        this.room._id = roomId
        
        

        this.socket.on('connect', () => {
            this.socket.send("Hello!")
        })

        this.socket.on("message", data => {
            console.log(data);
          });

        this.socket.emit("joinRoom", this.room._id)
        
    }
}

