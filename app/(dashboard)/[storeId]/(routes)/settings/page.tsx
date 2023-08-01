import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { SettingsForm } from "./components/settings-form";

interface SettingsProps {
  params: {
    storeId: string;
  };
}

const SettingsPage: React.FC<SettingsProps> = async ({ params }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismaDb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });
  //   console.log(store?.id);

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
