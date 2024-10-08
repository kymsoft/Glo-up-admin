"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { FC } from "react";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface OrderClientProps{
    data: OrderColumn[]
}

export const OrderClient: FC<OrderClientProps> = ({
    data
}) => {
    const router = useRouter()
    const params = useParams();
  return (
    <>
      
        <Heading
          title={`Orders (${data.length})`}
          description="Manage your order"
        />
      <Separator/>
      <DataTable 
        columns={columns}
        data={data}
        searchKey="products"
      />
    </>
  );
};
