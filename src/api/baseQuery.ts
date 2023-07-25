import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import getAnswer from '../_mock_/getPosts.json';

const api = axios.create();

export const mock = new MockAdapter(api);

mock.onGet("/api/posts").reply(200, {
  posts: getAnswer
});

export default api;