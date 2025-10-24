/**
 * Custom field configurations for better UX in admin panel
 */

export default {
  // Customize how chef profiles are displayed in lists
  'api::chef-profile.chef-profile': {
    layouts: {
      list: ['user', 'location', 'hourlyRate', 'averageRating', 'isApproved'],
    },
  },
  // Customize booking display
  'api::booking.booking': {
    layouts: {
      list: ['client', 'chef', 'bookingDate', 'status', 'totalPrice'],
    },
  },
  // Customize review display
  'api::review.review': {
    layouts: {
      list: ['chef', 'client', 'rating', 'createdAt', 'isApproved'],
    },
  },
};

