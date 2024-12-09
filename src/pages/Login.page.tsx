import {useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import AuthLink from "../components/Auth/AuthLink.tsx";
import {object, string, TypeOf} from "zod";
import {useAppDispatch} from "../hooks.ts";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import auth from "../utils/auth.ts";
import {setIsAuthChecked, setUser} from "../services/user.slice.ts";
import {setError} from "../services/error.slice.ts";
import AppLoadingIndicator from "../components/AppLoadingIndicator/AppLoadingIndicator.tsx";

const loginSchema = object({
    email: string()
        .min(1, 'Обязательно для заполнения')
        .email('Некорректный Email'),
    password: string()
        .min(1, 'Обязательно для заполнения'),
});

type LoginForm = TypeOf<typeof loginSchema>;

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const [passwordShow, setPasswordShow] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const methods = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const {
        handleSubmit,
        formState: {errors},
        control
    } = methods;

    const onSubmitHandler: SubmitHandler<LoginForm> = async values => {
        setIsSubmitting(true);

        try {
            const result = await auth.login(values.email, values.password);
            if (result.success) {
                localStorage.setItem("refreshToken", result.refreshToken);
                localStorage.setItem("accessToken", result.accessToken);
                dispatch(setIsAuthChecked(true));
                dispatch(setUser(result.user));
                setIsSubmitting(false);
            } else {
                dispatch(setError(result?.message ?? 'Ошибка при авторизации'));
                setIsSubmitting(false);
            }
        } catch (e: any) {
            console.error(e);
            dispatch(setError(e?.response?.data?.message ?? JSON.stringify(e)));
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <p className="text text_type_main-medium mb-5">
                Вход
            </p>

            <form
                className={'mb-20'}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 24,
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
                onSubmit={handleSubmit(onSubmitHandler)}
            >
                <Controller
                    name="email"
                    control={control}
                    render={({field}) => (
                        <Input
                            type={'email'}
                            placeholder={'E-mail'}
                            onChange={field.onChange}
                            value={field.value ?? ''}
                            name={'email'}
                            error={!!errors.email}
                            errorText={errors?.email?.message ?? ''}
                            disabled={isSubmitting}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({field}) => (
                        <Input
                            type={passwordShow ? 'text' : 'password'}
                            placeholder={'Пароль'}
                            icon={passwordShow ? 'HideIcon' : 'ShowIcon'}
                            onIconClick={() => setPasswordShow(!passwordShow)}
                            onChange={field.onChange}
                            value={field.value ?? ''}
                            name={'password'}
                            error={!!errors.password}
                            errorText={errors?.password?.message ?? ''}
                            disabled={isSubmitting}
                        />
                    )}
                />

                <Button htmlType="submit" type="primary" size="medium" extraClass="center" disabled={isSubmitting}>
                    {!isSubmitting && 'Войти'}

                    <AppLoadingIndicator loading={isSubmitting} size={15}/>
                </Button>
            </form>

            <div style={{textAlign: 'center'}}>
                <AuthLink text="Вы — новый пользователь?" linkText="Зарегистрироваться" link="/register"/>
                <AuthLink text="Забыли пароль?" linkText="Восстановить пароль" link="/forgot-password"/>
            </div>
        </>
    );
}

export default LoginPage;
