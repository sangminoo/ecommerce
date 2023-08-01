"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";
import { PlusCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { ApiAlert } from "@/components/ui/api-alert";
import { ApiList } from "@/components/ui/api-list";
import { BillboardColumn, columns } from "./columns";

interface BillboardClientProps {
  data: BillboardColumn[];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboard (${data.length})`}
          description="Manage billboards for your store"
        />

        <button
          className="btn btn-md btn-neutral"
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <PlusCircle className="w-4 h-4" />
          Add New
        </button>
      </div>
      <Separator className="mt-4" />
      <DataTable searchKey="label" columns={columns} data={data} />

      {/* Collapse */}
      <div className="collapse bg-base-200">
        <input type="checkbox" className="peer" />
        <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
          {/* Heading */}
          <Heading title="API" description="API calls for Billboards" />
          <Separator className="mt-4" />
          {/* end */}
        </div>
        <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
          <ApiList entityName="billboards" entityIdName="billboardId" />
        </div>
      </div>
    </>
  );
};
