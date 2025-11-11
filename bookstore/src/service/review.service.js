import AxiosConfig from "../config/axios.config";

const REVIEWS_RESOURCE = "api/review";

// GET review by id
export async function getReviewById(id) {
  const response = await AxiosConfig.get(`${REVIEWS_RESOURCE}/${id}`);
  return response.data;
}

// CREATE a new review
export async function createReview(reviewData) {
  const response = await AxiosConfig.post(REVIEWS_RESOURCE, reviewData);
  return response.data;
}
