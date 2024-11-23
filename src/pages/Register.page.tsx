import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {useState} from "react";

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShow, setPasswordShow] = useState(false);

    return (
        <>
            <p className="text text_type_main-medium mb-5">
                Регистрация
            </p>

            <form action="" className={'mb-20'} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setName(e.target.value)}
                    value={name ?? ''}
                    name={'name'}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                />

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
                    Зарегистрироваться
                </Button>
            </form>

            <div style={{textAlign: 'center'}}>
                <p className="text text_type_main-default text_color_inactive mb-4">
                    <span className="mr-2">Уже зарегистрированы?</span>
                    <Link to={'/login'}>Войти</Link>
                </p>
            </div>
        </>
    );
}

export default RegisterPage;
