import {useEffect, useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import AuthLink from "../components/Auth/AuthLink.tsx";
import {object, string, TypeOf} from "zod";
import {useAppDispatch} from "../hooks.ts";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import auth from "../utils/auth.ts";
import {setError} from "../services/error.slice.ts";
import {useNavigate} from "react-router-dom";
import AppLoadingIndicator from "../components/AppLoadingIndicator/AppLoadingIndicator.tsx";
import style from './styles/Auth.module.css';

const resetPasswordSchema = object({
    code: string()
        .min(1, 'Обязательно для заполнения'),
    password: string()
        .min(1, 'Обязательно для заполнения'),
});

type ResetPasswordForm = TypeOf<typeof resetPasswordSchema>;

const ResetPasswordPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [passwordShow, setPasswordShow] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const forgotPassword = localStorage.getItem("forgotPassword");
        if (forgotPassword !== '1') {
            navigate('/forgot-password');
        }
    }, [navigate]);

    const methods = useForm<ResetPasswordForm>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const {
        handleSubmit,
        formState: {errors},
        control
    } = methods;

    const onSubmitHandler: SubmitHandler<ResetPasswordForm> = async values => {
        setIsSubmitting(true);

        try {
            const result = await auth.passwordResetReset(values.password, values.code);
            if (result.success) {
                localStorage.removeItem("forgotPassword");
                navigate('/login');
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
                Восстановление пароля
            </p>

            <form
                className={style.authForm + ' mb-20'}
                onSubmit={handleSubmit(onSubmitHandler)}
            >

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

                <Controller
                    name="code"
                    control={control}
                    render={({field}) => (
                        <Input
                            type={'text'}
                            placeholder={'Введите код из письма'}
                            onChange={field.onChange}
                            value={field.value ?? ''}
                            name={'name'}
                            error={!!errors.code}
                            errorText={errors?.code?.message ?? ''}
                            disabled={isSubmitting}
                        />
                    )}
                />

                <Button htmlType="submit" type="primary" size="medium" extraClass="center" disabled={isSubmitting}>
                    {!isSubmitting && 'Сохранить'}

                    <AppLoadingIndicator loading={isSubmitting} size={15}/>
                </Button>
            </form>

            <div className={style.authLinkWrapper}>
                <AuthLink text="Вспомнили пароль?" linkText="Войти" link="/login"/>
            </div>
        </>
    );
}

export default ResetPasswordPage;
