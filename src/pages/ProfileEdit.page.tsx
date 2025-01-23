import {object, string, TypeOf} from "zod";
import {useAppDispatch, useAppSelector} from "../hooks.ts";
import {FC, useEffect, useState} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {getUser, setUser} from "../services/user.slice.ts";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import AppLoadingIndicator from "../components/AppLoadingIndicator/AppLoadingIndicator.tsx";
import auth from "../utils/auth.ts";
import {setError} from "../services/error.slice.ts";
import style from './styles/Profile.module.css';
import {UserResponse} from "../types/userResponse.ts";
import {User} from "../types/user.ts";

const userUpdateSchema = object({
    name: string()
        .min(1, 'Обязательно для заполнения'),
    email: string()
        .min(1, 'Обязательно для заполнения')
        .email('Некорректный Email'),
    password: string().optional(),
});

type UserUpdateForm = TypeOf<typeof userUpdateSchema>;

const ProfileEditPage: FC = () => {
    const dispatch = useAppDispatch();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [passwordEdit, setPasswordEdit] = useState<boolean>(false);
    const [nameEdit, setNameEdit] = useState<boolean>(false);
    const [emailEdit, setEmailEdit] = useState<boolean>(false);
    const user: User | null = useAppSelector(getUser);

    const methods = useForm<UserUpdateForm>({
        resolver: zodResolver(userUpdateSchema),
    });

    const {
        handleSubmit,
        formState: {errors, isDirty},
        control,
        reset
    } = methods;

    useEffect(() => {
        reset(user ?? {});
    }, [reset, user]);

    const cancel = () => {
        reset(user ?? {});
        setPasswordEdit(false);
        setEmailEdit(false);
        setNameEdit(false);
    }

    const onSubmitHandler: SubmitHandler<UserUpdateForm> = async values => {
        setIsSubmitting(true);

        try {
            const result: UserResponse = await auth.updateUser(values);
            if (result.success) {
                dispatch(setUser(result.user));
                setIsSubmitting(false);
                setPasswordEdit(false);
                setEmailEdit(false);
                setNameEdit(false);
            } else {
                dispatch(setError(result?.message ?? 'Ошибка при обновлении пользователя'));
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
            <form
                className={style.profileEditForm + ' mb-20'}
                onSubmit={handleSubmit(onSubmitHandler)}
            >
                <Controller
                    name="name"
                    control={control}
                    render={({field}) => (
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            icon={!nameEdit ? 'EditIcon' : 'CloseIcon'}
                            onIconClick={() => setNameEdit(!nameEdit)}
                            onChange={field.onChange}
                            value={field.value ?? ''}
                            name={'name'}
                            error={!!errors.name}
                            errorText={errors?.name?.message ?? ''}
                            disabled={isSubmitting || !nameEdit}
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
                            icon={!emailEdit ? 'EditIcon' : 'CloseIcon'}
                            onIconClick={() => setEmailEdit(!emailEdit)}
                            onChange={field.onChange}
                            value={field.value ?? ''}
                            name={'email'}
                            error={!!errors.email}
                            errorText={errors?.email?.message ?? ''}
                            disabled={isSubmitting || !emailEdit}
                            autoComplete="email"
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({field}) => (
                        <Input
                            type={'password'}
                            placeholder={'Пароль'}
                            icon={!passwordEdit ? 'EditIcon' : 'CloseIcon'}
                            onIconClick={() => setPasswordEdit(!passwordEdit)}
                            onChange={field.onChange}
                            value={field.value ?? ''}
                            name={'password'}
                            error={!!errors.password}
                            errorText={errors?.password?.message ?? ''}
                            disabled={isSubmitting || !passwordEdit}
                            autoComplete="new-password"
                        />
                    )}
                />

                {
                    isDirty && (nameEdit || emailEdit || passwordEdit) &&
                    <div className={style.profileEditBtnWrapper}>
                        <Button htmlType="button" type="secondary" size="medium" extraClass="center"
                                disabled={isSubmitting} onClick={cancel}>
                            Отмена
                        </Button>

                        <Button htmlType="submit" type="primary" size="medium" extraClass="center"
                                disabled={isSubmitting}>
                            {!isSubmitting && 'Сохранить'}

                            <AppLoadingIndicator loading={isSubmitting} size={15}/>
                        </Button>
                    </div>
                }

            </form>
        </>
    );
}

export default ProfileEditPage;
