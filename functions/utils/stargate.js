const fetch = require("node-fetch");
const _ = require("lodash");

const methods = {
  get: "GET",
  post: "POST",
  put: "PUT",
  patch: "PATCH",
  delete: "DELETE",
};

const request = async (
  url = "",
  method = "",
  accessToken = "",
  data = null
) => {
  const res = await fetch(url, {
    method,
    headers: {
      Accepts: "application/json",
      "Content-Type": "application/json",
      "X-Cassandra-Token": accessToken,
    },
    redirect: "follow",
    body: data ? JSON.stringify(data) : null,
  });
  if (method === methods.delete) {
    return res;
  }
  res.jsonResponse = await res.json();
  return res;
};

class Client {
  constructor(baseUrl, accessToken) {
    this.baseUrl = baseUrl;
    this.accessToken = accessToken;
  }

  get(path) {
    return request(this.baseUrl + path, methods.get, this.accessToken);
  }

  post(path, data) {
    return request(this.baseUrl + path, methods.post, this.accessToken, data);
  }

  put(path, data) {
    return request(this.baseUrl + path, methods.put, this.accessToken, data);
  }

  patch(path, data) {
    return request(this.baseUrl + path, methods.patch, this.accessToken, data);
  }

  delete(path) {
    return request(this.baseUrl + path, methods.delete, this.accessToken);
  }
}

const createClient = async (connection) => {
  const res = await request(
    connection.baseUrl + "/api/rest/v1/auth",
    methods.post,
    "",
    {
      username: connection.username,
      password: connection.password,
    }
  );

  return new Client(
    connection.baseUrl + "/api/rest/v2",
    res.jsonResponse.authToken
  );
};

module.exports = { createClient, Client, request, methods };
