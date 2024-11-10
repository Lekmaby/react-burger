import React from "react";
import style from './ModalOverlay.module.css';

type ModalOverlayProps = {
    onClose: () => void
};

const ModalOverlay = ({onClose}: ModalOverlayProps) => {
    return (
        <div className={style.ModalOverlay} onClick={onClose}>
        </div>
    );
}

export default React.memo(ModalOverlay);
