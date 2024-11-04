import style from './App.module.css'
import AppHeader from "../AppHeader/AppHeader.tsx";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.tsx";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.tsx";
import React, {useCallback, useEffect} from "react";
import {Ingredient} from "../../types/ingredient.ts";
import config from "../../utils/config.ts";
import AppError from "../AppError/AppError.tsx";
import AppLoadingIndicator from "../AppLoadingIndicator/AppLoadingIndicator.tsx";
import OrderDetails from "../OrderDetails/OrderDetails.tsx";
import IngredientDetails from "../IngredientDetails/IngredientDetails.tsx";
import Modal from "../Modal/Modal.tsx";

function App() {
    const [ingredients, setIngredients] = React.useState<Ingredient[]>([])
    const [error, setError] = React.useState<string>()
    const [loading, setLoading] = React.useState<boolean>(false)
    const [showOrderDetails, setShowOrderDetails] = React.useState<boolean>(false)
    const [ingredient, setIngredient] = React.useState<Ingredient>()
    const [showIngredientDetails, setShowIngredientDetails] = React.useState<boolean>(false)

    useEffect(() => {
        setLoading(true);
        fetch(config.url)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then(data => {
                if (data.success) {
                    setIngredients(data.data)
                }
                
                return Promise.reject(`Ошибка в данных`);
            })
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
    }, []);

    const newOrderHandler = useCallback(() => {
        setShowOrderDetails(true);
    }, []);

    const openIngredientHandler = useCallback((item: Ingredient) => {
        setIngredient(item);
        setShowIngredientDetails(true);
    }, [])

    return (
        <>
            <AppHeader/>

            <main className={style.main}>
                <AppLoadingIndicator loading={loading}/>

                {
                    error && <AppError message={error}/>
                }

                {
                    !loading && !error && ingredients &&
                    <>
                        <BurgerIngredients
                            ingredients={ingredients}
                            onOpen={openIngredientHandler}
                        />

                        <BurgerConstructor
                            ingredients={ingredients}
                            onSendOrder={newOrderHandler}
                        />
                    </>
                }
            </main>

            {showOrderDetails &&
                <Modal
                    onClose={() => {
                        setShowOrderDetails(false);
                    }}
                >
                    <OrderDetails/>
                </Modal>
            }

            {showIngredientDetails && ingredient &&
                <Modal
                    title="Детали ингредиента"
                    onClose={() => {
                        setShowIngredientDetails(false);
                        setIngredient(undefined);
                    }}
                >
                    <IngredientDetails ingredient={ingredient}/>
                </Modal>
                
            }
        </>
    )
}

export default App
