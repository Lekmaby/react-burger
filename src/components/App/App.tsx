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
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import FeedPage from "../../pages/FeedPage.tsx";
import LoginPage from "../../pages/Login.page.tsx";
import ForgotPasswordPage from "../../pages/ForgotPassword.page.tsx";
import RegisterPage from "../../pages/Register.page.tsx";
import ResetPasswordPage from "../../pages/ResetPassword.page.tsx";
import ProfilePage from "../../pages/Profile.page.tsx";
import ProfileOrdersPage from "../../pages/ProfileOrders.page.tsx";
import ProfileEditPage from "../../pages/ProfileEdit.page.tsx";
import NotFoundPage from "../../pages/NotFound.page.tsx";
import IngredientPage from "../../pages/Ingredient.page.tsx";
import ProtectedRoute, {UnAuthRoute} from "../ProtectedRoute.tsx";
import {checkUserAuth} from "../../services/user.thunk.ts";
import {FC, useEffect} from "react";
import OrderInfo from "../OrderInfo/OrderInfo.tsx";

const App: FC = () => {
    const dispatch = useAppDispatch();
    const orderIsOpened: boolean = useAppSelector(getOrderIsOpened);
    const error: string | null = useAppSelector(getError);
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as { backgroundLocation?: Location };

    useEffect(() => {
        dispatch(checkUserAuth());
    }, [dispatch]);

    return (
        <>
            <AppHeader/>

            <main className={style.main}>
                <Routes location={state?.backgroundLocation || location}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/feed" element={<FeedPage/>}/>
                    <Route path="/feed/:id" element={<OrderInfo/>}/>
                    <Route path="/ingredients/:id" element={<IngredientPage/>}/>

                    <Route path="/login" element={<UnAuthRoute component={<LoginPage/>}/>}/>
                    <Route path="/register" element={<UnAuthRoute component={<RegisterPage/>}/>}/>
                    <Route path="/forgot-password" element={<UnAuthRoute component={<ForgotPasswordPage/>}/>}/>
                    <Route path="/reset-password" element={<UnAuthRoute component={<ResetPasswordPage/>}/>}/>

                    <Route path="profile" element={<ProtectedRoute component={<ProfilePage/>}/>}>
                        <Route index element={<Navigate to="/profile/edit" replace/>}/>
                        <Route path="edit" element={<ProfileEditPage/>}/>
                        <Route path="orders" element={<ProfileOrdersPage/>}/>
                        <Route path="orders/:id" element={<OrderInfo/>}/>
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
                        <Route path="/profile/orders/:id" element={<Modal
                            onClose={() => {
                                navigate(-1);
                            }}
                        >
                            <OrderInfo/>
                        </Modal>}/>
                        <Route path="/feed/:id" element={<Modal
                            onClose={() => {
                                navigate(-1);
                            }}
                        >
                            <OrderInfo/>
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
