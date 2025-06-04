// src/hooks/useUsers.js
import useApiRequest from "./useApiRequest";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from "../api/userApi";

export default function useUsers() {
    const {
        loading,
        error,
        message,
        executeRequest,
        clearMessage,
        clearError,
    } = useApiRequest();

    const fetchUsers = () => executeRequest(() => getUsers());

    const addUser = (userData) =>
        executeRequest(() => createUser(userData), "Usuario creado correctamente");

    const updateUserById = (id, userData) =>
        executeRequest(() => updateUser(id, userData), "Usuario actualizado");

    const deleteUserById = (id) =>
        executeRequest(() => deleteUser(id), "Usuario eliminado");

    return {
        loading,
        error,
        message,
        fetchUsers,
        addUser,
        updateUserById,
        deleteUserById,
        clearMessage,
        clearError,
    };
}
