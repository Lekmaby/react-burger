import Modal from "../Modal/Modal.tsx";
import OrderDetailsStatus from "./OrderDetailsStatus.tsx";


type OrderDetailsProps = {
    onClose: () => void
};

const OrderDetails = ({onClose}: OrderDetailsProps) => {
    return (
        <Modal onClose={onClose}
        >
            <p className="text text_type_digits-large pb-8"
               style={{textShadow: '0px 4px 16px #3333FF80'}}
            >
                034536
            </p>

            <p className="text text_type_main-medium pb-15"
            >идентификатор заказа</p>

            <OrderDetailsStatus status={'success'}/>

            <p className="text text_type_main-default pb-2"
            >Ваш заказ начали готовить</p>

            <p className="text text_type_main-default text_color_inactive"
            >Дождитесь готовности на орбитальной станции</p>
        </Modal>
    );
}

export default OrderDetails;