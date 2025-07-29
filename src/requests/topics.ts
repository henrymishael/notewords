import { _axios } from ".";

export const getAllTopics = async () => {
  const response = await _axios.get("/topics");
  return response.data;
};
