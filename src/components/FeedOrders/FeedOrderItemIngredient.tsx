import {FC} from "react";
import style from './FeedOrders.module.css';

type FeedOrderItemIngredientProps = {
    url: string,
    alt?: string,
    position?: number,
    last?: number
};

const FeedOrderItemIngredient: FC<FeedOrderItemIngredientProps> = ({url, alt = '', last = 0, position = 0}) => {
    return (
        <div
            className={style.IngredientContainer}
            style={{
                marginLeft: position > 0 ? -16 : 0,
                zIndex: 6 - position,
            }}
            title={alt}
        >
            <img src={url}
                 alt={alt}
                 className={style.IngredientImage}
                 style={{
                     opacity: last ? 0.6 : 1
                 }}
            />

            {
                last > 0 &&
                <div className={style.IngredientOverlayText}>
                    <p className="text text_type_digits-default">+{last}</p>
                </div>
            }
        </div>
    );
}

export default FeedOrderItemIngredient;
