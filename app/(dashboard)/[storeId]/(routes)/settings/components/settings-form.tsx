"use client";

import * as z from 'zod'
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import AlertModal from '@/components/modals/alert-modal';
import { ApiAlert } from '@/components/ui/api-alert';
import { useOrigin } from '@/hooks/use-origin';

interface SettingsFormProps{
    initialData: Store;
}

const formSchema = z.object({
    name: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

const SettingsForm: FC<SettingsFormProps> = ({
    initialData
}) => {
    const origin = useOrigin();
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast()
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    });

    const onSubmit = async(data: SettingsFormValues) => {
        try {
            setLoading(true)
            await axios.patch(`/api/store/${params.storeId}`, data)
            router.refresh();
            toast({
                title: "Store Category name updated",
              })
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: `${error}`,
              })
        } finally{
            setLoading(false)
        }
    }
    const onDelete = async() =>{
        try {
            setLoading(true)
            await axios.delete(`/api/store/${params.storeId}`)
            router.refresh();
            router.push('/');

            toast({
                title: "Store Category deleted",
              })
        } catch (error) {
            toast({
                title: "Make sure you removed all products and categories first",
              })
        } finally{
            setLoading(false)
            setOpen(false)
        }
    }
  return (
    <>
    <AlertModal 
      isOpen={open}
      onClose = {()=>setOpen(false)}
      onConfirm={onDelete}
      loading={loading}
    />
    <div className="flex items-center justify-between">
        <Heading
          title="Settings"
          description="Manage store category preferences"
        />
        <Button
          variant="destructive"
          size="icon"
          onClick={()=>setOpen(true)}
        >
            <Trash className="h-4 w-4" />
        </Button>
    </div>
    <Separator />
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-ful'>
            <div className='grid grid-cols-3 gap-8'>
                <FormField 
                  control = {form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Store category name"
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <Button disabled={loading} className='ml-auto' type='submit' >
                Save Changes
            </Button>
        </form>
    </Form>
    <Separator/>

    <ApiAlert 
      title='NEXT_PUBLIC_API_URL' 
      description={`${origin}/api/${params.storeId}`}
      variant='public'

    />
    </>
  )
}

export default SettingsForm