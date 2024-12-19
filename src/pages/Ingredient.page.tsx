import IngredientDetails from "../components/IngredientDetails/IngredientDetails.tsx";
import {FC} from "react";

const IngredientPage: FC = () => {
    return (
        <div>
            <p className="text text_type_main-large mb-6" style={{textAlign: 'center'}}>
                Детали ингредиента
            </p>

            <IngredientDetails/>
        </div>
    );
}

export default IngredientPage;
