import { client } from "@/sanity/lib/client"
import { Product } from "@/types/Product"
import { groq } from "next-sanity"

interface ProductsPageProps{
  params: Promise<{slug:string}>
}

async function getProduct(slug:string): Promise< Product | null> {
  return client.fetch(
    groq`*[_type == "product && slug.current ==$slug][0]{
    _id,
    product,
    _type,
    image,
    price,
    }`,{slug}
  )

}
export default async function ProductsPage({params}:ProductsPageProps){
  const {slug}=await params;
  const product =await getProduct{slug}

  return(
     
  )
}