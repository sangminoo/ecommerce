import prismaDb from "@/lib/prismadb";
import { BillboardClient } from "./components/client";
import { format } from "date-fns";
import { BillboardColumn } from "./components/columns";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismaDb.billboard.findMany({
    where: { storeId: params.storeId },

    orderBy: {
      createdAt: "desc",
    },
  });

  

  const formatBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formatBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
