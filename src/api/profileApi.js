import { profileAxiosClient } from './profileApiClient';

export const fetchProfileApi = (params) => {
  return profileAxiosClient.get(`/profile`, {
    params: { code: params.code },
  });
};
