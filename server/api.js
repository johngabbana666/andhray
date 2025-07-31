const express = require('express');
const cors = require('cors');
const { Pool, neonConfig } = require('@neondatabase/serverless');
const { drizzle } = require('drizzle-orm/neon-serverless');
const { pgTable, serial, text, timestamp, varchar } = require('drizzle-orm/pg-core');
const { eq } = require('drizzle-orm');
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

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// News endpoints
app.get('/api/news', async (req, res) => {
  try {
    const allNews = await db.select().from(news);
    res.json(allNews);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.post('/api/news', async (req, res) => {
  try {
    const newNews = await db.insert(news).values(req.body).returning();
    res.json(newNews[0]);
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(500).json({ error: 'Failed to create news' });
  }
});

app.put('/api/news/:id', async (req, res) => {
  try {
    const updatedNews = await db
      .update(news)
      .set({ ...req.body, updatedAt: new Date() })
      .where(eq(news.id, parseInt(req.params.id)))
      .returning();
    res.json(updatedNews[0]);
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({ error: 'Failed to update news' });
  }
});

app.delete('/api/news/:id', async (req, res) => {
  try {
    await db.delete(news).where(eq(news.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({ error: 'Failed to delete news' });
  }
});

// Releases endpoints
app.get('/api/releases', async (req, res) => {
  try {
    const allReleases = await db.select().from(releases);
    res.json(allReleases);
  } catch (error) {
    console.error('Error fetching releases:', error);
    res.status(500).json({ error: 'Failed to fetch releases' });
  }
});

app.post('/api/releases', async (req, res) => {
  try {
    const newRelease = await db.insert(releases).values(req.body).returning();
    res.json(newRelease[0]);
  } catch (error) {
    console.error('Error creating release:', error);
    res.status(500).json({ error: 'Failed to create release' });
  }
});

app.put('/api/releases/:id', async (req, res) => {
  try {
    const updatedRelease = await db
      .update(releases)
      .set({ ...req.body, updatedAt: new Date() })
      .where(eq(releases.id, parseInt(req.params.id)))
      .returning();
    res.json(updatedRelease[0]);
  } catch (error) {
    console.error('Error updating release:', error);
    res.status(500).json({ error: 'Failed to update release' });
  }
});

app.delete('/api/releases/:id', async (req, res) => {
  try {
    await db.delete(releases).where(eq(releases.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting release:', error);
    res.status(500).json({ error: 'Failed to delete release' });
  }
});

// Gallery endpoints
app.get('/api/gallery', async (req, res) => {
  try {
    const allGallery = await db.select().from(gallery);
    res.json(allGallery);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    res.status(500).json({ error: 'Failed to fetch gallery' });
  }
});

app.post('/api/gallery', async (req, res) => {
  try {
    const newGallery = await db.insert(gallery).values(req.body).returning();
    res.json(newGallery[0]);
  } catch (error) {
    console.error('Error creating gallery item:', error);
    res.status(500).json({ error: 'Failed to create gallery item' });
  }
});

app.put('/api/gallery/:id', async (req, res) => {
  try {
    const updatedGallery = await db
      .update(gallery)
      .set({ ...req.body, updatedAt: new Date() })
      .where(eq(gallery.id, parseInt(req.params.id)))
      .returning();
    res.json(updatedGallery[0]);
  } catch (error) {
    console.error('Error updating gallery item:', error);
    res.status(500).json({ error: 'Failed to update gallery item' });
  }
});

app.delete('/api/gallery/:id', async (req, res) => {
  try {
    await db.delete(gallery).where(eq(gallery.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    res.status(500).json({ error: 'Failed to delete gallery item' });
  }
});

// Events endpoints
app.get('/api/events', async (req, res) => {
  try {
    const allEvents = await db.select().from(events);
    res.json(allEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

app.post('/api/events', async (req, res) => {
  try {
    const newEvent = await db.insert(events).values(req.body).returning();
    res.json(newEvent[0]);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

app.put('/api/events/:id', async (req, res) => {
  try {
    const updatedEvent = await db
      .update(events)
      .set({ ...req.body, updatedAt: new Date() })
      .where(eq(events.id, parseInt(req.params.id)))
      .returning();
    res.json(updatedEvent[0]);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    await db.delete(events).where(eq(events.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

// Milestones endpoints
app.get('/api/milestones', async (req, res) => {
  try {
    const allMilestones = await db.select().from(milestones);
    res.json(allMilestones);
  } catch (error) {
    console.error('Error fetching milestones:', error);
    res.status(500).json({ error: 'Failed to fetch milestones' });
  }
});

app.post('/api/milestones', async (req, res) => {
  try {
    const newMilestone = await db.insert(milestones).values(req.body).returning();
    res.json(newMilestone[0]);
  } catch (error) {
    console.error('Error creating milestone:', error);
    res.status(500).json({ error: 'Failed to create milestone' });
  }
});

app.put('/api/milestones/:id', async (req, res) => {
  try {
    const updatedMilestone = await db
      .update(milestones)
      .set({ ...req.body, updatedAt: new Date() })
      .where(eq(milestones.id, parseInt(req.params.id)))
      .returning();
    res.json(updatedMilestone[0]);
  } catch (error) {
    console.error('Error updating milestone:', error);
    res.status(500).json({ error: 'Failed to update milestone' });
  }
});

app.delete('/api/milestones/:id', async (req, res) => {
  try {
    await db.delete(milestones).where(eq(milestones.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting milestone:', error);
    res.status(500).json({ error: 'Failed to delete milestone' });
  }
});

// Industrial Projects endpoints
app.get('/api/industrial-projects', async (req, res) => {
  try {
    const allProjects = await db.select().from(industrialProjects);
    res.json(allProjects);
  } catch (error) {
    console.error('Error fetching industrial projects:', error);
    res.status(500).json({ error: 'Failed to fetch industrial projects' });
  }
});

app.post('/api/industrial-projects', async (req, res) => {
  try {
    const newProject = await db.insert(industrialProjects).values(req.body).returning();
    res.json(newProject[0]);
  } catch (error) {
    console.error('Error creating industrial project:', error);
    res.status(500).json({ error: 'Failed to create industrial project' });
  }
});

app.put('/api/industrial-projects/:id', async (req, res) => {
  try {
    const updatedProject = await db
      .update(industrialProjects)
      .set({ ...req.body, updatedAt: new Date() })
      .where(eq(industrialProjects.id, parseInt(req.params.id)))
      .returning();
    res.json(updatedProject[0]);
  } catch (error) {
    console.error('Error updating industrial project:', error);
    res.status(500).json({ error: 'Failed to update industrial project' });
  }
});

app.delete('/api/industrial-projects/:id', async (req, res) => {
  try {
    await db.delete(industrialProjects).where(eq(industrialProjects.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting industrial project:', error);
    res.status(500).json({ error: 'Failed to delete industrial project' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`ANDHRAY API Server running on http://0.0.0.0:${PORT}`);
});

module.exports = app;