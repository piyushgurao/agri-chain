import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
})

// Auth
export const registerUser = (data)          => api.post("/auth/register", data)
export const loginUser    = (data)          => api.post("/auth/login", data)
export const logoutUser   = ()              => api.post("/auth/logout")
export const getMe        = ()              => api.get("/auth/me")

// Batch
export const createBatch     = (data)           => api.post("/batch/create", data)
export const getMyBatches    = ()               => api.get("/batch/my-batches")
export const getBatchById    = (batchId)        => api.get(`/batch/${batchId}`)
export const getAllBatches    = ()               => api.get("/batch/admin/all")
export const updateProcessor = (batchId, data)  => api.put(`/batch/processor/${batchId}`, data)
export const updateWarehouse = (batchId, data)  => api.put(`/batch/warehouse/${batchId}`, data)
export const updateRetailer  = (batchId, data)  => api.put(`/batch/retailer/${batchId}`, data)
export const markAsSold      = (batchId)        => api.put(`/batch/retailer/${batchId}/sold`)

export default api