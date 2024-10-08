import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { FC } from "react";
import SettingsForm from "./components/settings-form";

interface SettingsPageProps{
    params: {
        storeId: string;
    }
}

const SettingsPage: FC<SettingsPageProps> = async ({
    params
}) => {
    const {userId} = auth();
    if(!userId){
        redirect('/sign-in')
    }

    const store = await db.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })

    if(!store){
        redirect('/')
    }
  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-6">
            <SettingsForm initialData={store}/>
        </div>
    </div>
  )
}

export default SettingsPage