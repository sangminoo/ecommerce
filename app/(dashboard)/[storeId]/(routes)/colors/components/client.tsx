"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { PlusCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
import { ColorColumn, columns } from "./columns";

interface ColorClientProps {
  data: ColorColumn[];
}

export const ColorClient: React.FC<ColorClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${data.length})`}
          description="Manage colors for your store"
        />

        <button
          className="btn btn-md btn-neutral"
          onClick={() => router.push(`/${params.storeId}/colors/new`)}
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
          <Heading title="API" description="API calls for Colors" />
          <Separator className="mt-4" />
          {/* end */}
        </div>
        <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
          <ApiList entityName="colors" entityIdName="colorId" />
        </div>
      </div>
    </>
  );
};
