import style from './IngredientDetails.module.css';
import {Ingredient} from "../../types/ingredient.ts";
import {useMemo} from "react";

type IngredientDetailsProps = {
    ingredient: Ingredient,
};

type IngredientInfoItem = {
    title: string;
    value: string | number;
};

const IngredientDetails = ({ingredient}: IngredientDetailsProps) => {
    const infoItems: IngredientInfoItem[] = useMemo(() => {
        return [
            {title: 'Калории, ккал', value: ingredient.calories},
            {title: 'Белки, г', value: ingredient.proteins},
            {title: 'Жиры, г', value: ingredient.fat},
            {title: 'Углеводы, г', value: ingredient.carbohydrates},
        ];
    }, [ingredient])

    return (
        <>
            <img src={ingredient.image_large} alt={ingredient.name} className={style.IngredientImage}/>

            <p className="text text_type_main-medium pb-8">
                {ingredient.name}
            </p>

            <ul className={style.IngredientInfoList}>
                {
                    infoItems?.map((item: IngredientInfoItem, index: number) =>
                        <li
                            key={index}
                            className={style.IngredientInfoItem}
                        >
                            <p className="text text_type_main-default text_color_inactive">
                                {item.title}
                            </p>
                            <p className="text text_type_digits-default text_color_inactive">
                                {item.value}
                            </p>
                        </li>)
                }
            </ul>
        </>
    );
}

export default IngredientDetails;