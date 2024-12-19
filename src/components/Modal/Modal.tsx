import React, {FC, ReactNode, useEffect} from "react";
import style from './Modal.module.css';
import {createPortal} from "react-dom";
import ModalHeader from "./ModalHeader.tsx";
import ModalOverlay from "../ModalOverlay/ModalOverlay.tsx";

const modalRoot: HTMLElement | null = document.getElementById("react-modals");

type ModalProps = {
    title?: string;
    children: ReactNode;
    onClose: () => void
};

const Modal: FC<ModalProps> = ({title = '', children, onClose}) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    if (!modalRoot) {
        console.error('No modalRoot element with id="react-modals"');
        return;
    }

    return createPortal(
        (
            <>
                <div className={style.Modal}>
                    <ModalHeader onClose={onClose}>{title}</ModalHeader>
                    {children}
                </div>

                <ModalOverlay onClose={onClose}/>
            </>
        ),
        modalRoot
    );
}

export default React.memo(Modal);
