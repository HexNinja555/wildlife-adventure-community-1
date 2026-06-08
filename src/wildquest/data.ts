// WildQuest static data: species gallery, challenges, badges, seed feed

export const IMG = {
  hero: 'https://d64gsuwffb70l.cloudfront.net/6a2650d20fb250ab0e344b36_1780896051530_31845f6b.jpg',
  squirrel: 'https://d64gsuwffb70l.cloudfront.net/6a2650d20fb250ab0e344b36_1780896084859_2fbbf2b7.png',
  squirrel2: 'https://d64gsuwffb70l.cloudfront.net/6a2650d20fb250ab0e344b36_1780896078479_36274ba7.png',
  squirrel3: 'https://d64gsuwffb70l.cloudfront.net/6a2650d20fb250ab0e344b36_1780896078641_2bf18279.png',
  squirrel4: 'https://d64gsuwffb70l.cloudfront.net/6a2650d20fb250ab0e344b36_1780896076956_ae026ffb.jpg',
  monarch: 'https://d64gsuwffb70l.cloudfront.net/6a2650d20fb250ab0e344b36_1780896112600_5d2a7c8f.png',
  deer: 'https://d64gsuwffb70l.cloudfront.net/6a2650d20fb250ab0e344b36_1780896119458_9a9678e6.png',
  mallard: 'https://d64gsuwffb70l.cloudfront.net/6a2650d20fb250ab0e344b36_1780896114976_df21f559.png',
  heron: 'https://d64gsuwffb70l.cloudfront.net/6a2650d20fb250ab0e344b36_1780896189022_10de3dea.png',
  cardinal: 'https://d64gsuwffb70l.cloudfront.net/6a2650d20fb250ab0e344b36_1780896207528_428a2a88.jpg',
  raccoon: 'https://d64gsuwffb70l.cloudfront.net/6a2650d20fb250ab0e344b36_1780896334366_68c58100.png',
  turtle: 'https://d64gsuwffb70l.cloudfront.net/6a2650d20fb250ab0e344b36_1780896225931_f17ae840.png',
  robin: 'https://d64gsuwffb70l.cloudfront.net/6a2650d20fb250ab0e344b36_1780896215815_fc6873de.png',
  fox: 'https://d64gsuwffb70l.cloudfront.net/6a2650d20fb250ab0e344b36_1780896367446_bcbf34e3.jpg',
  fox2: 'https://d64gsuwffb70l.cloudfront.net/6a2650d20fb250ab0e344b36_1780896368932_8639c09f.jpg',
};

export interface Challenge {
  id: string; title: string; description: string; difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string; start: string; end: string; targets: number; points: number;
  participants: number; badge: string; color: string; image: string;
}

export const CHALLENGES: Challenge[] = [
  { id: 'backyard-birds', title: 'Backyard Birds', description: 'Spot and identify 10 bird species visiting your yard or local park.', difficulty: 'Easy', category: 'Birds', start: 'Jun 1', end: 'Jun 30', targets: 10, points: 250, participants: 1840, badge: 'Bird Watcher', color: 'from-sky-500 to-cyan-600', image: IMG.cardinal },
  { id: 'urban-wildlife', title: 'Urban Wildlife', description: 'Document wildlife thriving in the city — from rooftops to alleyways.', difficulty: 'Medium', category: 'Mammals', start: 'Jun 1', end: 'Jul 15', targets: 8, points: 320, participants: 920, badge: 'Urban Naturalist', color: 'from-amber-500 to-orange-600', image: IMG.raccoon },
  { id: 'forest-critters', title: 'Forest Critters', description: 'Venture into the woods and capture 12 forest-dwelling species.', difficulty: 'Hard', category: 'Mixed', start: 'May 15', end: 'Aug 1', targets: 12, points: 480, participants: 640, badge: 'Forest Explorer', color: 'from-emerald-600 to-green-800', image: IMG.fox },
  { id: 'pollinator-patrol', title: 'Pollinator Patrol', description: 'Photograph 15 pollinators — bees, butterflies, moths and more.', difficulty: 'Medium', category: 'Insects', start: 'Jun 1', end: 'Sep 1', targets: 15, points: 400, participants: 1130, badge: 'Pollinator Hero', color: 'from-yellow-400 to-amber-500', image: IMG.monarch },
  { id: 'wetland-watch', title: 'Wetland Watch', description: 'Explore marshes and ponds to find herons, ducks and amphibians.', difficulty: 'Medium', category: 'Wetland', start: 'Jun 1', end: 'Jul 31', targets: 9, points: 350, participants: 580, badge: 'Wetland Warden', color: 'from-teal-500 to-emerald-700', image: IMG.heron },
  { id: 'night-life', title: 'Night Life', description: 'Capture nocturnal creatures after dark — owls, bats and foxes.', difficulty: 'Hard', category: 'Nocturnal', start: 'Jun 1', end: 'Aug 31', targets: 6, points: 520, participants: 310, badge: 'Night Tracker', color: 'from-indigo-600 to-slate-800', image: IMG.fox2 },
  { id: 'five-species-weekend', title: 'Five Species Weekend', description: 'Identify 5 different species in a single weekend. Quick & fun!', difficulty: 'Easy', category: 'Mixed', start: 'This weekend', end: '48 hrs', targets: 5, points: 150, participants: 2210, badge: 'Weekend Warrior', color: 'from-rose-400 to-pink-600', image: IMG.deer },
  { id: 'rare-find', title: 'Rare Find Challenge', description: 'Document a rare or threatened species (location auto-protected).', difficulty: 'Hard', category: 'Rare', start: 'Year-round', end: 'Ongoing', targets: 1, points: 600, participants: 145, badge: 'Rare Discovery', color: 'from-fuchsia-600 to-purple-800', image: IMG.turtle },
];

