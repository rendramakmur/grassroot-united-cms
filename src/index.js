'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    // Registering a subscriber
    strapi.db.lifecycles.subscribe({
      models: ['plugin::users-permissions.user'], // Target the user model

      beforeCreate(event) {
        const { data } = event.params;
        data.userNumber = generateUserNumber();
        console.log('Generated userNumber:', data.userNumber); // Debug log
      },
    });

    // Generic subscribe for generic handling
    strapi.db.lifecycles.subscribe((event) => {
      if (event.action === 'beforeCreate' && event.model.uid === 'plugin::users-permissions.user') {
        const { data } = event.params;
        data.userNumber = generateUserNumber();
        console.log('Generated userNumber:', data.userNumber); // Debug log
      }
    });
  },
};

// Helper function to generate user number
const generateUserNumber = () => {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return `GRU-${randomNumber}`;
};