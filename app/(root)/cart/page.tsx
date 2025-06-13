"use client";

import useCart from "@/lib/hooks/useCart";

import { useUser } from "@clerk/nextjs";
import { phoneNumbers } from "@clerk/nextjs/api";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Cart = () => {
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();

  const total = cart.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );
  const totalRounded = parseFloat(total.toFixed(2));

  const customer = {
    clerkId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName,
  };

  const handleCheckout = async () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }
  
    try {
      // Prepare payload based on updated request
      const payload = {
        "receiverWalletId": "67689278d2cfbd306d7ef052",
        "token": "TND",
        "amount": totalRounded * 1000,
        "type": "immediate",
        "description": "payment description",
        "acceptedPaymentMethods": [
          "wallet",
          "bank_card",
          "e-DINAR",
          "flouci"
        ],
        "lifespan": 10,
        "checkoutForm": true,
        "addPaymentFeesToAmount": true,
        "firstName": customer.name,
        "phoneNumber": "22777777",
        "email": customer.email,
        "orderId": customer.clerkId,
        "webhook": "https://localhost:3001/api/webhooks",
        "silentWebhook": true,
        "successUrl": "https://borcellask.vercel.app/payment_success",
        "failUrl": "https://borcellask.vercel.app/cart",
        "theme": "light"
      };
  
      // Send request to Konnect API
      const res = await fetch(
        "https://api.preprod.konnect.network/api/v2/payments/init-payment", // Updated API endpoint
        {
          method: "POST",
          headers: {
            "x-api-key": "67689276d2cfbd306d7ef03f:95Wlzigrqqn4yU0YT4VmBC8iho3", // Add your actual API key
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
  
      const data = await res.json();
  
      if (data?.payUrl) {
        window.open(data.payUrl, "_blank"); // Open payment page in a new tab
      } else {
        console.error("Error: No 'payUrl' found in the response.");
      }
    } catch (err) {
      console.error("Error initializing payment:", err);
    }
  };
  

  return (
    <div className="flex gap-20 py-16 px-10 max-lg:flex-col max-sm:px-3">
      <div className="w-2/3 max-lg:w-full">
        <p className="text-heading3-bold">Shopping Cart</p>
        <hr className="my-6" />

        {cart.cartItems.length === 0 ? (
          <p className="text-body-bold">No item in cart</p>
        ) : (
          <div>
            {cart.cartItems.map((cartItem) => (
              <div className="w-full flex max-sm:flex-col max-sm:gap-3 hover:bg-grey-1 px-4 py-3 items-center max-sm:items-start justify-between">
                <div className="flex items-center">
                  <Image
                    src={cartItem.item.media[0]}
                    width={100}
                    height={100}
                    className="rounded-lg w-32 h-32 object-cover"
                    alt="product"
                  />
                  <div className="flex flex-col gap-3 ml-4">
                    <p className="text-body-bold">{cartItem.item.title}</p>
                    {cartItem.color && (
                      <p className="text-small-medium">{cartItem.color}</p>
                    )}
                    {cartItem.size && (
                      <p className="text-small-medium">{cartItem.size}</p>
                    )}
                    <p className="text-small-medium">{cartItem.item.price} DT</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <MinusCircle
                    className="hover:text-red-1 cursor-pointer"
                    onClick={() => cart.decreaseQuantity(cartItem.item._id)}
                  />
                  <p className="text-body-bold">{cartItem.quantity}</p>
                  <PlusCircle
                    className="hover:text-red-1 cursor-pointer"
                    onClick={() => cart.increaseQuantity(cartItem.item._id)}
                  />
                </div>

                <Trash
                  className="hover:text-red-1 cursor-pointer"
                  onClick={() => cart.removeItem(cartItem.item._id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-1/3 max-lg:w-full flex flex-col gap-8 bg-grey-1 rounded-lg px-4 py-5">
        <p className="text-heading4-bold pb-4">
          Summary{" "}
          <span>{`(${cart.cartItems.length} ${
            cart.cartItems.length > 1 ? "items" : "item"
          })`}</span>
        </p>
        <div className="flex justify-between text-body-semibold">
          <span>Total Amount</span>
<<<<<<< HEAD
          <span> {totalRounded} DT</span>
=======
          <span>{totalRounded} DT</span>
>>>>>>> 076a9bf088066a6e7ddf9009b95febe10bf344af
        </div>
        <button
          className="border rounded-lg text-body-bold bg-white py-3 w-full hover:bg-black hover:text-white"
          onClick={handleCheckout}
        >
          Presse to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
