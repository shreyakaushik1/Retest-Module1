export type user = {
    id: number;
    email: string;
    name: string;
}

export type users = {
    allUsers: user[];
}

export type final ={
    id: number;
    email: string;
    name: string;
    title: string;
    completed: string;
}