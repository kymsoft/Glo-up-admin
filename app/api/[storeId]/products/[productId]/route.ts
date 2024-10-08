import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    {params}: {params: {productId: string}}
){
    try {

       if(!params.productId){
        return new NextResponse("Product ID is required", {status: 401})
       }

       const product = await db.product.findUnique({
        where: {
            id: params.productId,
        },
        include: {
            images: true,
            category: true,
            size: true,
            color: true
        }
       });

       return NextResponse.json(product);

    } catch (error) {
        console.log('[PRODUCT_GET]', error);
        return new NextResponse("Internal error", {status: 500})
    }
}

export async function PATCH(
    req: Request,
    {params}: {params: {storeId:string, productId: string}}
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

        if(!params.productId){
            return new NextResponse("Product ID is required", {status: 401});
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


       await db.product.update({
        where: {
            id: params.productId,
        }, 
        data: {
            name,
            price,
            categoryId,
            colorId,
            sizeId,
            images: {
                deleteMany: {}
            },
            isFeatured,
            isArchived
        }
       });

       const product = await db.product.update({
        where:{
            id: params.productId,
        },
        data:{
            images: {
                createMany: {
                    data: [
                        ...images.map((image: {url: string})=>image),
                    ]
                }
            }
        }
       })

       return NextResponse.json(product);

    } catch (error) {
        console.log('[PRODUCTS_PATCH]', error);
        return new NextResponse("Internal error", {status: 500})
    }
}

export async function DELETE(
    req: Request,
    {params}: {params: {storeId: string, productId: string}}
){
    try {
       const {userId} = auth();

       if(!userId){
        return new NextResponse('Unauthenticated', {status: 401})
       }

       if(!params.productId){
        return new NextResponse("Product ID is required", {status: 401})
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

       const product = await db.product.deleteMany({
        where: {
            id: params.productId,
        },
       });

       return NextResponse.json(product);

    } catch (error) {
        console.log('[PRODUCT_DELETE]', error);
        return new NextResponse("Internal error", {status: 500})
    }
}