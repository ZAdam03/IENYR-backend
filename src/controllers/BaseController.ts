import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export abstract class BaseController<T, CreateInput, UpdateInput> {
    protected modelName: string;

    constructor(modelName: string) {
        this.modelName = modelName;
    }

    async getAll(): Promise<T[]> {
        // @ts-ignore
        return await prisma[this.modelName].findMany();
    }

    async getOne(id: string): Promise<T> {
        // @ts-ignore
        const item = await prisma[this.modelName].findUnique({ where: { id } });
        if (!item) throw new Error('Not found');
        return item;
    }

    async create(data: CreateInput): Promise<T> {
        // @ts-ignore
        return await prisma[this.modelName].create({ data });
    }

    async update(id: string, data: UpdateInput): Promise<T> {
        // @ts-ignore
        return await prisma[this.modelName].update({
        where: { id },
        data
        });
    }

    async delete(id: string): Promise<T> {
        // @ts-ignore
        return await prisma[this.modelName].delete({ where: { id } });
    }
}