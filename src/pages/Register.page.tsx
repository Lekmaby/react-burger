import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import AuthLink from "../components/Auth/AuthLink.tsx";
import {object, string, TypeOf} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import AppLoadingIndicator from "../components/AppLoadingIndicator/AppLoadingIndicator.tsx";
import auth from "../utils/auth.ts";
import {useAppDispatch} from "../hooks.ts";
import {setIsAuthChecked, setUser} from "../services/user.slice.ts";
import {setError} from "../services/error.slice.ts";
import style from './styles/Auth.module.css';

const registerSchema = object({
    name: string()
        .min(1, 'Обязательно для заполнения'),
    email: string()
        .min(1, 'Обязательно для заполнения')
        .email('Некорректный Email'),
    password: string()
        .min(1, 'Обязательно для заполнения'),
});

type RegisterForm = TypeOf<typeof registerSchema>;

const RegisterPage = () => {
    const dispatch = useAppDispatch();
    const [passwordShow, setPasswordShow] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const methods = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
    });

    const {
        handleSubmit,
        formState: {errors},
        control
    } = methods;

    const onSubmitHandler: SubmitHandler<RegisterForm> = async values => {
        setIsSubmitting(true);

        try {
            const result = await auth.register(values.email, values.password, values.name);
            if (result.success) {
                localStorage.setItem("refreshToken", result.refreshToken);
                localStorage.setItem("accessToken", result.accessToken);
                dispatch(setIsAuthChecked(true));
                dispatch(setUser(result.user));
                setIsSubmitting(false);
            } else {
                dispatch(setError(result?.message ?? 'Ошибка при регистрации'));
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
                Регистрация
            </p>

            <form
                className={style.authForm + ' mb-20'}
                onSubmit={handleSubmit(onSubmitHandler)}
            >
                <Controller
                    name="name"
                    control={control}
                    render={({field}) => (
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={field.onChange}
                            value={field.value ?? ''}
                            name={'name'}
                            error={!!errors.name}
                            errorText={errors?.name?.message ?? ''}
                            disabled={isSubmitting}
                            autoComplete="name"
                        />
                    )}
                />

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
                            autoComplete="email"
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
                            autoComplete="new-password"
                        />
                    )}
                />

                <Button htmlType="submit" type="primary" size="medium" extraClass="center" disabled={isSubmitting}>
                    {!isSubmitting && 'Зарегистрироваться'}

                    <AppLoadingIndicator loading={isSubmitting} size={15}/>
                </Button>
            </form>

            <div className={style.authLinkWrapper}>
                <AuthLink text="Уже зарегистрированы?" linkText="Войти" link="/login"/>
            </div>
        </>
    );
}

export default RegisterPage;
