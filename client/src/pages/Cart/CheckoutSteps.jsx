import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Truck, CheckCircle2, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: "Shipping Details",
      icon: Truck,
    },
    {
      label: "Confirm Order",
      icon: CheckCircle2,
    },
    {
      label: "Payment",
      icon: CreditCard,
    },
  ];

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  activeStep >= index
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <step.icon className="w-5 h-5" />
              </div>
              <span
                className={cn(
                  "mt-2 text-sm font-medium",
                  activeStep >= index ? "text-primary" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <Separator
                className={cn(
                  "flex-1 mx-4",
                  activeStep > index ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
};

export default CheckoutSteps;
