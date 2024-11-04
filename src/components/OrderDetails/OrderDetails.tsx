import OrderDetailsStatus from "./OrderDetailsStatus.tsx";
import style from './OrderDetails.module.css';

const OrderDetails = () => {
    return (
        <>
            <p className={style.OrderDetailsNumber + ' text text_type_digits-large pb-8'}>
                034536
            </p>

            <p className="text text_type_main-medium pb-15">
                идентификатор заказа
            </p>

            <OrderDetailsStatus status={'success'}/>

            <p className="text text_type_main-default pb-2">
                Ваш заказ начали готовить
            </p>

            <p className="text text_type_main-default text_color_inactive">
                Дождитесь готовности на орбитальной станции
            </p>
        </>
    );
}

export default OrderDetails;