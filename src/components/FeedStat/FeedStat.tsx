import {FC, useMemo} from "react";
import style from './FeedStat.module.css';
import {useAppSelector} from "../../hooks.ts";
import {getFeedOrders, getFeedTotal, getFeedTotalToday} from "../../services/feed.slice.ts";

function chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

const FeedStat: FC = () => {
    const orders = useAppSelector(getFeedOrders);
    const total = useAppSelector(getFeedTotal);
    const totalToday = useAppSelector(getFeedTotalToday);

    const done = useMemo(() => chunkArray(orders.filter(x => x.status === 'done').map(x => x.number), 10), [orders]);
    const pending = useMemo(() => chunkArray(orders.filter(x => x.status === 'pending').map(x => x.number), 10), [orders]);

    return (
        <section className={style.FeedStatContainer}>
            <div className={style.FeedStatOrders}>
                <div>
                    <p className="text text_type_main-medium mb-6">
                        Готовы:
                    </p>
                    <div style={{display: "flex", gap: 8}}>
                        {done.map((chunk, index) => (
                            <div key={`done-column-${index}`}>
                                {chunk.map(order => (
                                    <div className={'text text_type_digits-default pb-2 ' + style.readyOrderNumber}
                                         key={order}>{order}</div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <p className="text text_type_main-medium mb-6">
                        В&nbsp;работе:
                    </p>
                    <div style={{display: "flex", gap: 8}}>
                        {pending.map((chunk, index) => (
                            <div key={`pending-column-${index}`}>
                                {chunk.map(order => (
                                    <div className={'text text_type_digits-default pb-2'} key={order}>{order}</div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <p className="text text_type_main-medium">
                    Выполнено за все время:
                </p>

                <p className={'text text_type_digits-large ' + style.statNumber}>
                    {total}
                </p>
            </div>

            <div>
                <p className="text text_type_main-medium">
                    Выполнено за сегодня:
                </p>

                <p className={'text text_type_digits-large ' + style.statNumber}>
                    {totalToday}
                </p>
            </div>

        </section>
    );
}

export default FeedStat;
