"use client";

import Image from "next/image";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { ASSETS } from "@/lib/data";
import { useContactForm } from "@/hooks/useContactForm";
import { useInView } from "@/hooks/useInView";

export function CTASection() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });
  const { data, loading, success, error, setField, submit } = useContactForm();

  return (
    <section
      id="contact"
      ref={ref}
      aria-label="Contact us"
      className="relative w-full min-h-[600px] overflow-hidden"
    >
      {/* Background */}
      <Image
        src={ASSETS.ctaBg}
        alt="Contact section background"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" aria-hidden="true" />

      <div className="relative z-10 section-padding py-section-y max-w-[1680px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:justify-end">
          {/* Form card */}
          <div
            className={`w-full lg:w-auto lg:min-w-[420px] lg:max-w-[500px] bg-white/10 backdrop-blur-md border border-white/20 rounded-card p-8 sm:p-10 flex flex-col gap-8 transition-all duration-700 ${isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"}`}
          >
            <SectionHeader title="Contact us" align="left" titleClassName="text-brand-white italic" />

            {success ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <span className="text-5xl">✅</span>
                <p className="font-montserrat font-semibold text-brand-white text-xl">
                  We'll reach out shortly!
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
                className="flex flex-col gap-5"
                noValidate
              >
                <Input
                  icon="👤"
                  placeholder="Name"
                  value={data.name}
                  onChange={(e) => setField("name", e.target.value)}
                  aria-label="Your name"
                  required
                />
                <Input
                  icon="📞"
                  placeholder="Phone No."
                  type="tel"
                  value={data.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  aria-label="Your phone number"
                  required
                />
                <Input
                  icon="✉️"
                  placeholder="Email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setField("email", e.target.value)}
                  aria-label="Your email address"
                  required
                />

                {error && (
                  <p role="alert" className="text-brand-primary text-sm font-medium">
                    ⚠️ {error}
                  </p>
                )}

                <Button
                  type="submit"
                  variant="ghost"
                  size="lg"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? "Sending…" : "Submit"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
