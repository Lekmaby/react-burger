import React, {FC, ReactNode} from "react";
import style from './Modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

type ModalHeaderProps = {
    children: ReactNode;
    onClose: () => void
};

const ModalHeader: FC<ModalHeaderProps> = ({children, onClose}) => {
    return (
        <div className={style.ModalHeader}>
            <div className={style.ModalHeaderTitle + ' text text_type_main-large'}>
                {children}
            </div>
            <div className={style.ModalHeaderClose}>
                <CloseIcon type="primary" onClick={onClose}/>
            </div>
        </div>
    );
}

export default React.memo(ModalHeader);
