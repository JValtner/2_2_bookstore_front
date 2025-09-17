import AxiosConfig from "../config/axios.config";


const BOOKS_RESOURCE = 'api/books'; //Books

export async function getAllBooks() {
  const response = await AxiosConfig.get(BOOKS_RESOURCE);
  return response.data;
}

export async function getBookById(id) {
  const response = await AxiosConfig.get(`${BOOKS_RESOURCE}/${id}`);
  return response.data;
}

export async function createBook(productData) {
  const response = await AxiosConfig.post(BOOKS_RESOURCE, productData);
  return response.data;
}

export async function updateBook(id, productData) {
  const response = await AxiosConfig.put(`${BOOKS_RESOURCE}/${id}`, productData);
  return response.data;
}

export async function deleteBook(id) {
  const response = await AxiosConfig.delete(`${BOOKS_RESOURCE}/${id}`);
  return response.data;
}