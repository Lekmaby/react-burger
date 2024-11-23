import {useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShow, setPasswordShow] = useState(false);

    return (
        <>
            <p className="text text_type_main-medium mb-5">
                Вход
            </p>

            <form action="" className={'mb-20'} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    onChange={e => setEmail(e.target.value)}
                    value={email ?? ''}
                    name={'email'}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                />

                <Input
                    type={passwordShow ? 'text' : 'password'}
                    placeholder={'Пароль'}
                    onChange={e => setPassword(e.target.value)}
                    icon={passwordShow ? 'HideIcon' : 'ShowIcon'}
                    onIconClick={() => setPasswordShow(!passwordShow)}
                    value={password ?? ''}
                    name={'password'}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                />

                <Button htmlType="button" type="primary" size="medium" extraClass="center">
                    Войти
                </Button>
            </form>

            <div style={{textAlign: 'center'}}>
                <p className="text text_type_main-default text_color_inactive mb-4">
                    <span className="mr-2">Вы — новый пользователь?</span>
                    <Link to={'/register'}>Зарегистрироваться</Link>
                </p>

                <p className="text text_type_main-default text_color_inactive mb-4">
                    <span className="mr-2">Забыли пароль? </span>
                    <Link to={'/forgot-password'}>Восстановить пароль</Link>
                </p>
            </div>
        </>
    );
}

export default LoginPage;
