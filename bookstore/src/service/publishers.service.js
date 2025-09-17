import AxiosConfig from "../config/axios.config";


const PUBLISHERS_RESOURCE = 'api/publishers'; //Publishers

export async function getAllPublishers() {
  const response = await AxiosConfig.get(PUBLISHERS_RESOURCE );
  return response.data;
}

export async function getPublisherById(id) {
  const response = await AxiosConfig.get(`${PUBLISHERS_RESOURCE }/${id}`);
  return response.data;
}

export async function createPublisher(productData) {
  const response = await AxiosConfig.post(PUBLISHERS_RESOURCE , productData);
  return response.data;
}

export async function updatePublisher(id, productData) {
  const response = await AxiosConfig.put(`${PUBLISHERS_RESOURCE }/${id}`, productData);
  return response.data;
}

export async function deletePublisher(id) {
  const response = await AxiosConfig.delete(`${PUBLISHERS_RESOURCE }/${id}`);
  return response.data;
}

