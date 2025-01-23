import {FC} from "react";
import FeedOrderItem from "./FeedOrderItem.tsx";
import AppLoadingIndicator from "../AppLoadingIndicator/AppLoadingIndicator.tsx";
import {Order} from "../../types/order.ts";
import style from './FeedOrders.module.css';
import {WebsocketStatus} from "../../enum/WebsocketStatus.enum.ts";

type FeedOrdersProps = {
    status: WebsocketStatus;
    orders: Order[]
};

const FeedOrders: FC<FeedOrdersProps> = ({status, orders}) => {
    if (status !== WebsocketStatus.ONLINE) {
        return (
            <div className="m-10">
                <AppLoadingIndicator loading={true}/>
            </div>
        );
    }

    return (
        <section className={style.OrdersList}>
            {
                orders?.map((order: Order) =>
                    <FeedOrderItem key={order._id} order={order}/>
                )
            }
        </section>
    );
}

export default FeedOrders;
