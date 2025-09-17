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