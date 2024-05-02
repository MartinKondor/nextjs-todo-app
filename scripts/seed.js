const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');


// Placeholder data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442b',
    name: 'User2',
    email: 'user2@nextmail.com',
    password: '123456',
  },
];

const todoLists = [
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c61',
    user_id: users[0].id
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c62',
    user_id: users[0].id
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c63',
    user_id: users[1].id
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c64',
    user_id: users[1].id
  },
];


async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedInvoices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS todo_list (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        title TEXT NOT NULL, 
        content TEXT NOT NULL, 
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    console.log(`Created "todo_list" table`);

    // Insert data into the "invoices" table
    const insertedTodoLists = await Promise.all(
      todoLists.map(
        (todoList) => client.sql`
        INSERT INTO todo_list (user_id, title, content)
        VALUES (${todoList.user_id}, ${todoList.title}, ${todoList.content})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedTodoLists.length} invoices`);

    return {
      createTable,
      todoLists: insertedTodoLists,
    };
  } catch (error) {
    console.error('Error seeding todo_lists:', error);
    throw error;
  }
}
