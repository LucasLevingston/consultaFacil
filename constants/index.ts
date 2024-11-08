import { NavItem } from "@/types";

export const GenderOptions = [
  { label: "Homem", value: "male" },
  { label: "Mulher", value: "female" },
  { label: "Outro", value: "other" },
];
export const IdentificationTypes = [
  "Certidão de Nascimento",
  "Carteira de Motorista",
  "Cartão/Apólice de Seguro Médico",
  "Carteira de Identidade Militar",
  "Carteira de Identidade Nacional",
  "Passaporte",
  "Cartão de Residente Estrangeiro (Green Card)",
  "Cartão de Seguridade Social",
  "Carteira de Identidade Estadual",
  "Carteira de Estudante",
  "Carteira de Eleitor",
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  canceled: "/assets/icons/cancelled.svg",
  finalized: "/assets/icons/finalized.svg",
};

export const specialties = [
  "Cardiologia",
  "Dermatologia",
  "Ginecologia",
  "Pediatria",
  "Ortopedia",
  "Oftalmologia",
  "Neurologia",
  "Psiquiatria",
  "Endocrinologia",
  "Gastroenterologia",
  "Oncologia",
  "Urologia",
  "Reumatologia",
  "Pneumologia",
  "Otorinolaringologia",
  "Fisioterapia",
  "Nutrição",
  "Anestesiologia",
  "Medicina de Família",
  "Medicina do Trabalho",
  "Medicina Esportiva",
  "Radiologia",
  "Patologia",
  "Cirurgia Geral",
  "Cirurgia Plástica",
  "Cirurgia Pediátrica",
  "Cirurgia Cardiovascular",
  "Hematologia",
  "Infectologia",
  "Genética Médica",
  "Cuidados Paliativos",
];

export const plans = [
  {
    title: "Grátis",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Recursos essenciais para começar",
    features: [
      "Agendamento básico de consultas",
      "Até 10 consultas por mês",
      "Notificações por e-mail para usuários e profissionais",
      "Relatórios simples de agendamentos",
      "Suporte básico via e-mail",
    ],
    priceIdMonthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_FREE_MONTHLY,
    priceIdYearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_FREE_YEARLY,
    actionLabel: "Comece Agora",
  },
  {
    title: "Básico",
    monthlyPrice: 50,
    yearlyPrice: 500,
    description: "Recursos adicionais para clínicas pequenas",
    features: [
      "Agendamento ilimitado de consultas",
      "Notificações por SMS",
      "Relatórios detalhados de agendamentos",
      "Suporte prioritário via e-mail",
    ],
    priceIdMonthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC_MONTHLY,
    priceIdYearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC_YEARLY,
    actionLabel: "Comece Agora",
  },
  {
    title: "Pro",
    monthlyPrice: 75,
    yearlyPrice: 750,
    description: "Perfeito para donos de pequenas e médias empresas",
    features: [
      "Agendamento ilimitado de consultas",
      "Integração com calendários externos",
      "Relatórios avançados e análise de dados",
      "Suporte via chat 24/7",
      "Customização de marca",
    ],
    actionLabel: "Comece Agora",
    priceIdMonthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY,
    priceIdYearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_YEARLY,
    popular: true,
  },
];

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard/overview",
    icon: "dashboard",
    isActive: false,
    items: [], // Empty array as there are no child items for Dashboard
  },
  {
    title: "Employee",
    url: "/dashboard/employee",
    icon: "user",
    isActive: false,
    items: [], // No child items
  },
  {
    title: "Product",
    url: "/dashboard/product",
    icon: "product",
    isActive: false,
    items: [], // No child items
  },
  {
    title: "Account",
    url: "#", // Placeholder as there is no direct link for the parent
    icon: "billing",
    isActive: true,

    items: [
      {
        title: "Profile",
        url: "/dashboard/profile",
        icon: "userPen",
      },
      {
        title: "Login",
        url: "/",
        icon: "login",
      },
    ],
  },
  {
    title: "Kanban",
    url: "/dashboard/kanban",
    icon: "kanban",
    isActive: false,
    items: [], // No child items
  },
];
