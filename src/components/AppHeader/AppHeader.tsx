import style from './AppHeader.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, NavLinkRenderProps} from "react-router-dom";

const AppHeader = () => {
    const getClasses = (props: NavLinkRenderProps) => {
        let result = style.navLink + ' text text_type_main-default';

        if (!props.isActive) {
            result += ' text_color_inactive';
        }

        return result;
    }

    return (
        <header className={style.header}>
            <div className={style.headerContent}>
                <nav className={style.nav}>
                    <ul className={style.ul}>
                        <li className={style.navItem}>
                            <NavLink to={"/"} className={getClasses}>
                                {({isActive}) => (
                                    <>
                                        <BurgerIcon type={isActive ? 'primary' : 'disabled'}/>
                                        <span>Конструктор</span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                        <li className={style.navItem}>
                            <NavLink to={"/orders"}
                                     className={getClasses}>
                                {({isActive}) => (
                                    <>
                                        <ListIcon type={isActive ? 'primary' : 'disabled'}/>
                                        <span>Лента заказов</span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                    </ul>
                </nav>


                <div className={style.logo}>
                    <Logo/>
                </div>

                <nav className={style.nav}>
                    <ul className={style.ul + ' ' + style.ulEnd}>
                        <li className={style.navItem}>
                            <NavLink to={"/profile"} className={getClasses}>
                                {({isActive}) => (
                                    <>
                                        <ProfileIcon type={isActive ? 'primary' : 'disabled'}/>
                                        <span>Личный кабинет</span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default AppHeader;
