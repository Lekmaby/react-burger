import React, {FC} from "react";
import style from './ModalOverlay.module.css';

type ModalOverlayProps = {
    onClose: () => void
};

const ModalOverlay: FC<ModalOverlayProps> = ({onClose}) => {
    return (
        <div className={style.ModalOverlay} onClick={onClose} data-cy="modal-overlay">
        </div>
    );
}

export default React.memo(ModalOverlay);
