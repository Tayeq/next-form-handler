export interface FormSuccessState<T = unknown> {
    success: true;
    data?: T;
    message?: string;
}
export interface FormErrorState {
    success: false;
    error: string;
    errors?: string[];
}
export type FormState<T = unknown> = (FormSuccessState<T> | FormErrorState);
export type FormAction<T = unknown> = (state: FormState<T>, formData: FormData) => Promise<FormState<T>>;
export type UseFormHandlerReturn<T = unknown> = {
    formAction: (payload: FormData) => void;
    isPending: boolean;
    state: FormState<T>;
};
export declare const useFormHandler: <T = unknown>(action: FormAction<T>, onSuccess?: (state: FormSuccessState<T>) => void, onError?: (state: FormErrorState) => void) => UseFormHandlerReturn<T>;
export declare function mapToFormData(data: Record<string, unknown>): FormData;
export declare function createSubmitHandler(formAction: (formData: FormData) => void): (data: Record<string, unknown>) => void;
