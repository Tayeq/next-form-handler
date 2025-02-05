import { FormAction, FormErrorState, FormState, FormSuccessState } from "./types";
type UseFormHandlerReturn<T = unknown> = {
    formAction: (payload: FormData) => void;
    isPending: boolean;
    state: FormState<T>;
};
export declare const useFormHandler: <T = unknown>(action: FormAction<T>, onSuccess?: (state: FormSuccessState<T>) => void, onError?: (state: FormErrorState) => void) => UseFormHandlerReturn<T>;
export declare function mapToFormData(data: Record<string, unknown>): FormData;
export declare function createSubmitHandler(formAction: (formData: FormData) => void): (data: Record<string, unknown>) => void;
export {};
