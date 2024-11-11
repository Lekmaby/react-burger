import style from './BurgerIngredients.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useCallback} from "react";
import {Ingredient} from "../../types/ingredient.ts";
import {ingredientSelected} from "../../services/ingredient.slice.ts";
import {useAppDispatch} from "../../hooks.ts";
import {addIngredient} from "../../services/burgerConstructor.slice.ts";
import {useDrag} from "react-dnd";

type BurgerIngredientProps = {
    ingredient: Ingredient,
    qty: number
};

const BurgerIngredient = ({ingredient, qty}: BurgerIngredientProps) => {
    const dispatch = useAppDispatch();

    const [{isDragging}, drag] = useDrag(() => ({
        type: 'Ingredient',
        item: ingredient,
        end: (item: Ingredient, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                dispatch(addIngredient(ingredient))
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }))

    const opacity = isDragging ? 0.4 : 1;

    const openIngredient = useCallback(() => {
        dispatch(ingredientSelected(ingredient));
    }, [dispatch, ingredient]);

    return (
        <li
            className={style.ingredient + ' pl-4 pr-4'}
            onClick={openIngredient}
            ref={drag}
            style={{opacity}}
        >
            <img src={ingredient.image} alt={ingredient.name}/>

            {
                qty > 0 &&
                <Counter count={qty} size="default"/>
            }

            <div className={style.ingredientPrice}>
                <p className="text text_type_digits-default">{ingredient.price}</p>
                <CurrencyIcon type="primary"/>
            </div>

            <p className={style.ingredientName + ' text text_type_main-default'}>
                {ingredient.name}
            </p>
        </li>
    );
}

export default BurgerIngredient;
