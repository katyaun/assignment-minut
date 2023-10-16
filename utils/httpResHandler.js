export const handleRes = ({ response, data, status }) => {
  return response.status(status || 200).json(data);
};

export const sendCookie = ({ response, name, value, httpOnly = true }) => {
  return response.cookie(name, value, { httpOnly });
};
