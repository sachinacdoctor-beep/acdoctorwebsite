// ─── Shared Types ─────────────────────────────────────────────────────────────

export type ButtonVariant = "primary" | "ghost" | "muted" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: string;           // keep for fallback
  iconImage?: string;     // new: path like "/assets/icons/repair.png"
}

export interface ProductCard {
  id: string;
  image: string;
  name: string;
  specs: string;
  price: string;
  originalPrice?: string;
  badge?: string;
}

export interface QuoteCard {
  id: string;
  iconImage: string;
  icon: string;
  title: string;
  description: string;
}

export interface AppStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
}
