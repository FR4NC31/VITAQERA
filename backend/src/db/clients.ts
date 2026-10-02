import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

export function createDB(NeonDB_Url: string) {
    const sql = neon(NeonDB_Url);

    return drizzle(sql)
}