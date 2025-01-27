import burgerConstructorSlice, {
    addIngredient,
    initialState,
    moveIngredient,
    removeIngredient
} from '../../services/burgerConstructor.slice.ts';
import {IngredientTypeEnum} from '../../enum/ingredient-type.enum.ts';
import {v4 as uuidv4} from 'uuid';
import {Ingredient} from "../../types/ingredient.ts";

const ingredients: Ingredient[] = [
    {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: IngredientTypeEnum.BUN,
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0,
        _key: uuidv4()
    },
    {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: IngredientTypeEnum.MAIN,
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0,
        _key: uuidv4()
    },
    {
        _id: '643d69a5c3f7b9001cfa0944',
        name: 'Соус традиционный галактический',
        type: IngredientTypeEnum.SAUCE,
        proteins: 42,
        fat: 24,
        carbohydrates: 42,
        calories: 99,
        price: 15,
        image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
        __v: 0,
        _key: uuidv4()
    },
];

describe('burgerConstructorSlice', () => {
    it('should handle initial state', () => {
        expect(burgerConstructorSlice.reducer(undefined, {type: 'unknown'})).toEqual(initialState);
    });

    it('should handle addIngredient (bun)', () => {
        const ingredient = {...ingredients[0]};
        delete ingredient._key;

        const result = burgerConstructorSlice.reducer(initialState, addIngredient(ingredient));
        expect(result).toMatchObject({
            ...initialState, ingredients: [], bun: ingredient
        })
        expect(result.bun).toMatchObject(ingredient);
        expect(result.bun?._key).toBeDefined();
        expect(result.ingredients).toHaveLength(0);
    });

    it('should handle addIngredient (non-bun)', () => {
        const ingredient = {...ingredients[1]};
        delete ingredient._key;

        const result = burgerConstructorSlice.reducer(initialState, addIngredient(ingredient));

        expect(result).toMatchObject({
            ...initialState, ingredients: [ingredient], bun: null
        })
        expect(result.ingredients).toMatchObject([ingredient]);
        expect(result.ingredients[0]?._key).toBeDefined();
        expect(result.bun).toBeNull();
    });

    it('should handle removeIngredient', () => {
        const initialStateWithIngredients = {
            ...initialState,
            ingredients: [ingredients[1], ingredients[2]],
        };

        expect(burgerConstructorSlice.reducer(initialStateWithIngredients, removeIngredient(ingredients[1]))).toEqual({
            ...initialStateWithIngredients, ingredients: [ingredients[2]], bun: null
        })
    });

    it('should handle removeIngredient with random ingredient', () => {
        const ingredient: Ingredient = {
            _id: '643d69a5c3f7b9001cfa093f',
            name: 'Мясо бессмертных моллюсков Protostomia',
            type: IngredientTypeEnum.MAIN,
            proteins: 433,
            fat: 244,
            carbohydrates: 33,
            calories: 420,
            price: 1337,
            image: 'https://code.s3.yandex.net/react/code/meat-02.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
            __v: 0,
            _key: uuidv4()
        };

        const initialStateWithIngredient = {
            ...initialState,
            ingredients: [ingredients[1], ingredients[2]],
        };

        expect(burgerConstructorSlice.reducer(initialStateWithIngredient, removeIngredient(ingredient))).toEqual({
            ...initialStateWithIngredient, ingredients: [ingredients[1], ingredients[2]], bun: null
        })
    });

    it('should handle moveIngredient', () => {
        const initialStateWithIngredients = {
            ...initialState,
            ingredients: [ingredients[1], ingredients[2]],
        };

        expect(burgerConstructorSlice.reducer(initialStateWithIngredients, moveIngredient({
            fromIndex: 0,
            toIndex: 1
        }))).toEqual({
            ...initialStateWithIngredients, ingredients: [ingredients[2], ingredients[1]], bun: null
        })
    });
});