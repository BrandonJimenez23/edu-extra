import { useState } from "react";

export default function useApiRequest() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const executeRequest = async (requestFn, successMsg = null) => {
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            const response = await requestFn();
            if (successMsg) setMessage({ type: "success", text: successMsg });
            return response.data;
        } catch (err) {
            console.error("API error:", err);
            setError(err.response?.data?.message || "Unexpected server error");
            setMessage({ type: "error", text: "An error occurred" });
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        message,
        executeRequest,
        clearMessage: () => setMessage(null),
        clearError: () => setError(null),
    };
}
