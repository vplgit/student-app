import axios from "axios";
import { config } from "../../config";

const instance = axios.create({
  baseURL: config.serverUrl,
});

interface User {
  module_row_id?: number;
  first_name: string;
  last_name: string;
  email: string;
  contact: string;
}

export const api_service = {
  add_data: async (data: User) => {
    return instance.post("/user/save", data);
  },

  update_data: async (data: User) => {
    return instance.put("/user/update", data);
  },

  list_data: async () => {
    return instance.get("/user/list");
  },

  get_update_save_count: async () => {
    return instance.get("/user/update_save_count");
  },
};
