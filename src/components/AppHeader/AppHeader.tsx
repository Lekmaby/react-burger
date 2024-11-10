import style from './AppHeader.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
    return (
        <header className={style.header}>
            <div className={style.headerContent}>
                <nav className={style.nav}>
                    <ul className={style.ul}>
                        <li className={style.navItem}>
                            <a href="#" className={style.navLink + ' text text_type_main-default'}>
                                <BurgerIcon type="primary"/>
                                <span>Конструктор</span>
                            </a>
                        </li>
                        <li className={style.navItem}>
                            <a href="#" className={style.navLink + ' text text_type_main-default text_color_inactive'}>
                                <ListIcon type="disabled"/>
                                <span>Лента заказов</span>
                            </a>
                        </li>
                    </ul>
                </nav>


                <div className={style.logo}>
                    <Logo/>
                </div>

                <nav className={style.nav}>
                    <ul className={style.ul + ' ' + style.ulEnd}>
                        <li className={style.navItem}>
                            <a href="#" className={style.navLink + ' text text_type_main-default text_color_inactive'}>
                                <ProfileIcon type="disabled"/>
                                <span>Личный кабинет</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default AppHeader;
