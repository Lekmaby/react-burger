import {FC, useEffect} from "react";
import FeedOrders from "../components/FeedOrders/FeedOrders.tsx";
import FeedStat from "../components/FeedStat/FeedStat.tsx";
import {useAppDispatch, useAppSelector} from "../hooks.ts";
import {AppDispatch} from "../store.ts";
import {getFeedOrders, getFeedWebsocketStatus, wsConnect, wsDisconnect} from "../services/feed.slice.ts";
import config from "../utils/config.ts";
import style from "./styles/Feed.module.css";

const FeedPage: FC = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const status = useAppSelector(getFeedWebsocketStatus);
    const orders = useAppSelector(getFeedOrders);
    const connect = () => dispatch(wsConnect(config.ws + '/orders/all'));
    const disconnect = () => dispatch(wsDisconnect());

    useEffect(() => {
        connect();

        return () => {
            disconnect();
        }
    }, []);

    return (
        <div className={style.FeedPageContainer}>
            <div>
                <p className="text text_type_main-large mt-10 mb-5">
                    Лента заказов
                </p>

                <FeedOrders status={status} orders={orders}/>
            </div>

            <FeedStat/>
        </div>
    );
}

export default FeedPage;
