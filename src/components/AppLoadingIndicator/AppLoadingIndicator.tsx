import React, {FC, useMemo} from "react";
import style from './AppLoadingIndicator.module.css';

type AppLoaderProps = {
    loading?: boolean;
    size?: number;
};

const AppLoadingIndicator: FC<AppLoaderProps> = ({loading = true, size = 30}) => {
    const spinnerWidth = useMemo(() => Math.round(size / 3), [size])

    if (!loading) {
        return null;
    }

    return (
        <section className={style.loaderWrapper}>
            <div className={style.loader}
                 data-testid="app-loader"
                 style={{
                     width: size,
                     height: size,
                     borderWidth: spinnerWidth,
                     borderTopWidth: spinnerWidth
                 }}></div>
        </section>
    );
}

export default React.memo(AppLoadingIndicator);
