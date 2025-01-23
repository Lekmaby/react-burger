import style from './BurgerConstructor.module.css';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Ingredient} from "../../types/ingredient.ts";
import {useAppDispatch} from "../../hooks.ts";
import {moveIngredient, removeIngredient} from "../../services/burgerConstructor.slice.ts";
import {FC, useRef} from "react";
import {useDrag, useDrop} from "react-dnd";
import type {Identifier, XYCoord} from 'dnd-core';

interface DragItem {
    index: number
    id: string
}

type BurgerConstructorIngredientProps = {
    ingredient: Ingredient,
    index: number
};

const BurgerConstructorIngredient: FC<BurgerConstructorIngredientProps> = ({ingredient, index}) => {
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLLIElement>(null)

    const [{handlerId}, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: 'ConstructorIngredient',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index ?? 0;
            const hoverIndex = index;

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            dispatch(moveIngredient({fromIndex: dragIndex, toIndex: hoverIndex}));

            item.index = hoverIndex;
        },
    })

    const [{isDragging}, drag] = useDrag({
        type: 'ConstructorIngredient',
        item: () => {
            return {id: ingredient._key, index}
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0 : 1;

    drag(drop(ref));

    return (
        <li className={style.BurgerConstructorMiddleIngredient}
            ref={ref}
            style={{opacity}}
            data-handler-id={handlerId}
        >
            <DragIcon type="primary"
                      className={style.draggable}
            />
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
                handleClose={() => {
                    dispatch(removeIngredient(ingredient))
                }}
            />
        </li>
    );
}

export default BurgerConstructorIngredient;
