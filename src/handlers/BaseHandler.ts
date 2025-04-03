import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Absztrakt osztály, amely a CRUD műveletek kezelésére szolgál.
 * 
 * @template NestedRes - Beágyazott modell típus, amely az alap modell kibővítve, a kapcsolatokkal.
 * @template CreateInput - A létrehozáshoz szükséges bemeneti adatok típusa.
 * @template UpdateInput - A frissítéshez szükséges bemeneti adatok típusa.
 * @template SelfRes - Az adatbázis modell a típusa.
 * template Query - A lekérdezéshez használt paraméterek típusa.
 */
export class BaseHandler<NestedRes, CreateInput, UpdateInput, SelfRes> {
    protected modelName: string;

    constructor(modelName: string) {
        this.modelName = modelName;
    }

    async getAll(options?: any): Promise<NestedRes[]> {
        // @ts-ignore
        return await prisma[this.modelName].findMany({
            ...options
        });
    }

    async getOne(id: string, options?: any): Promise<NestedRes> {
        // @ts-ignore
        const item = await prisma[this.modelName].findUnique({ 
            where: { id },
            ...options
        });
        if (!item) throw new Error('Not found');
        return item;
    }

    async create(data: CreateInput): Promise<SelfRes> {
        // @ts-ignore
        return await prisma[this.modelName].create({ data });
    }

    async update(id: string, data: UpdateInput): Promise<SelfRes> {
        // @ts-ignore
        return await prisma[this.modelName].update({
        where: { id },
        data
        });
    }

    async delete(id: string): Promise<SelfRes> {
        // @ts-ignore
        return await prisma[this.modelName].delete({ where: { id } });
    }
};