import style from './BurgerConstructor.module.css';
import React, {FC} from "react";

type BurgerConstructorNoIngredientProps = {
    type?: 'bottom' | 'top',
    text: string,
    styles?: React.CSSProperties
};

const BurgerConstructorNoIngredient: FC<BurgerConstructorNoIngredientProps> = ({type, text, styles = {}}) => {

    return (
        <div
            className={style.EmptyIngredient + ' ' +
                (type === 'top' ? style.EmptyIngredientTop : '') +
                (type === 'bottom' ? style.EmptyIngredientBottom : '')
            }
            style={styles}
        >
            <div className={style.EmptyIngredientContainer}>
                <p className="text text_type_main-default">{text}</p>
            </div>
        </div>
    );
}

export default BurgerConstructorNoIngredient;
