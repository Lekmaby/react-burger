import {useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');

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
                    type={'email'}
                    placeholder={'Укажите e-mail'}
                    onChange={e => setEmail(e.target.value)}
                    value={email ?? ''}
                    name={'email'}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                />

                <Button htmlType="button" type="primary" size="medium" extraClass="center">
                    Восстановить
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

export default ForgotPasswordPage;
