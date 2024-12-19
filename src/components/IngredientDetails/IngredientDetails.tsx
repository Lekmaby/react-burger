import style from './IngredientDetails.module.css';
import {FC, useMemo} from "react";
import {useParams} from "react-router-dom";
import {useGetIngredientsQuery} from "../../services/ingredient.api.ts";
import AppLoadingIndicator from "../AppLoadingIndicator/AppLoadingIndicator.tsx";

type IngredientInfoItem = {
    title: string;
    value: string | number;
};

const IngredientDetails: FC = () => {
    const {id} = useParams<"id">();
    const {isLoading, data: ingredients} = useGetIngredientsQuery();
    const ingredient = useMemo(() => ingredients?.find((x) => x._id === id), [id, ingredients]);

    const infoItems: IngredientInfoItem[] = useMemo(() => {
        return [
            {title: 'Калории, ккал', value: ingredient?.calories ?? ''},
            {title: 'Белки, г', value: ingredient?.proteins ?? ''},
            {title: 'Жиры, г', value: ingredient?.fat ?? ''},
            {title: 'Углеводы, г', value: ingredient?.carbohydrates ?? ''},
        ];
    }, [ingredient]);

    if (isLoading) {
        return (
            <div className="m-10">
                <AppLoadingIndicator loading={isLoading}/>
            </div>
        );
    }

    if (!ingredient) {
        return null;
    }

    return (
        <div className={style.IngredientContainer}>
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
        </div>
    );
}

export default IngredientDetails;
