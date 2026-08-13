import { api } from './api';

export const referralService = {
  validateCreator: async (creatorCode) => {
    return api.get(`/api/v1/referrals/validate/${creatorCode}`);
  },

  captureEmail: async (email, creatorCode) => {
    return api.post('/api/v1/referrals/capture', { email, creatorCode });
  },
};
