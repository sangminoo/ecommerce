import prismaDb from "@/lib/prismadb";
import { CategoryForm } from "./components/category-form";

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string, storeId: string };
}) => {
  const categories = await prismaDb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });


  const billboards = await prismaDb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <CategoryForm initialData={categories}
        billboards={billboards}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
