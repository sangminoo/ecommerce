"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { PlusCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
import { SizeColumn, columns } from "./columns";

interface SizesClientProps {
  data: SizeColumn[];
}

export const SizesClient: React.FC<SizesClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage sizes for your store"
        />

        <button
          className="btn btn-md btn-neutral"
          onClick={() => router.push(`/${params.storeId}/sizes/new`)}
        >
          <PlusCircle className="w-4 h-4" />
          Add New
        </button>
      </div>
      <Separator className="mt-4" />
      <DataTable searchKey="name" columns={columns} data={data} />

      {/* Collapse */}
      <div className="collapse bg-base-200">
        <input type="checkbox" className="peer" />
        <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
          {/* Heading */}
          <Heading title="API" description="API calls for Sizes" />
          <Separator className="mt-4" />
          {/* end */}
        </div>
        <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
          <ApiList entityName="sizes" entityIdName="sizeId" />
        </div>
      </div>
    </>
  );
};
