import {CheckMarkIcon, CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import style from './OrderDetails.module.css';
import bgImage from '../../assets/images/orderStatus.svg';
import {FC} from "react";

type OrderDetailsStatusProps = {
    status?: 'success' | 'error';
};

const OrderDetailsStatus: FC<OrderDetailsStatusProps> = ({status = 'success'}) => {
    return (
        <div className={style.OrderDetailsStatus}
             style={{backgroundImage: `url(${bgImage})`}}
        >
            {
                status === 'success' &&
                <CheckMarkIcon type="primary" className={style.OrderDetailsStatusIcon}/>
            }
            {
                status === 'error' &&
                <CloseIcon type="primary" className={style.OrderDetailsStatusIcon}/>
            }
        </div>
    );
}

export default OrderDetailsStatus;
