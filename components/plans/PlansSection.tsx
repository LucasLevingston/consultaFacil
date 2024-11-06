"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { getPlans } from "@/lib/actions/payment-actions/get-plans";
import Stripe from "stripe";
import { PlanCard } from "./PlanCard";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PlansSection() {
  const [plans, setPlans] = useState<Stripe.Plan[]>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const result = await getPlans();
        setPlans(result.data);
      } catch (error) {
        console.error("Error fetching plans:", error);
        setError("Falha ao carregar os planos. Por favor, tente novamente mais tarde.");
      }
    };

    fetchPlans();
  }, []);

  const handleSubscription = async (planId: string) => {
    setLoading(planId);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planId }),
      });

      const session = await response.json();

      const stripe = await stripePromise;
      const { error } = await stripe!.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        console.error("Error:", error);
        setError("Ocorreu um erro ao processar o pagamento. Por favor, tente novamente.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Ocorreu um erro ao processar o pagamento. Por favor, tente novamente.");
    }

    setLoading(null);
  };

  if (error) {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-6 text-red-600">{error}</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Nossos Planos</h2>
        {plans.length === 0 ? (
          <p className="text-center">Carregando planos...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onSubscribe={handleSubscription}
                isLoading={loading === plan.id}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
