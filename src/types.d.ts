export interface FormSuccessState<T = unknown> {
    success: true;
    data?: T;
    message?: string;
}

export interface FormErrorState {
    success: false;
    error: string
    errors?: string[];
}

export type FormState<T = unknown> = (FormSuccessState<T> | FormErrorState);

export type FormAction<T = unknown> = (
    state: FormState<T>,
    formData: FormData
) => Promise<FormState<T>>;