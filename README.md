# 🚀 next-form-handler

**next-form-handler** is a lightweight and flexible library for managing forms in **Next.js** applications.  
It simplifies form state management, validation, and handling of success and error events.

---

## 📦 Installation

### ✅ Install as an npm package

If you want to use **next-form-handler** in your Next.js or React project, install it via:

#### **Using npm:**
```bash
npm install next-form-handler
```

#### **Using bun:**
```bash
bun add next-form-handler
```

---

## ⚡ Usage

### 🔹 **Use `useFormHandler` in a component**

```tsx
'use client';

import { createSubmitHandler, useFormHandler } from "next-form-handler";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
    name: z.string()
});

export default function Form() {
    const { formAction, isPending } = useFormHandler(
        async (_, formData) => {
            // Simulating API request
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return { success: true, message: "Form submitted successfully!" };
        },
        ({ message }) => {
            if (message) {
                toast.success(message);
            }
        },
        ({ error }) => {
            toast.error(error);
        }
    );

    const { handleSubmit, register } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit(createSubmitHandler(formAction));

    return (
        <form onSubmit={onSubmit}>
            <input type="text" {...register('name')} placeholder="Enter your name" />
            <button type="submit" disabled={isPending}>
                {isPending ? 'Loading...' : 'Send'}
            </button>
        </form>
    );
}
```

---

## 🎨 Install as a shadcn/ui component

If you're using **shadcn/ui**, you can install the `FormWrapper` component directly:

```bash
bunx shadcn@latest add https://raw.githubusercontent.com/Tayeq/next-form-handler/refs/heads/main/public/r/form-wrapper.json
```

This will add the **FormWrapper** component, which integrates seamlessly with **next-form-handler** and **shadcn/ui** styles.

---

## 🔥 Example Usage

### `form.tsx`
```tsx
'use client'

import {submitForm} from "./actions";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {FormWrapper, useFormWrapper} from "@/components/form-wrapper";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const schema = z.object({
    name: z.string().min(3).max(255)
})

export default function Form() {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: ''
        }
    })
    return (
        <FormWrapper action={submitForm} form={form} onSuccess={({data}) => {
            {
                form.reset(data)
                console.log(data)
            }
        }}>
            <FormField name={'name'} render={({field}) => (
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>
            <SubmitButton/>
        </FormWrapper>
    )
}

const SubmitButton = () => {
    const {isPending} = useFormWrapper();
    return (
        <Button disabled={isPending} type={'submit'}>{isPending ? 'Loading' : 'Submit'}</Button>
    )
}
```

### `actions.ts`
```tsx
'use server'

import {FormAction} from "next-form-handler";

export const submitForm: FormAction<{
    name: string,
}> = async (state, formData) => {
    if(Math.random() > 0.5){
        return {
            success: false,
            error: 'Failed to submit form'
        }
    }

    const name = formData.get('name') as string;
    const upperCaseName = name.toUpperCase();

    return {
        success: true,
        message: 'Form submitted successfully',
        data: {
            name: upperCaseName
        }
    }
}
```

---

## 🛠 Features
✔️ **Handles form state** (success, error, validation)  
✔️ **Works with server actions** in Next.js  
✔️ **Customizable success and error handlers**  
✔️ **Supports different notification libraries**  
✔️ **shadcn/ui integration**

---

## 📜 License
MIT

