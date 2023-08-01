import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});


export const USD = (amount: any) => {
  const exchangeRate = 0.000043; // Tỷ giá: 1 VND = 0.000043 USD
  const result = amount * exchangeRate;
  return result.toFixed(2); // Làm tròn đến 2 chữ số thập phân
}; 