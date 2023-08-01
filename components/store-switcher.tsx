"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Store } from "@prisma/client";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { CommandSeparator } from "cmdk";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

export default function StoreSwitcher({
  className,
  items = [],
}: StoreSwitcherProps) {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );
  // console.log(currentStore);
  const [open, setOpen] = useState(false);
  // const [value, setValue] = useState("");
  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon />
          {/* {value
            ? formattedItems.find((item) => item.value === value)?.label
            : "Select a store..."} */}
            {currentStore?.label || "Select a store..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 ">
        <Command>
          <CommandInput placeholder="Search store..." />
          <CommandEmpty>No store found.</CommandEmpty>
          <CommandGroup heading="Stores">
            {formattedItems.map((item) => (
              <CommandItem
                className="cursor-pointer"
                key={item.value}
                onSelect={
                  // (currentValue) => {
                  // setValue(currentValue === value ? "" : currentValue);
                  () => {
                    onStoreSelect(item);
                  // setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 ",
                    currentStore?.value === item.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <Command>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
                className="flex justify-center items-center"
              >
                <button className="btn btn-neutral btn-sm">
                  <PlusCircle className="mr-2 h-5" /> New Store
                </button>
              </CommandItem>
            </CommandGroup>
          </Command>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
