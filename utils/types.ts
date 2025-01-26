interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    dueDate: string;
    completed: boolean;
    priority: string;
}

export type { Task };