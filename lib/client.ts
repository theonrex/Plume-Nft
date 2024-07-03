// Import necessary components and functions from the thirdweb library
import { createThirdwebClient } from "thirdweb";

// Create a Thirdweb client instance with the specified client ID
//A client is the entry point to the thirdweb SDK. It is required for all other actions.

export const client = createThirdwebClient({
  clientId: `${process.env.NEXT_PUBLIC_THIRDWEB_CLIENT}`, // Replace with your actual client ID
});

//0x6827410D73DcD6ac7dF140a83B8A70C408734256 
