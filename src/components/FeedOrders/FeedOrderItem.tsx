import {FC, useMemo} from "react";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import FeedOrderItemIngredient from "./FeedOrderItemIngredient.tsx";
import {Order} from "../../types/order.ts";
import {useAppSelector} from "../../hooks.ts";
import {getIngredients} from "../../services/ingredient.slice.ts";
import {useGetIngredientsQuery} from "../../services/ingredient.api.ts";
import {Ingredient} from "../../types/ingredient.ts";
import {useLocation, useNavigate} from "react-router-dom";
import style from './FeedOrders.module.css';

type FeedOrderItemProps = {
    order: Order
};

const FeedOrderItem: FC<FeedOrderItemProps> = ({order}) => {
    useGetIngredientsQuery();
    const location = useLocation();
    const navigate = useNavigate();
    const ingredient = useAppSelector(getIngredients);

    const price: number = useMemo(() => {
        return order?.ingredients?.reduce((sum: number, id: string) => sum + (ingredient?.[id]?.price ?? 0), 0) ?? 0;
    }, [order, ingredient]);

    const orderIngredients: Ingredient[] = useMemo(() => {
        return order.ingredients?.map((id: string) => ingredient?.[id]) ?? []
    }, [order, ingredient]);

    const openOrder = () => {
        if (order.number) {
            navigate(order.number.toString(), {state: {backgroundLocation: location}});
        }
    }

    if (!order?._id) {
        return null;
    }

    return (
        <div
            className={style.OrderItem}
            id={'order_' + order._id}
            onClick={openOrder}
        >
            <div className={style.OrderHeader}>

                <p className="text text_type_digits-default">
                    #{order.number}
                </p>

                <FormattedDate date={new Date(order.createdAt ?? '')}
                               className="text text_type_main-default text_color_inactive"/>
            </div>

            <div className="text text_type_main-medium">
                {order?.name ?? order.number}
            </div>

            <div className={style.OrderFooter}>
                <div className={style.OrderIngredients}>
                    {
                        orderIngredients
                            ?.slice(0, 6)
                            ?.map((item: Ingredient, index: number) =>
                                item?._id ?
                                    <FeedOrderItemIngredient
                                        key={index}
                                        url={item?.image_mobile}
                                        alt={item.name}
                                        position={index}
                                        last={index === 5 && orderIngredients?.length > 5 ? orderIngredients?.length - 5 : 0}
                                    /> : null
                            )
                    }
                </div>

                <div className={style.OrderPrice}>
                    <p className="text text_type_digits-default">{price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    );
}

export default FeedOrderItem;
