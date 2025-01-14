import {FC, useEffect} from "react";
import {AppDispatch} from "../store.ts";
import {useAppDispatch, useAppSelector} from "../hooks.ts";
import config from "../utils/config.ts";
import {
    getProfileFeedOrders,
    getProfileFeedWebsocketStatus,
    wsProfileFeedConnect,
    wsProfileFeedDisconnect
} from "../services/profileFeed.slice.ts";
import FeedOrders from "../components/FeedOrders/FeedOrders.tsx";

const ProfileOrdersPage: FC = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const status = useAppSelector(getProfileFeedWebsocketStatus);
    const orders = useAppSelector(getProfileFeedOrders);
    const connect = (token: string) => dispatch(wsProfileFeedConnect(config.ws + '/orders?token=' + token));
    const disconnect = () => dispatch(wsProfileFeedDisconnect());

    useEffect(() => {
        connect(localStorage.getItem('accessToken') ?? '');

        return () => {
            disconnect();
        }
    }, []);

    return (
        <div>
            <FeedOrders status={status} orders={orders}/>
        </div>
    );
}

export default ProfileOrdersPage;
