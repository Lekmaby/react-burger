import style from './BurgerConstructor.module.css';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Ingredient} from "../../types/ingredient.ts";
import {useEffect, useMemo, useState} from "react";
import {IngredientTypeEnum} from "../../enum/ingredient-type.enum.ts";
import BurgerConstructorSummary from "./BurgerConstructorSummary.tsx";

type BurgerConstructorProps = {
    ingredients: Ingredient[],
    onSendOrder: () => void
};

const BurgerConstructor = ({ingredients, onSendOrder}: BurgerConstructorProps) => {
    const [topIngredient, setTopIngredient] = useState<Ingredient>();
    const [bottomIngredient, setBottomIngredient] = useState<Ingredient>();
    const [middleIngredients, setMiddleIngredients] = useState<Ingredient[]>([]);
    const [price, setPrice] = useState<number>(0);

    useEffect(() => {
        setTopIngredient(ingredients.find(x => x.type === IngredientTypeEnum.BUN));
        setBottomIngredient(ingredients.find(x => x.type === IngredientTypeEnum.BUN));
        const shuffled = ingredients.filter(x => x.type !== IngredientTypeEnum.BUN).sort(() => 0.5 - Math.random());
        setMiddleIngredients(shuffled.slice(0, 10));
    }, [ingredients]);

    useEffect(() => {
        setPrice((topIngredient?.price ?? 0) + (bottomIngredient?.price ?? 0) + middleIngredients.reduce((a: number, x: Ingredient) => a + x.price, 0));
    }, [topIngredient, bottomIngredient, middleIngredients]);

    const topIngredientName: string = useMemo(() =>
        topIngredient?.name + ' (верх)', [topIngredient]);

    const bottomIngredientName: string = useMemo(() =>
        bottomIngredient?.name + ' (низ)', [bottomIngredient]);

    return (
        <section className={style.section}>
            <div className="mt-25">
                <ul className={style.BurgerConstructorList}>
                    <li className={style.BurgerConstructorLockedIngredient}>
                        {
                            topIngredient &&
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={topIngredientName}
                                price={topIngredient.price}
                                thumbnail={topIngredient.image_mobile}
                            />
                        }
                    </li>

                    <div className={style.BurgerConstructorMiddleIngredients}>
                        {
                            middleIngredients?.length > 0 &&
                            middleIngredients.map(ingredient =>
                                <li key={ingredient._id}
                                    className={style.BurgerConstructorMiddleIngredient}
                                >
                                    <DragIcon type="primary"/>
                                    <ConstructorElement
                                        text={ingredient.name}
                                        price={ingredient.price}
                                        thumbnail={ingredient.image_mobile}
                                    />
                                </li>
                            )
                        }
                    </div>

                    <li className={style.BurgerConstructorLockedIngredient}>
                        {
                            bottomIngredient &&
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={bottomIngredientName}
                                price={bottomIngredient.price}
                                thumbnail={bottomIngredient.image_mobile}
                            />
                        }
                    </li>
                </ul>

                <BurgerConstructorSummary price={price} onSendOrder={onSendOrder}/>
            </div>
        </section>
    );
}

export default BurgerConstructor;