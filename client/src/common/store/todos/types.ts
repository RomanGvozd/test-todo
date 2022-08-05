export interface ITodo {
    [x: string]: any;
    _id: number;
    title: string;
    completed: boolean;
}

export interface IState {
    loading: boolean,
    todos: ITodo[],
    error?: any
}
