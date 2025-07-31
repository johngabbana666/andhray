const { Pool, neonConfig } = require('@neondatabase/serverless');
const { drizzle } = require('drizzle-orm/neon-serverless');
const { pgTable, serial, text, timestamp, varchar } = require('drizzle-orm/pg-core');
const ws = require('ws');

neonConfig.webSocketConstructor = ws;

// Define schema
const news = pgTable('news', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  url: text('url').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

const releases = pgTable('releases', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  date: varchar('date', { length: 100 }).notNull(),
  imageUrl: text('image_url').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

const gallery = pgTable('gallery', {
  id: serial('id').primaryKey(),
  type: varchar('type', { length: 50 }).notNull(),
  url: text('url').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

const events = pgTable('events', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  date: varchar('date', { length: 100 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  ticketUrl: text('ticket_url'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

const milestones = pgTable('milestones', {
  id: serial('id').primaryKey(),
  year: varchar('year', { length: 10 }).notNull(),
  text: text('text').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

const industrialProjects = pgTable('industrial_projects', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema: { news, releases, gallery, events, milestones, industrialProjects } });

async function seedDatabase() {
  try {
    console.log('Seeding database...');

    // Seed news
    await db.insert(news).values([
      {
        title: 'New Industrial EP Release',
        type: 'image',
        url: 'https://via.placeholder.com/800x400/1a1a1a/E53935?text=INDUSTRIAL+EP',
        description: 'Latest dark techno release featuring 4 tracks of pure industrial energy'
      },
      {
        title: 'Berlin Underground Performance',
        type: 'video',
        url: 'https://via.placeholder.com/800x400/1a1a1a/FB8C00?text=LIVE+BERLIN',
        description: 'Live performance from the underground Berlin scene'
      },
      {
        title: 'Studio Session Behind the Scenes',
        type: 'image',
        url: 'https://via.placeholder.com/800x400/1a1a1a/FDD835?text=STUDIO+SESSION',
        description: 'Exclusive look into the creative process'
      }
    ]);

    // Seed releases
    await db.insert(releases).values([
      {
        title: 'RITUALS EP',
        date: 'September 2025',
        imageUrl: 'https://via.placeholder.com/300x200/E53935/ffffff?text=RITUALS'
      },
      {
        title: 'FREQUENCIES Single',
        date: 'October 2025',
        imageUrl: 'https://via.placeholder.com/300x200/FB8C00/ffffff?text=FREQUENCIES'
      }
    ]);

    // Seed gallery
    await db.insert(gallery).values([
      {
        type: 'image',
        url: 'https://via.placeholder.com/400x400/1a1a1a/FB8C00?text=Photo+1',
        title: 'Studio Session'
      },
      {
        type: 'image',
        url: 'https://via.placeholder.com/400x400/1a1a1a/E53935?text=Photo+2',
        title: 'Live Performance'
      },
      {
        type: 'video',
        url: 'https://via.placeholder.com/400x400/1a1a1a/FDD835?text=Video+1',
        title: 'Behind the Scenes'
      }
    ]);

    // Seed events
    await db.insert(events).values([
      {
        title: 'Industrial Night Berlin',
        date: '2025-08-15',
        location: 'Berghain, Berlin',
        ticketUrl: '#'
      },
      {
        title: 'Techno Underground Festival',
        date: '2025-09-20',
        location: 'Amsterdam, Netherlands',
        ticketUrl: '#'
      },
      {
        title: 'ANDHRAY Solo Show',
        date: '2025-10-10',
        location: 'Paris, France',
        ticketUrl: '#'
      }
    ]);

    // Seed milestones
    await db.insert(milestones).values([
      {
        year: '2021',
        text: 'Started producing industrial techno'
      },
      {
        year: '2022',
        text: 'First major festival performance'
      },
      {
        year: '2023',
        text: 'Founded Industrial Girls Records'
      },
      {
        year: '2024',
        text: 'International tour across 10 countries'
      }
    ]);

    // Seed industrial projects
    await db.insert(industrialProjects).values([
      {
        title: 'Label Releases',
        description: '25+ artists featured'
      },
      {
        title: 'Collaborations',
        description: 'International partnerships'
      },
      {
        title: 'Events',
        description: 'Monthly showcases'
      }
    ]);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();