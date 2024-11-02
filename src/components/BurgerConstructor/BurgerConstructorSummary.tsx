import style from './BurgerConstructor.module.css';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

type BurgerConstructorSummaryProps = {
    price: number
    onSendOrder: () => void
};

const BurgerConstructorSummary = ({price, onSendOrder}: BurgerConstructorSummaryProps) => {

    return (
        <div className={style.BurgerConstructorSummaryContainer}>
            <div className={style.BurgerConstructorSummaryPrice}>
                <p className="text text_type_digits-medium">{price}</p>
                <CurrencyIcon type="primary"/>
            </div>

            <Button
                htmlType="button"
                type="primary"
                size="large"
                onClick={onSendOrder}
            >
                Оформить заказ
            </Button>
        </div>
    );
}

export default BurgerConstructorSummary;