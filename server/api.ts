import express from 'express';
import cors from 'cors';
import { db } from './db';
import { 
  news, 
  releases, 
  gallery, 
  events, 
  milestones, 
  industrialProjects,
  type InsertNews,
  type InsertRelease,
  type InsertGallery,
  type InsertEvent,
  type InsertMilestone,
  type InsertIndustrialProject
} from '../shared/schema';
import { eq } from 'drizzle-orm';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// News endpoints
app.get('/api/news', async (req, res) => {
  try {
    const allNews = await db.select().from(news).orderBy(news.createdAt);
    res.json(allNews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.post('/api/news', async (req, res) => {
  try {
    const newNews = await db.insert(news).values(req.body as InsertNews).returning();
    res.json(newNews[0]);
  } catch (error) {
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
    res.status(500).json({ error: 'Failed to update news' });
  }
});

app.delete('/api/news/:id', async (req, res) => {
  try {
    await db.delete(news).where(eq(news.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete news' });
  }
});

// Releases endpoints
app.get('/api/releases', async (req, res) => {
  try {
    const allReleases = await db.select().from(releases).orderBy(releases.createdAt);
    res.json(allReleases);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch releases' });
  }
});

app.post('/api/releases', async (req, res) => {
  try {
    const newRelease = await db.insert(releases).values(req.body as InsertRelease).returning();
    res.json(newRelease[0]);
  } catch (error) {
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
    res.status(500).json({ error: 'Failed to update release' });
  }
});

app.delete('/api/releases/:id', async (req, res) => {
  try {
    await db.delete(releases).where(eq(releases.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete release' });
  }
});

// Gallery endpoints
app.get('/api/gallery', async (req, res) => {
  try {
    const allGallery = await db.select().from(gallery).orderBy(gallery.createdAt);
    res.json(allGallery);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gallery' });
  }
});

app.post('/api/gallery', async (req, res) => {
  try {
    const newGallery = await db.insert(gallery).values(req.body as InsertGallery).returning();
    res.json(newGallery[0]);
  } catch (error) {
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
    res.status(500).json({ error: 'Failed to update gallery item' });
  }
});

app.delete('/api/gallery/:id', async (req, res) => {
  try {
    await db.delete(gallery).where(eq(gallery.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete gallery item' });
  }
});

// Events endpoints
app.get('/api/events', async (req, res) => {
  try {
    const allEvents = await db.select().from(events).orderBy(events.date);
    res.json(allEvents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

app.post('/api/events', async (req, res) => {
  try {
    const newEvent = await db.insert(events).values(req.body as InsertEvent).returning();
    res.json(newEvent[0]);
  } catch (error) {
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
    res.status(500).json({ error: 'Failed to update event' });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    await db.delete(events).where(eq(events.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

// Milestones endpoints
app.get('/api/milestones', async (req, res) => {
  try {
    const allMilestones = await db.select().from(milestones).orderBy(milestones.year);
    res.json(allMilestones);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch milestones' });
  }
});

app.post('/api/milestones', async (req, res) => {
  try {
    const newMilestone = await db.insert(milestones).values(req.body as InsertMilestone).returning();
    res.json(newMilestone[0]);
  } catch (error) {
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
    res.status(500).json({ error: 'Failed to update milestone' });
  }
});

app.delete('/api/milestones/:id', async (req, res) => {
  try {
    await db.delete(milestones).where(eq(milestones.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete milestone' });
  }
});

// Industrial Projects endpoints
app.get('/api/industrial-projects', async (req, res) => {
  try {
    const allProjects = await db.select().from(industrialProjects).orderBy(industrialProjects.createdAt);
    res.json(allProjects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch industrial projects' });
  }
});

app.post('/api/industrial-projects', async (req, res) => {
  try {
    const newProject = await db.insert(industrialProjects).values(req.body as InsertIndustrialProject).returning();
    res.json(newProject[0]);
  } catch (error) {
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
    res.status(500).json({ error: 'Failed to update industrial project' });
  }
});

app.delete('/api/industrial-projects/:id', async (req, res) => {
  try {
    await db.delete(industrialProjects).where(eq(industrialProjects.id, parseInt(req.params.id)));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete industrial project' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

export default app;