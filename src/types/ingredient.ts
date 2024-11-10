import {IngredientTypeEnum} from "../enum/ingredient-type.enum.ts";

export type Ingredient = {
    _id: string,
    _key?: string,
    name: string,
    type: IngredientTypeEnum,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
};
