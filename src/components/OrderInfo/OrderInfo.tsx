import style from './OrderInfo.module.css';
import {useAppSelector} from "../../hooks.ts";
import {FC, useEffect, useMemo} from "react";
import {useParams} from "react-router-dom";
import {useGetOrderMutation} from "../../services/orders.api.ts";
import {useGetIngredientsQuery} from "../../services/ingredient.api.ts";
import {getIngredients} from "../../services/ingredient.slice.ts";
import {Ingredient} from "../../types/ingredient.ts";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import FeedOrderItemIngredient from "../FeedOrders/FeedOrderItemIngredient.tsx";
import AppLoadingIndicator from "../AppLoadingIndicator/AppLoadingIndicator.tsx";

interface GroupedIngredient extends Ingredient {
    count: number;
}

const OrderInfo: FC = () => {
    useGetIngredientsQuery();
    const {id} = useParams();
    const [getOrder] = useGetOrderMutation();
    const ingredient = useAppSelector(getIngredients);
    const orderNumber = +(id ?? 0);

    const order = useAppSelector(state => {
        let order = state.feed.orders.find(order => order.number === orderNumber)
        if (order) {
            return order;
        }

        order = state.profileFeed.orders.find(order => order.number === orderNumber)
        if (order) {
            return order;
        }

        return state.order.order?.number === orderNumber ? state.order.order : null;
    });

    const price: number = useMemo(() => {
        return order?.ingredients?.reduce((sum: number, id: string) => sum + (ingredient?.[id]?.price ?? 0), 0) ?? 0;
    }, [order, ingredient]);

    const orderIngredients: GroupedIngredient[] = useMemo(() => {
        const grouped = order?.ingredients?.reduce((acc: Record<string, GroupedIngredient>, id: string) => {
            const currentIngredient: Ingredient | any = ingredient?.[id];
            if (currentIngredient) {
                if (!acc[id]) {
                    acc[id] = {...currentIngredient, count: 1};
                } else {
                    acc[id].count += 1;
                }
            }
            return acc;
        }, {});

        return grouped ? Object.values(grouped) : [];
    }, [order, ingredient]);

    useEffect(() => {
        if (!order && id) {
            getOrder(id).unwrap();
        }
    }, []);

    if (!order) {
        return (
            <div className="m-10">
                <AppLoadingIndicator loading={true}/>
            </div>
        );
    }

    return (
        <div className={style.OrderInfoWrapper}>
            <p className={'text text_type_digits-default pb-8'}>
                #{order?.number ?? ''}
            </p>

            <p className={'text text_type_main-medium mb-2'}>
                {order?.name ?? ''}
            </p>

            <div className={'text text_type_main-small'}>
                {order?.status === 'done' && <p className={style.readyOrderNumber}>Выполнен</p>}
                {order?.status === 'pending' && <p>В работе</p>}
                {order?.status === 'created' && <p>Создан</p>}
            </div>

            <div className="mb-10">
                <div className={'text text_type_main-medium mb-6 mt-15'}>
                    Состав:
                </div>

                <div className={style.IngredientList}>
                    {
                        orderIngredients?.map((item: GroupedIngredient, index: number) =>
                            <div key={index}
                                 className={style.IngredientItem}
                            >
                                <div
                                    className={style.IngredientNameWithIcon}
                                >
                                    <FeedOrderItemIngredient
                                        url={item?.image_mobile}
                                        alt={item.name}
                                    />

                                    <p className={'text text_type_main-default'}>
                                        {item.name}
                                    </p>
                                </div>


                                <div className={style.IngredientPriceWithCount}>
                                    <p className="text text_type_digits-default">{item.count}&nbsp;x&nbsp;{item.price}</p>
                                    <CurrencyIcon type="primary"/>
                                </div>
                            </div>)
                    }
                </div>
            </div>

            <div className={style.IngredientFooter}>
                <FormattedDate date={new Date(order?.createdAt ?? '')}
                               className="text text_type_main-default text_color_inactive"/>

                <div className={style.IngredientPrice}>
                    <p className="text text_type_digits-default">{price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>

        </div>
    );
}

export default OrderInfo;
