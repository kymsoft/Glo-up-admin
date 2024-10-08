"use client"

import { FC, useState } from "react";
import { ColorColumn } from "./columns"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreVertical, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import AlertModal from "@/components/modals/alert-modal";


interface CellActionProps{
    data: ColorColumn;
};

export const CellAction: FC<CellActionProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success('Color Id copied to clipboard');
    }
    const onDelete = async () => {
        try {
          setLoading(true);
          await axios.delete(`/api/${params.storeId}/colors/${data.id}`);
          
          router.push(`/${params.storeId}/colors`);
          router.refresh();
    
          toast.success('Deleted Successfully')
        } catch (error) {
          toast.error("Something went wrong")
        } finally {
          setLoading(false);
          setOpen(false);
        }
      };
  return (
    <>
    <AlertModal
      isOpen={open}
      onClose={()=>setOpen(false)}
      onConfirm={onDelete}
      loading={loading}
    />
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-8 rounded-full">
                <span>
                  <MoreVertical className="h-4 w-4" />
                </span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>
                Actions
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={()=>onCopy(data.id)}>
                <Copy className="mr-2 h-4 w-4" />
                Copy Id
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>router.push(`/${params.storeId}/colors/${data.id}`)}>
                <Edit className="mr-2 h-4 w-4" />
                Update
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>setOpen(true)}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    
    </>
  )
}
