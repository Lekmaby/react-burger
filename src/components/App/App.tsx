import style from './App.module.css'
import AppHeader from "../AppHeader/AppHeader.tsx";
import OrderDetails from "../OrderDetails/OrderDetails.tsx";
import IngredientDetails from "../IngredientDetails/IngredientDetails.tsx";
import Modal from "../Modal/Modal.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {getOrderIsOpened, orderClosed} from "../../services/order.slice.ts";
import {getError, resetError} from "../../services/error.slice.ts";
import AppError from "../AppError/AppError.tsx";
import HomePage from "../../pages/Home.page.tsx";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import OrdersPage from "../../pages/Orders.page.tsx";
import LoginPage from "../../pages/Login.page.tsx";
import ForgotPasswordPage from "../../pages/ForgotPassword.page.tsx";
import RegisterPage from "../../pages/Register.page.tsx";
import ResetPasswordPage from "../../pages/ResetPassword.page.tsx";
import ProfilePage from "../../pages/Profile.page.tsx";
import ProfileOrdersPage from "../../pages/ProfileOrders.page.tsx";
import ProfileEditPage from "../../pages/ProfileEdit.page.tsx";
import ProfileOrderDetailPage from "../../pages/ProfileOrderDetail.page.tsx";
import NotFoundPage from "../../pages/NotFound.page.tsx";
import IngredientPage from "../../pages/Ingredient.page.tsx";

function App() {
    const dispatch = useAppDispatch();
    const orderIsOpened = useAppSelector(getOrderIsOpened);
    const error = useAppSelector(getError);
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as { backgroundLocation?: Location };

    return (
        <>
            <AppHeader/>

            <main className={style.main}>
                <Routes location={state?.backgroundLocation || location}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/orders" element={<OrdersPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
                    <Route path="/reset-password" element={<ResetPasswordPage/>}/>
                    <Route path="/ingredients/:id" element={<IngredientPage/>}/>

                    <Route path="profile" element={<ProfilePage/>}>
                        <Route index element={<ProfileEditPage/>}/>
                        <Route path="orders" element={<ProfileOrdersPage/>}/>
                        <Route path="orders/:number" element={<ProfileOrderDetailPage/>}/>
                    </Route>

                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>

                {state?.backgroundLocation && (
                    <Routes>
                        <Route path="/ingredients/:id" element={<Modal
                            title="Детали ингредиента"
                            onClose={() => {
                                navigate(-1);
                            }}
                        >
                            <IngredientDetails/>
                        </Modal>}/>
                    </Routes>
                )}
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
