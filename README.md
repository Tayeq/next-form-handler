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

## 🛠 Features
✔️ **Handles form state** (success, error, validation)  
✔️ **Works with server actions** in Next.js  
✔️ **Customizable success and error handlers**  
✔️ **Supports different notification libraries**  
✔️ **shadcn/ui integration**

---

## 📜 License
MIT

---