import {matchPath, NavLink, NavLinkRenderProps, Outlet, useLocation} from "react-router-dom";
import {setError} from "../services/error.slice.ts";
import {useAppDispatch} from "../hooks.ts";
import {FC, useState} from "react";
import AppLoadingIndicator from "../components/AppLoadingIndicator/AppLoadingIndicator.tsx";
import {logout} from "../services/user.thunk.ts";
import classNames from "classnames";
import style from './styles/Profile.module.css';

const ProfilePage: FC = () => {
    const dispatch = useAppDispatch();
    // const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const {pathname} = useLocation();

    const isOrderHistory = matchPath('/profile/orders', pathname);
    const isProfileEdit = matchPath('/profile/edit', pathname);

    const getClasses = (props: NavLinkRenderProps) => {
        return classNames({
            [style.profileMenuNavItem]: true,
            [style.profileMenuItem]: true,
            text: true,
            'text_type_main-medium': true,
            text_color_inactive: !props.isActive,
            [style.profileMenuNavItemActive]: props.isActive,
        });
    }

    const logoutHandler = async () => {
        if (isSubmitting) {
            return;
        }
        setIsSubmitting(true);
        try {
            await dispatch(logout());
            setIsSubmitting(false);
        } catch (e: any) {
            console.error(e);
            dispatch(setError(e?.response?.data?.message ?? JSON.stringify(e)));
            setIsSubmitting(false);
        }
    }

    return (
        <div className={style.profileWrapper + ' pt-10'}>
            <div className={style.profileMenuWrapper}>
                <NavLink className={getClasses}
                         to={'/profile/edit'}>
                    Профиль
                </NavLink>

                <NavLink className={getClasses}
                         to={'/profile/orders'}
                >
                    История заказов
                </NavLink>

                <a className={style.profileMenuItem + ' text text_type_main-medium text_color_inactive'}
                   onClick={logoutHandler}
                >
                    Выход

                    <AppLoadingIndicator loading={isSubmitting} size={15}/>
                </a>

                <div className="text text_type_main-default text_color_inactive mt-20" style={{height: 64}}>
                    {
                        isOrderHistory &&
                        'В этом разделе вы можете просмотреть свою историю заказов'
                    }
                    {
                        isProfileEdit &&
                        'В этом разделе вы можете изменить свои персональные данные'
                    }
                </div>
            </div>

            <Outlet/>
        </div>
    );
}

export default ProfilePage;
