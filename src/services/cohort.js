import { api } from './api';

export const cohortService = {
  /**
   * Fetches active cohorts
   * GET /api/v1/cohorts
   */
  getActiveCohorts: async () => {
    return api.get('/api/v1/cohorts');
  },

  /**
   * Fetches a cohort by its slug
   * GET /api/v1/cohorts/:slug
   */
  getCohortBySlug: async (slug) => {
    return api.get(`/api/v1/cohorts/${slug}`);
  },
};
