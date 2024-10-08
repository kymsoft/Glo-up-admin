import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    {params}: {params: {storeId: string}}
){
    try {
        const {userId} = auth();
        const body = await req.json();
        const {
            name,
            price,
            categoryId,
            colorId,
            sizeId,
            images,
            isFeatured,
            isArchived
        } = body;

        if(!userId){
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if(!name){
            return new NextResponse("Nmae is required", {status: 401});
        }
        if(!price){
            return new NextResponse("Price is required", {status: 401});
        }
        if(!categoryId){
            return new NextResponse("Category ID is required", {status: 401});
        }
        if(!sizeId){
            return new NextResponse("Size ID is required", {status: 401});
        }
        if(!colorId){
            return new NextResponse("Color is required", {status: 401});
        }
        if(!images || !images.length){
            return new NextResponse("Image required", {status: 401});
        }

        if(!params.storeId){
            return new NextResponse("Store ID is required", {status: 401});
        }

        const storeByUserId = await db.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if(!storeByUserId){
            return new NextResponse('Unauthorized', {status: 403});
        }

        const product = await db.product.create({
            data: {
                name,
            price,
            categoryId,
            colorId,
            sizeId,
            isFeatured,
            isArchived,
            storeId: params.storeId,
            images: {
                createMany:{
                    data: [
                        ...images.map((image: {url: string})=> image)
                    ]
                }
            }
                
            }
        })

        return NextResponse.json(product)
    } catch (error) {
        console.log('[PRODUCTS_POST]', error);
        return new NextResponse("Internal error", {status: 500})
    }
}

export async function GET(
    req: Request,
    {params}: {params: {storeId: string}}
){
    try {
        const {searchParams} = new URL(req.url)
        const categoryId = searchParams.get('categoryId') || undefined;
        const colorId = searchParams.get('colorId') || undefined;
        const sizeId = searchParams.get('sizeId') || undefined;
        const isFeatured = searchParams.get('isFeatured')

        if(!params.storeId){
            return new NextResponse("Store ID is required", {status: 401});
        }

        const products = await db.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                colorId,
                sizeId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false
            },
            include:{
                images: true,
                category: true,
                color: true,
                size:true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(products)
    } catch (error) {
        console.log('[PRODUCTS_POST]', error);
        return new NextResponse("Internal error", {status: 500})
    }
}