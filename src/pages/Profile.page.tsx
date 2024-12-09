import {NavLink, NavLinkRenderProps, Outlet} from "react-router-dom";
import style from "../components/AppHeader/AppHeader.module.css";
import {setError} from "../services/error.slice.ts";
import {useAppDispatch} from "../hooks.ts";
import {useState} from "react";
import AppLoadingIndicator from "../components/AppLoadingIndicator/AppLoadingIndicator.tsx";
import {logout} from "../services/user.thunk.ts";

const ProfilePage = () => {
    const dispatch = useAppDispatch();
    // const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getClasses = (props: NavLinkRenderProps) => {
        let result = style.navLink + ' text text_type_main-medium';

        if (!props.isActive) {
            result += ' text_color_inactive';
        }

        return result;
    }

    const logoutHandler = async () => {
        if (isSubmitting) {
            return;
        }
        setIsSubmitting(true);
        try {
            const result = await dispatch(logout());
            console.log('result', result);
            setIsSubmitting(false);
        } catch (e: any) {
            console.error(e);
            dispatch(setError(e?.response?.data?.message ?? JSON.stringify(e)));
            setIsSubmitting(false);
        }
    }

    return (
        <div
            className="pt-10"
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 60,
                justifyContent: 'flex-start',
                margin: '0 auto',
                height: '100%',
                width: '100%'
            }}>
            <div style={{display: 'flex', flexDirection: 'column', width: 320}}>
                <NavLink className={getClasses}
                         style={{height: 64, display: "flex", alignItems: 'center'}}
                         to={'/profile/edit'}>
                    Профиль
                </NavLink>

                <NavLink className={getClasses}
                         style={{height: 64, display: "flex", alignItems: 'center'}}
                         to={'/profile/orders'}
                >
                    История заказов
                </NavLink>

                <a className="text text_type_main-medium text_color_inactive"
                   style={{height: 64, display: "flex", alignItems: 'center', cursor: 'pointer'}}
                   onClick={logoutHandler}
                >
                    Выход

                    <AppLoadingIndicator loading={isSubmitting} size={15}/>
                </a>

                <div className="text text_type_main-default text_color_inactive mt-20" style={{height: 64}}>
                    В этом разделе вы можете изменить свои персональные данные
                </div>
            </div>

            <Outlet/>
        </div>
    );
}

export default ProfilePage;
