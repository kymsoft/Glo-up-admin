import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import db from "@/lib/db"
import { formatter } from "@/lib/utils"
import { CreditCardIcon, DollarSign, Package } from "lucide-react"
import { FC } from "react"

interface DashboardPageProps{
    params: {storeId: string}
}; 

const DashboardPage: FC<DashboardPageProps> = async ({
    params
}) => {
    const store = await db.store.findFirst({
        where: {
            id: params.storeId
        }
    })
  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <Heading title="Dashboard" description="Overview of your store" />
            <Separator/>
            <div className="grid gap-4 grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-2">
                        <CardTitle className="text-sm font-medium">
                        Total Revenue
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground"/>
                        
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatter.format(100)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-2">
                        <CardTitle className="text-sm font-medium">
                        Sales
                        </CardTitle>
                        <CreditCardIcon className="h-4 w-4 text-muted-foreground"/>
                        
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            +45
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-2">
                        <CardTitle className="text-sm font-medium">
                        Products In Stock
                        </CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground"/>
                        
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            35
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  )
}

export default DashboardPage