import axios from "axios";
import { config } from "../../config";

const instance = axios.create({
  baseURL: config.serverUrl,
});

export const api_service = {
  add_data: async (data: any) => {
    return instance.post("/student", data);
  },

  update_data: async (data: any) => {
    return instance.put(`/student/${data.module_row_id}`, data.body);
  },

  list_data: async (body: any) => {
    return instance.get(
      `/student/${body.pagination.offset}/${body.pagination.limit}`
    );
  },

  list_data_by_params: async () => {
    return instance.get("/student");
  },

  delete_data_by_params: async (module_row_id: any) => {
    return instance.delete(`/student/${module_row_id}`);
  },
};
