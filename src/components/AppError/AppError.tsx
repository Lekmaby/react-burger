import React from "react";
import style from './AppError.module.css';

type AppErrorProps = {
    message: string;
};

const AppError = ({message}: AppErrorProps) => {
    if (!message?.length) {
        return null;
    }

    return (
        <section className={style.errorWrapper}>
            <p className="text text_type_main-default text_color_error m-5">{message}</p>
        </section>
    );
}

export default React.memo(AppError);