import React from "react";
import style from './AppLoadingIndicator.module.css';

type AppLoaderProps = {
    loading?: boolean;
};

const AppLoadingIndicator = ({loading = true}: AppLoaderProps) => {

    if (!loading) {
        return null;
    }
    
    return (
        <section className={style.loaderWrapper}>
            <div className={style.loader}></div>
        </section>
    );
}

export default React.memo(AppLoadingIndicator);