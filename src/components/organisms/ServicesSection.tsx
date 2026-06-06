"use client";

import { useEffect, useState } from "react";
import { ServiceCard } from "@/components/molecules/ServiceCard";
import { SERVICES } from "@/lib/data";
import { fetchServiceList, isHiddenFrontendService, mapApiServiceToServiceCard } from "@/lib/services";
import type { ServiceCard as ServiceCardType } from "@/types";

export function ServicesSection() {
 const [services, setServices] = useState<ServiceCardType[]>(SERVICES.filter((service) => !isHiddenFrontendService(service)));

 useEffect(() => {
 let isMounted = true;

 const loadServices = async () => {
 try {
 const apiServices = await fetchServiceList();
 const dynamicServices = apiServices
 .map(mapApiServiceToServiceCard)
 .filter((service) => !isHiddenFrontendService(service));

 if (isMounted && dynamicServices.length) {
 setServices(dynamicServices);
 console.log("AC Doctor service-list API ===>", dynamicServices);
 }
 } catch (error) {
 console.error("Failed to load AC Doctor services", error);
 }
 };

 loadServices();

 return () => {
 isMounted = false;
 };
 }, []);

 return (
 <section
 id="services"
 aria-label="Book AC Service"
 className="py-[50px] md:py-20 bg-[#f5f5f5]"
 >
 <div className="max-w-[1362px] mx-auto px-4 sm:px-8 lg:px-10 flex flex-col gap-[42px] md:gap-12">
 <div
 className="flex flex-col items-center text-center gap-[10px]"
 >
 <h2 className="font-['Montserrat',sans-serif] font-semibold text-[26px] md:text-[clamp(28px,3vw,44px)] leading-[34px] md:leading-[1.5] text-[#222] whitespace-nowrap">
 Book AC Service
 </h2>
 <p className="font-['Montserrat',sans-serif] font-normal text-[14px] md:text-[clamp(15px,1.4vw,20px)] leading-[22px] md:leading-[32px] text-[#222]/70 max-w-[367px] md:max-w-[682px]">
 Get professional AC solutions at your doorstep. Trusted experts for
 all major AC brands with quick support and quality service.
 </p>
 </div>

 <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-[14px] gap-y-[14px] md:gap-6">
 {services.map((service) => (
 <ServiceCard
 key={service.backendId || service.id}
 service={service}
 />
 ))}
 </div>
 </div>
 </section>
 );
}
