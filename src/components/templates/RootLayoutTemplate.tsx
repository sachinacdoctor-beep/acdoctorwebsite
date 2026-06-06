import type { ReactNode } from "react";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { LoginModal } from "@/components/organisms/LoginModal";

interface RootLayoutTemplateProps {
 children: ReactNode;
}

export function RootLayoutTemplate({ children }: RootLayoutTemplateProps) {
 return (
 <>
 <Navbar />
 <main id="main-content" tabIndex={-1} className="focus:outline-none">
 {children}
 </main>
 <Footer />
 <LoginModal />
 </>
 );
}
