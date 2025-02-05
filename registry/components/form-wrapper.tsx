"use client";

import {createContext, PropsWithChildren, ReactElement, useContext} from "react";
import type {FieldValues, UseFormReturn} from "react-hook-form";
import {Form} from "@/components/ui/form";
import {toast} from "sonner"
import {
    createSubmitHandler,
    type FormAction,
    FormErrorState,
    FormSuccessState,
    useFormHandler,
    UseFormHandlerReturn,
} from "next-form-handler";

export interface FormWrapperProps<TData, TFieldValues extends FieldValues> extends PropsWithChildren {
    action: FormAction<TData>;
    form: UseFormReturn<TFieldValues>;
    onSuccess?: (state: FormSuccessState<TData>) => void;
    onError?: (state: FormErrorState) => void;
}

const FormWrapperContext = createContext<UseFormHandlerReturn>({} as UseFormHandlerReturn);

export function FormWrapper<TData, TFieldValues extends FieldValues>({
                                                                         action,
                                                                         form,
                                                                         children,
                                                                         onSuccess,
                                                                         onError
                                                                     }: FormWrapperProps<TData, TFieldValues>): ReactElement {

    const formHandler = useFormHandler<TData>(action, (state) => {
        onSuccess?.(state);
        if (state.message) {
            toast.success(state.message);
        }
    }, (state) => {
        onError?.(state);
        toast.error(state.error);
    });
    const onSubmit = form.handleSubmit(createSubmitHandler(formHandler.formAction));

    return (
        <FormWrapperContext.Provider value={formHandler}>
            <Form {...form}>
                <form onSubmit={onSubmit}>{children}</form>
            </Form>
        </FormWrapperContext.Provider>
    );
}

export function useFormWrapper() {
    return useContext(FormWrapperContext);
}
