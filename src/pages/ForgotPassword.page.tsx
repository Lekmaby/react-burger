import {useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import AuthLink from "../components/Auth/AuthLink.tsx";
import {object, string, TypeOf} from "zod";
import {useAppDispatch} from "../hooks.ts";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import auth from "../utils/auth.ts";
import {setError} from "../services/error.slice.ts";
import AppLoadingIndicator from "../components/AppLoadingIndicator/AppLoadingIndicator.tsx";
import {useNavigate} from "react-router-dom";
import style from "./styles/Auth.module.css";

const forgotPasswordSchema = object({
    email: string()
        .min(1, 'Обязательно для заполнения')
        .email('Некорректный Email'),
});

type ForgotPasswordForm = TypeOf<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const methods = useForm<ForgotPasswordForm>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const {
        handleSubmit,
        formState: {errors},
        control
    } = methods;

    const onSubmitHandler: SubmitHandler<ForgotPasswordForm> = async values => {
        setIsSubmitting(true);

        try {
            const result = await auth.passwordReset(values.email);
            if (result.success) {
                localStorage.setItem("forgotPassword", '1');
                navigate('/reset-password');
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
                    name="email"
                    control={control}
                    render={({field}) => (
                        <Input
                            type={'email'}
                            placeholder={'Укажите e-mail'}
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

                <Button htmlType="submit" type="primary" size="medium" extraClass="center" disabled={isSubmitting}>
                    {!isSubmitting && 'Восстановить'}

                    <AppLoadingIndicator loading={isSubmitting} size={15}/>
                </Button>
            </form>

            <div className={style.authLinkWrapper}>
                <AuthLink text="Вспомнили пароль?" linkText="Войти" link="/login"/>
            </div>
        </>
    );
}

export default ForgotPasswordPage;
