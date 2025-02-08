// import { NextResponse } from 'next/server';
// // import Stripe from 'stripe';

// interface Item {
//   name: string;
//   image: string;
//   price: number;
//   quantity: number;
// }

// // Initialize Stripe with your secret key
// // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
// //   apiVersion: '2024-12-18.acacia',
// // });

// // POST request handler
// export async function POST(req: Request) {
//   const { items } = (await req.json()) as { items: Item[] };

//   // Transform the items to match Stripe's expected format
//   const transformedItems = items.map((item: Item) => ({
//     price_data: {
//       currency: 'usd',
//       product_data: {
//         name: item.name,
//         images: [encodeURI(item.image)], // Ensure the image URL is encoded correctly
//       },
//       unit_amount: item.price, // Ensure the correct price is used
//     },
//     quantity: item.quantity,
//   }));

//   // Create a checkout session with Stripe
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     shipping_address_collection: {
//       allowed_countries: ['US', 'CA'],
//     },
//     line_items: transformedItems,
//     mode: 'payment',
//     success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
//     cancel_url: `${process.env.NEXT_PUBLIC_URL}/canceled`,
//   });

//   // Return the session ID as a JSON response
//   return NextResponse.json({ id: session.id });
// }