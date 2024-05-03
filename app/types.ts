export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type TodoList = {
    id: string;
    user_id: string;
    title: string;
    content: string;
};
