import { Generated } from "kysely";
import { createKysely } from "@vercel/postgres-kysely";

export const db = createKysely();
