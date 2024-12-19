import {FC} from "react";

const OrdersPage: FC = () => {
    return (
        <>
            <p className="text text_type_main-large mt-10 mb-5">
                Лента заказов
            </p>

            <div className="text text_type_main-default mt-10 mb-5">
                <ol>
                    <li>Заказ 1</li>
                    <li>Заказ 2</li>
                    <li>Заказ 3</li>
                    <li>Заказ 4</li>
                    <li>Заказ 5</li>
                </ol>
            </div>
        </>
    );
}

export default OrdersPage;
