import { auth } from "@/auth";
import stripe from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest, res: NextResponse) => {
  const sessionAuth = await auth();

  //   const {
  //     data:{stripe_customer}
  //   } = await supabase.from("profie")
  // }

  const session = await stripe.billingPortal.sessions.create({
    customer: sessionAuth?.user?.id as string,
    return_url: process.env.FRONT_URL,
  });
  res.send({
    url: session.url,
  });
};
