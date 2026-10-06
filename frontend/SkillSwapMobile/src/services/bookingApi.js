import apiClient, { fetchApi } from './api';










export const bookingApi = {
  // POST /api/bookings
  async createBooking(gigId, userId) {
    const response = await apiClient.post('/bookings', { gigId, userId });
    return response.data;
  },

  // GET /api/bookings/user/:userId - demonstrate fetchApi
  async getUserBookings(userId) {
    try {
      return await fetchApi(`/bookings/user/${userId}`);
    } catch {
      return [];
    }
  },

  // PUT /api/bookings/:id
  async updateBookingStatus(id, status) {
    const response = await apiClient.put(`/bookings/${id}`, { status });
    return response.data;
  },

  // DELETE /api/bookings/:id
  async deleteBooking(id) {
    await apiClient.delete(`/bookings/${id}`);
  }
};

export default bookingApi;