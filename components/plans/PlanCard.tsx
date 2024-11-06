import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Stripe from "stripe";
import BuyButton from "../BuyButton";

interface PlanProps {
  plan: Stripe.Plan;
  onSubscribe: (planId: string) => void;
  isLoading?: boolean;
}

export function PlanCard({
  plan: { id, nickname, amount, metadata },
  onSubscribe,
  isLoading = false,
}: PlanProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{nickname}</CardTitle>
        <CardDescription className="text-xl">
          R$ {amount} <span className="text-sm">/mês</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* <ul className="space-y-2">
          {metadata.map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 mr-2 text-green-500"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              {feature}
            </li>
          ))}
        </ul> */}
      </CardContent>
      <CardFooter>
        {/* <Button className="w-full" onClick={() => onSubscribe(id)} disabled={isLoading}>
          {isLoading ? "Processando..." : "Assinar"}
        </Button> */}
        <BuyButton />
      </CardFooter>
    </Card>
  );
}
