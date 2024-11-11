import style from './BurgerIngredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useCallback, useMemo, useRef} from "react";
import {IngredientTypeEnum} from "../../enum/ingredient-type.enum.ts";
import {Ingredient} from "../../types/ingredient.ts";
import ingredientUtil from "../../utils/ingredientUtil.ts";
import {useGetIngredientsQuery} from "../../services/ingredient.api.ts";
import {useAppSelector} from "../../hooks.ts";
import AppLoadingIndicator from "../AppLoadingIndicator/AppLoadingIndicator.tsx";
import {getSelectedBun, getSelectedIngredients} from "../../services/burgerConstructor.slice.ts";
import BurgerCategory from "./BurgerCategory.tsx";

export type TabItem = {
    value: IngredientTypeEnum,
    title: string
    id: string
};

const BurgerIngredients = () => {
    const {isLoading, data: ingredients} = useGetIngredientsQuery();
    const burgerIngredients: Ingredient[] = useAppSelector(getSelectedIngredients);
    const bun: Ingredient | null = useAppSelector(getSelectedBun);

    const [tab, setTab] = React.useState(IngredientTypeEnum.BUN);
    const tabRef = useRef<HTMLDivElement | null>(null);


    const tabs: TabItem[] = React.useMemo(() => {
        const tabs: Record<IngredientTypeEnum | string, TabItem> = {};

        if (ingredients) {
            for (const ingredient of ingredients) {
                if (!tabs?.[ingredient.type]) {
                    tabs[ingredient.type] = {
                        value: ingredient.type,
                        id: 'category_' + ingredient.type,
                        title: ingredientUtil.getTypeTitle(ingredient.type),
                    };
                }
            }
        }

        return Object.values(tabs);
    }, [ingredients]);

    const counters: Record<string, number> = useMemo(() => {
        const result: Record<string, number> = burgerIngredients?.reduce((p: Record<string, number>, c: Ingredient) => {
            const key = c._id;
            if (!p[key]) {
                p[key] = 0;
            }
            p[key]++;
            return p;
        }, {});

        if (bun) {
            result[bun._id] = 2;
        }

        return result;
    }, [bun, burgerIngredients])

    const scrollHandler = useCallback(() => {
        const tabsRect = tabRef.current?.getBoundingClientRect();
        if (!tabsRect) return;

        const tabsBottom = tabsRect.y + tabsRect.height;
        let closestTab = '';
        let minDistance = Infinity;

        tabs.forEach((tab) => {
            const rect = document.getElementById(tab.id)?.getBoundingClientRect();
            if (!rect) return;

            const distance = Math.abs(tabsBottom - rect.y);
            if (distance < minDistance) {
                minDistance = distance;
                closestTab = tab.value;
            }
        });

        setTab(closestTab as IngredientTypeEnum);
    }, [tabs]);

    const tabSelectedHandler = useCallback((group: TabItem) => {
        setTab(group.value);
        const elem = document.getElementById(group.id);
        if (elem) {
            elem.scrollIntoView({behavior: 'smooth'});
        }
    }, []);

    if (isLoading) {
        return (
            <div className="m-10">
                <AppLoadingIndicator loading={isLoading}/>
            </div>
        );
    }

    return (
        <section className={style.section}>
            <p className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
            </p>

            <div ref={tabRef} className={style.tabContainer + ' mb-10'}>
                {
                    tabs?.map((group: TabItem) =>
                        <Tab
                            key={group.value}
                            value={group.value}
                            active={tab === group.value}
                            onClick={() => {
                                tabSelectedHandler(group)
                            }}
                        >
                            {group.title}
                        </Tab>)
                }
            </div>

            <div className={style.listContainer} onScroll={scrollHandler}>
                {
                    tabs?.map((tab: TabItem) =>
                        <BurgerCategory
                            key={tab.value}
                            tab={tab}
                            counters={counters}
                        />
                    )
                }
            </div>
        </section>
    );
}

export default BurgerIngredients;
