import IngredientDetails from "../components/IngredientDetails/IngredientDetails.tsx";

const IngredientPage = () => {
    return (
        <div>
            <p className="text text_type_main-large mt-10 mb-5" style={{textAlign: 'center'}}>
                Детали ингредиента
            </p>

            <IngredientDetails/>
        </div>
    );
}

export default IngredientPage;