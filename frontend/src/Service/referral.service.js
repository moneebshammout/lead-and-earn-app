const { VITE_API_URL } = import.meta.env;

/**
 * After visiting the referral link, generate a new referral view.
 *
 * @param {number} id
 *
 * @return {Promise<object>}
 */
const viewReferralLink = async (id) => {
  return await fetch(`${VITE_API_URL}/referral/${id}/`);
};

export { viewReferralLink };
