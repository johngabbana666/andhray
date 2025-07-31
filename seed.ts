import { db } from './db';
import { 
  news, 
  releases, 
  gallery, 
  events, 
  milestones, 
  industrialProjects 
} from '../shared/schema';

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
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

if (require.main === module) {
  seedDatabase();
}

export default seedDatabase;