"use server";

import { auth } from "@/auth";
import stripe from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  try {
    // Autenticação do usuário
    const sessionAuth = await auth();

    if (!sessionAuth || !sessionAuth.user || !sessionAuth.user.id) {
      return NextResponse.json({ error: "User not authenticated." }, { status: 401 });
    }

    // Criar uma sessão do Stripe Billing Portal
    const session = await stripe.billingPortal.sessions.create({
      customer: sessionAuth.user.id as string,
      return_url: process.env.FRONT_URL,
    });

    // Retornar a URL da sessão criada
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating billing portal session:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

export { handler };
