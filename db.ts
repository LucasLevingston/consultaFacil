require("dotenv").config({ path: ".env.local" }); // ou '.env' conforme o caso

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
