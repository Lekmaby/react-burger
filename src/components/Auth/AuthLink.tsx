import {Link} from "react-router-dom";
import {FC} from "react";

type AuthLinkProps = {
    text: string;
    link: string;
    linkText: string;
};

const AuthLink: FC<AuthLinkProps> = ({text, link, linkText}) => {
    return (
        <p className="text text_type_main-default text_color_inactive mb-4">
            <span className="mr-2">{text}</span>
            <Link to={link}>{linkText}</Link>
        </p>
    );
}

export default AuthLink;
