export type Order = {
    number: number,
    ingredients?: string[],
    _id?: string,
    name?: string,
    status?: 'done' | 'pending' | 'created',
    createdAt?: string,
    updatedAt?: string,
};
