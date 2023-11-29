import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { io } from "socket.io-client"
import { setNotification, setSingleNotification } from "../redux/notifications/notificationSlice"
import { activeChatId } from "./Conversations"
import { signal } from "@preact/signals-react"

export const socket = io("http://localhost:3000")

export const notifySignal = signal({
    notifications: []
})



const SocketConnection = () => {

    const { currentUser } = useSelector(state => state.user)
    const { notificationsDB } = useSelector(state => state.notification)
    const dispatch = useDispatch();



    //======= Getting Unseened messages from DB ========//
    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const unseenNotificaton = await fetch(`/api/notification/${currentUser._id}`)
    //             const res = await unseenNotificaton.json();
    //             if (res.success !== false) {
    //                 dispatch(setNotification(res))
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     })()
    // }, [])


    //=========== Store notificaions to DB =============//

    const sendNotificationToDB = async (notificationData) => {
        try {
            const sendNotification = await fetch("/api/notification/create", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(notificationData)
            })
            const response = await sendNotification.json()
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }


    //----- Get Notification from socket and setNotification---------//
    useEffect(() => {
        socket.on(`${currentUser?._id}`, (socketNotification) => {

            if (socketNotification.chatId !== activeChatId.value.chatId) {

                const isNotificationExist =
                    notifySignal.value.notifications.some(notify => notify.chatId === socketNotification.chatId)

                if (!isNotificationExist) {
                    notifySignal.value.notifications.push(socketNotification)
                    dispatch(setSingleNotification(socketNotification))
                    sendNotificationToDB(socketNotification)
                }
            }
        })
    })


    return (
        <>
        </>
    )
}

export default SocketConnection