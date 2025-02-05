'use client';

import { startTransition, useActionState, useEffect, useMemo } from 'react';
import {FormAction, FormState} from "./types";
import {z, ZodSchema} from "zod";

type UseFormHandlerReturn<T = unknown> = FormState<T> & {
    formAction: (payload: FormData) => void;
    isPending: boolean;
}

export const useFormHandler = <T = unknown>(
    action: FormAction<T>,
    onSuccess?: (data: T) => void,
    onError?: (error: Error) => void
): UseFormHandlerReturn<T> => {
    const actionWithTimestamp: FormAction<T> = async (state, formData) => ({
        ...(await action(state, formData)),
        timestamp: Date.now(),
    });

    const [formState, formAction, isProcessing] = useActionState(actionWithTimestamp, {
        success: false,
    } as FormState<T>);

    useEffect(() => {
        if (formState.message) {
            if (formState.success) {
                onSuccess?.(formState.data ?? ({} as T));
            } else {
                onError?.(new Error(formState.message));
            }
        }
    }, [formState]);

    return {
        formAction,
        isPending: useMemo(() => isProcessing, [isProcessing]),
        ...formState,
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