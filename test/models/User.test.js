// test/models/User.test.js

const { User } = require('../../db/models'); // Import the User model
const { sequelize } = require('../../config/database'); // Import the Sequelize instance for mocking

describe('User Model', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Sync the model with the database and force it to recreate tables (for testing)
  });

  afterAll(async () => {
    await sequelize.close(); // Close the database connection after all tests are done
  });

  it('should create a new user', async () => {
    const userData = { username: 'testuser', email: 'test@example.com', password: 'password123' };
    const user = await User.create(userData);

    expect(user.username).toBe(userData.username);
    expect(user.email).toBe(userData.email);
    // Add more assertions as needed
  });

  // Add more test cases for other model methods, associations, and validations
});
