"use client";

import type {PropsWithChildren, ReactElement} from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { createSubmitHandler, useFormHandler, type FormAction } from "next-form-handler";

export interface FormWrapperProps<T extends FieldValues> extends PropsWithChildren{
    action: FormAction<T>;
    form: UseFormReturn<T>;
    onSuccess?: () => void;
}

export function FormWrapper<T extends FieldValues>({
                                                       action,
                                                       form,
                                                       children,
                                                       onSuccess: onBaseSuccess,
                                                   }: FormWrapperProps<T>): ReactElement {
    const onSuccess = (data: T) => {
        form.reset(data);
        onBaseSuccess?.();
    };

    const { formAction } = useFormHandler(action, onSuccess);

    const onSubmit = form.handleSubmit(createSubmitHandler(formAction));

    return (
        <Form {...form}>
            <form onSubmit={onSubmit}>{children}</form>
        </Form>
    );
}
