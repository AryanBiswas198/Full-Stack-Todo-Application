const BASE_URL = process.env.REACT_APP_BASE_URL

export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
};

export const todoEndpoints = {
    CREATE_TODO_API: BASE_URL + "/todos/createTodo",
    UPDATE_TODO_API: BASE_URL + "/todos/updateTodo",
    DELETE_TODO_API: BASE_URL + "/todos/deleteTodo",
    GET_ALL_USER_TODOS_API: BASE_URL + "/todos/getAllUserTodos",
    DELETE_ALL_USER_TODOS_API: BASE_URL + "/todos/deleteAllUsersTodo",
    MARK_COMPLETE_API: BASE_URL + "/todos/markComplete",
    MARK_INCOMPLETE_API: BASE_URL + "/todos/markIncomplete",
    DELETE_ALL_COMPLETED_USER_TODOS_API: BASE_URL + "/todos/deleteAllCompletedUserTodos",
}