import {FC} from "react";

const ProfileOrdersPage: FC = () => {
    return (
        <div>
            <p className="text text_type_main-large mb-5">
                История заказов
            </p>

            <div className="text text_type_main-default mt-10 mb-5">
                <ol>
                    <li>Заказ 1</li>
                    <li>Заказ 2</li>
                    <li>Заказ 3</li>
                    <li>Заказ 4</li>
                    <li>Заказ 5</li>
                </ol>
            </div>
        </div>
    );
}

export default ProfileOrdersPage;
