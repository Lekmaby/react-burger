import style from './BurgerIngredients.module.css';
import {useMemo} from "react";
import {Ingredient} from "../../types/ingredient.ts";
import {TabItem} from "./BurgerIngredients.tsx";
import BurgerIngredient from "./BurgerIngredient.tsx";
import {useGetIngredientsQuery} from "../../services/ingredient.api.ts";

type BurgerCategoryProps = {
    tab: TabItem,
    counters: Record<string, number>,
};

const BurgerCategory = ({tab, counters}: BurgerCategoryProps) => {
    const {data: ingredients} = useGetIngredientsQuery();

    const thisCategoryIngredients = useMemo(() =>
        ingredients?.filter((ingredient: Ingredient) => ingredient.type === tab.value), [ingredients, tab.value]);


    return (
        <div className={style.ingredientSection}
             id={tab.id}
        >
            <p className={'text text_type_main-medium mb-6'}>
                {tab.title}
            </p>
            <ul className={style.groupList + ' mb-10'}>
                {
                    thisCategoryIngredients
                        ?.map((item: Ingredient) => (
                            <BurgerIngredient
                                key={item._id}
                                ingredient={item}
                                qty={counters[item._id]}
                            />
                        ))
                }
            </ul>
        </div>
    );
}

export default BurgerCategory;
