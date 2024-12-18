import style from './BurgerConstructor.module.css';
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {Ingredient} from "../../types/ingredient.ts";
import BurgerConstructorSummary from "./BurgerConstructorSummary.tsx";
import {useAppSelector} from "../../hooks.ts";
import {getSelectedBun, getSelectedIngredients} from "../../services/burgerConstructor.slice.ts";
import {useDrop} from "react-dnd";
import BurgerConstructorIngredient from "./BurgerConstructorIngredient.tsx";
import BurgerConstructorNoIngredient from "./BurgerConstructorNoIngredient.tsx";
import {FC} from "react";

const BurgerConstructor: FC = () => {
    const ingredients: Ingredient[] = useAppSelector(getSelectedIngredients);
    const bun: Ingredient | null = useAppSelector(getSelectedBun);

    const [{canDrop, isOver}, drop] = useDrop(() => ({
        accept: 'Ingredient',
        drop: () => ({name: 'BurgerConstructor'}),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))

    const topIngredientName: string = bun?.name + ' (верх)';
    const bottomIngredientName: string = bun?.name + ' (низ)';

    return (
        <section className={style.section}>
            <ul className={style.BurgerConstructorList + ' ' +
                ((canDrop && isOver) ? style.BurgerConstructorDragCanDrop : '') + ' ' +
                ((canDrop && !isOver) ? style.BurgerConstructorDragIsOver : '')}
                ref={drop}
            >
                <li className={style.BurgerConstructorLockedIngredient}>
                    {
                        bun ?
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={topIngredientName}
                                price={bun.price}
                                thumbnail={bun.image_mobile}
                            /> :
                            <BurgerConstructorNoIngredient type="top" text="Добавьте булку"/>
                    }
                </li>

                {
                    ingredients?.length > 0 ?
                        <div className={style.BurgerConstructorMiddleIngredients}>
                            {ingredients.map((ingredient: Ingredient, index: number) =>
                                <BurgerConstructorIngredient
                                    key={ingredient._key}
                                    ingredient={ingredient}
                                    index={index}
                                />
                            )}
                        </div>
                        :
                        <BurgerConstructorNoIngredient text="Добавьте ингредиенты" styles={{marginLeft: 32}}/>
                }


                <li className={style.BurgerConstructorLockedIngredient}>
                    {
                        bun ?
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={bottomIngredientName}
                                price={bun.price}
                                thumbnail={bun.image_mobile}
                            /> :
                            <BurgerConstructorNoIngredient type="bottom" text="Добавьте булку"/>
                    }
                </li>
            </ul>

            <BurgerConstructorSummary/>
        </section>
    );
}

export default BurgerConstructor;
