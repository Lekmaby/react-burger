import style from './BurgerIngredients.module.css';
import {Counter, CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {IngredientTypeEnum} from "../../enum/ingredient-type.enum.ts";
import {Ingredient} from "../../types/ingredient.ts";
import ingredientUtil from "../../utils/ingredientUtil.ts";

type TabItem = {
    value: IngredientTypeEnum,
    title: string
};

type BurgerIngredientsProps = {
    ingredients: Ingredient[],
    onOpen: (item: Ingredient) => void
};

const BurgerIngredients = ({ingredients, onOpen}: BurgerIngredientsProps) => {
    const [tab, setTab] = React.useState(IngredientTypeEnum.BUN)

    const groups: Record<IngredientTypeEnum, Ingredient[]> = React.useMemo(() => {
        const groupedIngredients: Record<IngredientTypeEnum | string, Ingredient[]> = {};

        for (const ingredient of ingredients) {
            if (!groupedIngredients?.[ingredient.type]) {
                groupedIngredients[ingredient.type] = [];
            }

            groupedIngredients[ingredient.type].push(ingredient);
        }
        return groupedIngredients;
    }, [ingredients]);

    const tabs: TabItem[] = React.useMemo(() => {
        const tabs: Record<IngredientTypeEnum | string, TabItem> = {};

        for (const ingredient of ingredients) {
            if (!tabs?.[ingredient.type]) {
                tabs[ingredient.type] = {
                    value: ingredient.type,
                    title: ingredientUtil.getTypeTitle(ingredient.type),
                };
            }
        }
        return Object.values(tabs);
    }, [ingredients]);

    return (
        <section className={style.section}>
            <p className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
            </p>

            <div className={style.tabContainer + ' mb-10'}>
                {
                    tabs?.map((group: TabItem) =>
                        <Tab
                            key={group.value}
                            value={group.value}
                            active={tab === group.value}
                            onClick={(value: string) => setTab(value as IngredientTypeEnum)}
                        >
                            {group.title}
                        </Tab>)
                }
            </div>

            <div className={style.listContainer}>
                {
                    tabs?.map((tab: TabItem) =>
                        <div key={tab.value}>
                            <p className="text text_type_main-medium mb-6">
                                {tab.title}
                            </p>
                            <ul className={style.groupList + ' mb-10'}>
                                {
                                    groups[tab.value]
                                        .map((item: Ingredient, index: number) => (
                                            <li key={item._id}
                                                className={style.ingredient + ' pl-4 pr-4'}
                                                onClick={() => {
                                                    onOpen(item);
                                                }}
                                            >
                                                <img src={item.image} alt={item.name}/>

                                                <Counter count={index + 1} size="default"/>

                                                <div className={style.ingredientPrice}>
                                                    <p className="text text_type_digits-default">{item.price}</p>
                                                    <CurrencyIcon type="primary"/>
                                                </div>

                                                <p className={style.ingredientName + ' text text_type_main-default'}>
                                                    {item.name}
                                                </p>
                                            </li>
                                        ))
                                }
                            </ul>
                        </div>
                    )
                }
            </div>
        </section>
    );
}

export default BurgerIngredients;