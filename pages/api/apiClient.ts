import { DEFAULT_BACKEND_URL } from "@/utils/constants";
import axios from "axios";

const apiClient = axios.create({
  baseURL: DEFAULT_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  const response = await apiClient.post("/auth/login", { email, password });
  return response.data;
};

export const getUser = async () => {
  const response = await apiClient.get(`/users/token/checkAuth`);
  return response.data.user;
};

export const logout = async () => {
  await apiClient.post("/auth/logout");
};

export const getProducts = async () => {
  const response = await apiClient.get("/products");
  console.log(response.data);
  return response.data;
};

export const getProduct = async (id: number) => {
  const response = await apiClient.get(`/products/${id}`);
  console.log(response.data);
  return response.data;
};

export const addToWishlist = async (productId: number) => {
  const response = await apiClient.post("/wishlist", { productId });
  return response.data;
};

export const removeFromWishlist = async (productId: number) => {
  const response = await apiClient.delete(`/wishlist/${productId}`);
  return response.data;
};

export const getWishlist = async () => {
  const response = await apiClient.get("/wishlist");
  return response.data;
};

export const addToWaitlist = async (
  productId: number,
  size: string,
  email: string
) => {
  const response = await apiClient.post("/waitlist/", {
    productId,
    size,
    email,
  });
  return response.data;
};

export const removeFromWaitlist = async (waitlistItemId: number) => {
  const response = await apiClient.delete(`/waitlist/${waitlistItemId}`);
  return response.data;
};

export const getWaitlist = async () => {
  const response = await apiClient.get("/waitlist/");
  return response.data;
};

export const createOrder = async (orderData: any) => {
  const response = await apiClient.post("/orders/place", orderData);
  return response.data;
};

export const getOrdersByUserId = async (userId: Number) => {
  const response = await apiClient.get(`/orders/${userId}`);
  console.log(response.data);
  return response.data;
};

export const getOrdersByOrderId = async (orderId: string) => {
  const response = await apiClient.get(`/orders/tracking/${orderId}`);
  return response.data;
};

export const processPayment = async (paymentData: any) => {
  const response = await apiClient.post("/payment/create-payment", paymentData);
  return response.data;
};

export const createMarxOrder = async (paymentData: any) => {
  const response = await apiClient.post(
    "/payment/create-marx-order",
    paymentData
  );
  return response.data;
};

export const verifyMarxOrder = async (paymentData: any) => {
  const response = await apiClient.post(
    "/payment/verify-marx-payment",
    paymentData
  );
  return response.data;
};

export const updateShippingDetails = async (accountData: any) => {
  const response = await apiClient.put("/users/shipping-details", accountData);
  return response.data;
};

export const updateAccountDetails = async (accountData: any) => {
  const response = await apiClient.put("/users/account-details", accountData);
  return response.data;
};

export const subscribeToNewsletter = async (email: string) => {
  const response = await apiClient.post("/subscribe", { email });
  return response.data;
};

export const checkSubscriptionStatus = async (email: string) => {
  const response = await apiClient.get(`/subscribe/check/${email}`);

  console.log(response.data);
  return response.data.isSubscribed;
};

export default apiClient;
