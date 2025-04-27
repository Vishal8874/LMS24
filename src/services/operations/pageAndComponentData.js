import React from 'react'
import {toast} from "react-hot-toast"
import { apiConnector } from '../apiconnector';
import { catalogData } from '../apis';
export const getCatalogaPageData = async (categoryId) => {
  // console.log("Function Executed"); // Check if function is running

  if (!categoryId) {
    console.error("CATEGORY_ID MISSING IN REQUEST");
    toast.error("Invalid category selection");
    return null;
  }
  // console.log("Fetching data for categoryId:", categoryId); // Debugging log

  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    const response = await apiConnector("POST", catalogData.CATALOG_PAGE_DATA_API, { categoryId });

    // console.log("CATALOG PAGE DATA API RESPONSE:", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not Fetch Category page data");
    }

    result = response?.data;
  } catch (error) {
    console.error("CATALOG PAGE DATA API ERROR:", error);
    toast.error(error?.response?.data?.message || "Something went wrong");
    result = error?.response?.data || { success: false, message: "Unknown error" };
  }

  toast.dismiss(toastId);
  return result;
};