export interface Badge { id: string; name: string; desc: string; icon: string; tier: string; }
export const BADGES: Badge[] = [
  { id: 'first-upload', name: 'First Upload', desc: 'Upload your very first observation.', icon: 'camera', tier: 'Bronze' },
  { id: 'bird-watcher', name: 'Bird Watcher', desc: 'Identify 10 bird species.', icon: 'bird', tier: 'Silver' },
  { id: 'mammal-tracker', name: 'Mammal Tracker', desc: 'Identify 10 mammals.', icon: 'paw', tier: 'Silver' },
  { id: 'pollinator-hero', name: 'Pollinator Hero', desc: 'Document 15 pollinators.', icon: 'leaf', tier: 'Gold' },
  { id: 'forest-explorer', name: 'Forest Explorer', desc: 'Complete the Forest Critters hunt.', icon: 'compass', tier: 'Gold' },
  { id: 'urban-naturalist', name: 'Urban Naturalist', desc: 'Complete the Urban Wildlife hunt.', icon: 'mappin', tier: 'Silver' },
  { id: 'challenge-champion', name: 'Challenge Champion', desc: 'Complete 5 challenges.', icon: 'trophy', tier: 'Gold' },
  { id: 'community-contributor', name: 'Community Contributor', desc: 'Share 25 observations to the feed.', icon: 'community', tier: 'Silver' },
  { id: 'rare-discovery', name: 'Rare Discovery', desc: 'Document a rare species.', icon: 'star', tier: 'Platinum' },
];

export interface SeedPost {
  id: string; username: string; avatar: string; image: string; common: string; sci: string;
  category: string; confidence: number; location: string; date: string; caption: string;
  challenge?: string; likes: number; comments: { username: string; body: string }[];
}

export const SEED_FEED: SeedPost[] = [
  { id: 'p1', username: 'maya_wilds', avatar: 'M', image: IMG.heron, common: 'Great Blue Heron', sci: 'Ardea herodias', category: 'Bird', confidence: 96, location: 'Willow Marsh (generalized)', date: '2h ago', caption: 'Stood motionless for 20 minutes before this strike. Patience pays off!', challenge: 'Wetland Watch', likes: 142, comments: [{ username: 'finch_fan', body: 'Incredible shot!' }, { username: 'tomr', body: 'The reflection is unreal.' }] },
  { id: 'p2', username: 'trailrunner_jo', avatar: 'J', image: IMG.fox, common: 'Red Fox', sci: 'Vulpes vulpes', category: 'Mammal', confidence: 91, location: 'Pine Ridge Trail', date: '5h ago', caption: 'Golden hour gifted me this curious visitor on the Forest Critters hunt.', challenge: 'Forest Critters', likes: 208, comments: [{ username: 'maya_wilds', body: 'Those eyes!' }] },
  { id: 'p3', username: 'beelover', avatar: 'B', image: IMG.monarch, common: 'Monarch Butterfly', sci: 'Danaus plexippus', category: 'Insect', confidence: 98, location: 'Community Garden', date: '8h ago', caption: 'Tagged for the migration study. Plant milkweed, everyone!', challenge: 'Pollinator Patrol', likes: 97, comments: [] },
  { id: 'p4', username: 'cityspotter', avatar: 'C', image: IMG.raccoon, common: 'Raccoon', sci: 'Procyon lotor', category: 'Mammal', confidence: 88, location: 'Downtown (generalized)', date: '12h ago', caption: 'Masked bandit caught red-handed near the park bins.', challenge: 'Urban Wildlife', likes: 64, comments: [{ username: 'jo', body: 'Haha classic!' }] },
  { id: 'p5', username: 'backyardbirder', avatar: 'B', image: IMG.cardinal, common: 'Northern Cardinal', sci: 'Cardinalis cardinalis', category: 'Bird', confidence: 95, location: 'My backyard', date: '1d ago', caption: 'A splash of red on a grey morning. Backyard Birds #7 of 10!', challenge: 'Backyard Birds', likes: 173, comments: [] },
  { id: 'p6', username: 'pond_pete', avatar: 'P', image: IMG.turtle, common: 'Painted Turtle', sci: 'Chrysemys picta', category: 'Reptile', confidence: 93, location: 'Cedar Pond', date: '1d ago', caption: 'Basking buddy enjoying the sun on a half-submerged log.', likes: 51, comments: [] },
];

export const LEADERBOARD = [
  { rank: 1, username: 'maya_wilds', points: 8420, observations: 312, badges: 8, avatar: 'M' },
  { rank: 2, username: 'trailrunner_jo', points: 7980, observations: 298, badges: 7, avatar: 'J' },
  { rank: 3, username: 'beelover', points: 6510, observations: 241, badges: 6, avatar: 'B' },
  { rank: 4, username: 'cityspotter', points: 5890, observations: 220, badges: 6, avatar: 'C' },
  { rank: 5, username: 'backyardbirder', points: 5340, observations: 198, badges: 5, avatar: 'B' },
  { rank: 6, username: 'pond_pete', points: 4720, observations: 175, badges: 5, avatar: 'P' },
  { rank: 7, username: 'forest_fern', points: 4310, observations: 160, badges: 4, avatar: 'F' },
  { rank: 8, username: 'owl_oliver', points: 3990, observations: 148, badges: 4, avatar: 'O' },
];
