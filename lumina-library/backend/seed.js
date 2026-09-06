require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Book = require('./models/Book');

const users = [
  { name: 'Aditya',    email: 'aditya@lumina.com',    password: 'password123' },
  { name: 'Nishmitha', email: 'nishmitha@lumina.com',  password: 'password123' },
  { name: 'Library User One', email: 'user1@lumina.test', password: 'Test@12345' },
  { name: 'Library User Two', email: 'user2@lumina.test', password: 'Test@12345' },
];

// Shared library — belongs to no specific user
const sharedBooks = [
  { title: 'Atomic Habits',              author: 'James Clear',        category: 'Self-Help',   status: 'Available' },
  { title: 'The Psychology of Money',    author: 'Morgan Housel',      category: 'Non-Fiction', status: 'Issued'    },
  { title: 'Clean Code',                 author: 'Robert C. Martin',   category: 'Technology',  status: 'Available' },
  { title: 'The Alchemist',              author: 'Paulo Coelho',       category: 'Fiction',     status: 'Available' },
  { title: 'Deep Work',                  author: 'Cal Newport',        category: 'Self-Help',   status: 'Issued'    },
  { title: 'Rich Dad Poor Dad',          author: 'Robert Kiyosaki',    category: 'Non-Fiction', status: 'Available' },
  { title: 'Python Crash Course',        author: 'Eric Matthes',       category: 'Technology',  status: 'Issued'    },
  { title: 'Ikigai',                     author: 'Hector Garcia',      category: 'Self-Help',   status: 'Available' },
  { title: 'The Pragmatic Programmer',   author: 'David Thomas',       category: 'Technology',  status: 'Available' },
  { title: 'Think and Grow Rich',        author: 'Napoleon Hill',      category: 'Self-Help',   status: 'Issued'    },
  { title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling',        category: 'Fantasy',     status: 'Available' },
  { title: 'The Great Gatsby',           author: 'F. Scott Fitzgerald', category: 'Fiction',    status: 'Issued'    },
  { title: 'Sapiens',                    author: 'Yuval Noah Harari',  category: 'History',     status: 'Available' },
  { title: 'A Brief History of Time',    author: 'Stephen Hawking',    category: 'Science',     status: 'Available' },
  { title: 'Educated',                   author: 'Tara Westover',      category: 'Biography',   status: 'Available' },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      tls: true,
      tlsAllowInvalidCertificates: true,
      tlsAllowInvalidHostnames: true,
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    console.log('✅ MongoDB connected');

    await User.deleteMany({});
    await Book.deleteMany({});
    console.log('🗑️  Cleared existing users and books');

    // Create users — model pre-save hook handles password hashing
    for (const u of users) {
      await User.create(u);
      console.log(`👤 Created user: ${u.name} (${u.email})`);
    }

    // Seed shared books — no addedBy
    const books = await Book.insertMany(sharedBooks);
    console.log(`📚 Added ${books.length} shared books to the library`);

    console.log('\n✅ Seeding complete!\n');
    console.log('─────────────────────────────────────────');
    console.log('  Login credentials:');
    console.log('─────────────────────────────────────────');
    users.forEach((u) => console.log(`  ${u.email}  /  ${u.password}`));
    console.log('─────────────────────────────────────────\n');
    console.log('  All users share the same 15-book library.\n');

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
}

seed();
