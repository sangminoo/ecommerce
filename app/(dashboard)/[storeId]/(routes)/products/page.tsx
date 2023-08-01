import prismaDb from "@/lib/prismadb";
import { format } from "date-fns";
import { VND } from "@/lib/utils";
import { ProductColumn } from "./components/columns";
import { ProductClient } from "./components/client";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismaDb.product.findMany({
    where: { storeId: params.storeId },

    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: VND.format(item.price.toNumber()),
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    category: item.category.name,
    size: item.size.name,
    color: item.color.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
