import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ContactSection() {
  return (
    <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Entre em Contato
        </h2>
        <div className="mx-auto max-w-md">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Seu nome" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="seu@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Mensagem</Label>
              <textarea
                id="message"
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring min-h-[100px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Sua mensagem aqui"
              />
            </div>
            <Button type="submit" className="w-full">
              Enviar Mensagem
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
