import style from './BurgerConstructor.module.css';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAddOrderMutation} from "../../services/orders.api.ts";
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {getSelectedBun, getSelectedIngredients} from "../../services/burgerConstructor.slice.ts";
import {useMemo} from "react";
import {Ingredient} from "../../types/ingredient.ts";
import AppLoadingIndicator from "../AppLoadingIndicator/AppLoadingIndicator.tsx";
import {setError} from "../../services/error.slice.ts";

const BurgerConstructorSummary = () => {
    const dispatch = useAppDispatch();
    const [addOrder, {isLoading}] = useAddOrderMutation();
    const ingredients: Ingredient[] = useAppSelector(getSelectedIngredients);
    const bun: Ingredient | null = useAppSelector(getSelectedBun);

    const createOrderHandler = () => {
        if (!bun?._id) {
            dispatch(setError('Выберите булку'));
            return;
        }
        if (!ingredients.length) {
            dispatch(setError('Выберите ингредиенты'));
            return;
        }

        addOrder([bun._id, ...ingredients.map(x => x._id), bun._id]);
    };

    const price: number = useMemo(() => {
        return ingredients.reduce((sum: number, ingredient: Ingredient) => sum + ingredient.price, 0) + ((bun?.price ?? 0) * 2);
    }, [ingredients, bun]);

    return (
        <div className={style.BurgerConstructorSummaryContainer}>
            {
                price > 0 &&
                <div className={style.BurgerConstructorSummaryPrice}>
                    <p className="text text_type_digits-medium">{price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            }

            <Button
                htmlType="button"
                type="primary"
                size="large"
                onClick={createOrderHandler}
                disabled={isLoading}
            >
                {!isLoading && 'Оформить заказ'}

                <AppLoadingIndicator loading={isLoading} size={15}/>
            </Button>
        </div>
    );
}

export default BurgerConstructorSummary;