import axios from "axios";

const BASE_URL = process.env.BACKEND_URL;

export default () => ({
  index: (channelId) => {
    return axios.get(`${BASE_URL}/messages/${channelId}`, {
      withCredentials: true,
    });
  },
  show: (id) => {
    return axios.get(`${BASE_URL}/messages/${id}`, {
      withCredentials: true,
    });
  },
  create: (content, channelId) => {
    return axios.post(
      `${BASE_URL}/messages`,
      {
        message: {
          content,
          channel_id: channelId,
        },
      },
      { withCredentials: true }
    );
  },
});
