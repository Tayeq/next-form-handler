"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFormHandler = void 0;
exports.mapToFormData = mapToFormData;
exports.createSubmitHandler = createSubmitHandler;
const react_1 = require("react");
const useFormHandler = (action, onSuccess, onError) => {
    const actionWithTimestamp = async (state, formData) => (Object.assign(Object.assign({}, (await action(state, formData))), { timestamp: Date.now() }));
    const [formState, formAction, isProcessing] = (0, react_1.useActionState)(actionWithTimestamp, {
        success: false,
    });
    (0, react_1.useEffect)(() => {
        if (!(formState === null || formState === void 0 ? void 0 : formState.timestamp))
            return;
        if (formState.success) {
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(formState);
        }
        else {
            onError === null || onError === void 0 ? void 0 : onError(formState);
        }
    }, [formState]);
    return {
        formAction,
        isPending: (0, react_1.useMemo)(() => isProcessing, [isProcessing]),
        state: formState,
    };
};
exports.useFormHandler = useFormHandler;
function mapToFormData(data) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    formData.append(`${key}[${index}]`, String(item));
                });
            }
            else if (typeof value === 'object') {
                formData.append(key, JSON.stringify(value));
            }
            else {
                formData.append(key, String(value));
            }
        }
    });
    return formData;
}
function createSubmitHandler(formAction) {
    return (data) => {
        const formData = mapToFormData(data);
        (0, react_1.startTransition)(() => {
            formAction(formData);
        });
    };
}
