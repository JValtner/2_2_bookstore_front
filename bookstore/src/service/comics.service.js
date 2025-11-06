import AxiosConfig from "../config/axios.config";

const VOLUMES_RESOURCE = "api/Volumes/search";
const ISSUES_RESOURCE = "api/Issues/search";
const LOCAL_ISSUE_RESOURCE = "api/issues/local"

// GET all volumes with filter, sort, pagination
export async function getAllVolumes(filter, sort, page, pageSize) {
  const response = await AxiosConfig.get(
  `${VOLUMES_RESOURCE}?filter=${filter}&sortdirection=${sort}&page=${page}&pageSize=${pageSize}`
);
return response.data;
};
// GET all issues with filter, sort, pagination
export async function getAllIssues(formattedFilter, sort, page, pageSize) {
  const response = await AxiosConfig.get(
  `${ISSUES_RESOURCE}?filter=${formattedFilter}&sortdirection=${sort}&page=${page}&pageSize=${pageSize}`
);
return response.data;
};


export const createLocalIssue = async (data) => {
  const response = await AxiosConfig.post(LOCAL_ISSUE_RESOURCE, data)
  return response.data
}
