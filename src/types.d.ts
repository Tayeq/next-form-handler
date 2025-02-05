interface FormSuccessState<T = unknown> {
    success: true;
    data: T;
    message?: string;
}

interface FormErrorState {
    success: false;
    errors?: string[];
    message: string
}

export type FormState<T = unknown> = FormSuccessState<T> | FormErrorState;

export type FormAction<T = unknown> = (
    state: FormState<T>,
    formData: FormData
) => Promise<FormState<T>>;