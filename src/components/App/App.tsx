import style from './App.module.css'
import AppHeader from "../AppHeader/AppHeader.tsx";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.tsx";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.tsx";
import OrderDetails from "../OrderDetails/OrderDetails.tsx";
import IngredientDetails from "../IngredientDetails/IngredientDetails.tsx";
import Modal from "../Modal/Modal.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {getIngredientIsOpened, ingredientClosed} from "../../services/ingredient.slice.ts";
import {getOrderIsOpened, orderClosed} from "../../services/order.slice.ts";
import {getError, resetError} from "../../services/error.slice.ts";
import AppError from "../AppError/AppError.tsx";

function App() {
    const dispatch = useAppDispatch();
    const ingredientIsOpened = useAppSelector(getIngredientIsOpened);
    const orderIsOpened = useAppSelector(getOrderIsOpened);
    const error = useAppSelector(getError);

    return (
        <>
            <AppHeader/>

            <main className={style.main}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </main>

            {orderIsOpened &&
                <Modal
                    onClose={() => {
                        dispatch(orderClosed())
                    }}
                >
                    <OrderDetails/>
                </Modal>
            }

            {ingredientIsOpened &&
                <Modal
                    title="Детали ингредиента"
                    onClose={() => {
                        dispatch(ingredientClosed());
                    }}
                >
                    <IngredientDetails/>
                </Modal>
            }

            {error && error?.length > 0 &&
                <Modal
                    title="Ошибка"
                    onClose={() => {
                        dispatch(resetError());
                    }}
                >
                    <AppError message={error}/>
                </Modal>
            }

        </>
    )
}

export default App
