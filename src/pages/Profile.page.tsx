import {Outlet} from "react-router-dom";

const ProfilePage = () => {
    return (
        <>
            <p className="text text_type_main-large mt-10 mb-5">
                Профиль
            </p>

            <Outlet/>
        </>
    );
}

export default ProfilePage;
