import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import { hashPassword } from "@/lib/utils";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password, name, phone, role } = await request.json();

    const hashedPassword = await hashPassword(password);

    const doesEmailExist = await prisma.user.findUnique({
      where: { email },
    });

    if (doesEmailExist) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        role,
      },
    });

    return NextResponse.json({ success: "Account created" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
