import {startTransition, useActionState, useEffect, useMemo} from 'react';
import {type ZodIssue} from 'zod'

export interface FormSuccessState<T = unknown> {
    success: true;
    data?: T;
    message?: string;
}

export interface FormErrorState {
    success: false;
    error: string
    validationErrors?: ZodIssue[];
}

export type FormState<T = unknown> = (FormSuccessState<T> | FormErrorState) & {
    timestamp?: number;
};

export type FormAction<T = unknown> = (
    state: FormState<T>,
    formData: FormData
) => Promise<FormState<T>>;


export type UseFormHandlerReturn<T = unknown> = {
    formAction: (payload: FormData) => void;
    isPending: boolean;
    state: FormState<T>;
}

export const useFormHandler = <T = unknown>(
    action: FormAction<T>,
    onSuccess?: (state: FormSuccessState<T>) => void,
    onError?: (state: FormErrorState) => void
): UseFormHandlerReturn<T> => {
    const actionWithTimestamp: FormAction<T> = async (state, formData) => ({
        ...(await action(state, formData)),
        timestamp: Date.now(),
    });

    const [formState, formAction, isProcessing] = useActionState(actionWithTimestamp, {
        success: false,
    } as FormState<T>);

    useEffect(() => {
        if (!formState?.timestamp)  return;
        if (formState.success) {
            onSuccess?.(formState);
        } else {
            onError?.(formState);
        }
    }, [formState]);

    return {
        formAction,
        isPending: useMemo(() => isProcessing, [isProcessing]),
        state: formState,
    };
};

export function mapToFormData(data: Record<string, unknown>): FormData {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    formData.append(`${key}[${index}]`, String(item));
                });
            } else if (typeof value === 'object') {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, String(value));
            }
        }
    });
    return formData;
}

export function createSubmitHandler(
    formAction: (formData: FormData) => void,
): (data: Record<string, unknown>) => void {
    return (data: Record<string, unknown>) => {
        const formData = mapToFormData(data);
        startTransition(() => {
            formAction(formData);
        });
    };
}