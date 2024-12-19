import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients.tsx";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor.tsx";
import {FC} from "react";

const HomePage: FC = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 40,
            justifyContent: 'space-between',
            margin: '0 auto',
            height: '100%',
            width: '100%'
        }}>
            <BurgerIngredients/>
            <BurgerConstructor/>
        </div>
    );
}

export default HomePage;
