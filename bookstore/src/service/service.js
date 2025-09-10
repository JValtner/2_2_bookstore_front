import AxiosConfig from "../config/axios.config";
const AUTHORS_RESOURCE = 'api/authors'; //Authors

export async function getAllAuthors() {
  const response = await AxiosConfig.get(AUTHORS_RESOURCE);
  return response.data;
}

export async function getAuthorById(id) {
  const response = await AxiosConfig.get(`${AUTHORS_RESOURCE}/${id}`);
  return response.data;
}

export async function createAuthor(productData) {
  const response = await AxiosConfig.post(AUTHORS_RESOURCE, productData);
  return response.data;
}

export async function updateAuthor(id, productData) {
  const response = await AxiosConfig.put(`${AUTHORS_RESOURCE}/${id}`, productData);
  return response.data;
}

export async function deleteAuthor(id) {
  const response = await AxiosConfig.delete(`${AUTHORS_RESOURCE}/${id}`);
  return response.data;
}

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

