"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check, Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { toast } from "react-hot-toast";
import { useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
  const [isCopy, setIsCopy] = useState(false);

  const onCopy = async (description: string) => {
    navigator.clipboard.writeText(description);
    setIsCopy(true);
    await setTimeout(() => {
      setIsCopy(false);
    }, 2000);
    // toast.success("Copy to clipboard");
  };

  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>

      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <TooltipProvider>
          <Tooltip>
            <button
              className="btn w-fit btn-ghost"
              onClick={() => onCopy(description)}
            >
              <TooltipTrigger>
                {isCopy ? (
                  <Check className="relative h-4 w-4 transition-all" />
                ) : (
                  <Copy className="h-4 w-4 transition-all" />
                )}
              </TooltipTrigger>
            </button>
            <TooltipContent>
              <p>{isCopy ? "Copied" : "Copy"}</p>
            </TooltipContent> 
          </Tooltip>
        </TooltipProvider>
      </AlertDescription>
    </Alert>
  );
};
