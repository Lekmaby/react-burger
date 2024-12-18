import React, {FC} from "react";
import style from './AppError.module.css';

type AppErrorProps = {
    message: string;
};

const AppError: FC<AppErrorProps> = ({message}) => {
    return (
        <section className={style.errorWrapper}>
            <pre className="text text_type_main-default text_color_error m-5">{message}</pre>
        </section>
    );
}

export default React.memo(AppError);
