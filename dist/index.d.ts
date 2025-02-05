import { FormAction, FormState } from "./types";
import { z, ZodSchema } from "zod";
type UseFormHandlerReturn<T = unknown> = FormState<T> & {
    formAction: (payload: FormData) => void;
    isPending: boolean;
};
export declare const useFormHandler: <T = unknown>(action: FormAction<T>, onSuccess?: (data: T) => void, onError?: (error: Error) => void) => UseFormHandlerReturn<T>;
export declare function mapToFormData(data: Record<string, unknown>): FormData;
export declare function createSubmitHandler<T extends ZodSchema>(formAction: (formData: FormData) => void): (data: z.infer<T>) => void;
export {};
