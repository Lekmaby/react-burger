import {useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [passwordShow, setPasswordShow] = useState(false);

    return (
        <>
            <p className="text text_type_main-medium mb-5">
                Восстановление пароля
            </p>

            <form action="" className={'mb-20'} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>

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

                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => setCode(e.target.value)}
                    value={code ?? ''}
                    name={'code'}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                />

                <Button htmlType="button" type="primary" size="medium" extraClass="center">
                    Сохранить
                </Button>
            </form>

            <div style={{textAlign: 'center'}}>
                <p className="text text_type_main-default text_color_inactive mb-4">
                    <span className="mr-2">Вспомнили пароль?</span>
                    <Link to={'/login'}>Войти</Link>
                </p>
            </div>
        </>
    );
}

export default ResetPasswordPage;
