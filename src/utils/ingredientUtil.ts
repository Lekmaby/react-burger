import {IngredientTypeEnum} from "../enum/ingredient-type.enum.ts";

const ingredientUtil = {
    getTypeTitle: (type: IngredientTypeEnum): string => {
        switch (type) {
            case IngredientTypeEnum.BUN:
                return 'Булки';
            case IngredientTypeEnum.SAUCE:
                return 'Соусы';
            case IngredientTypeEnum.MAIN:
                return 'Начинки';
            default:
                return type;
        }
    }
};

export default ingredientUtil;
