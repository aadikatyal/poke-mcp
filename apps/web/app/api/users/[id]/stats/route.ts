import { NextResponse } from 'next/server';

// Simple deterministic hash from a string
function hashCode(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const TEAMS = [
  'Lakers',
  'Warriors',
  'Celtics',
  'Heat',
  'Knicks',
  'Eagles',
  'Patriots',
  'Cowboys',
  '49ers',
  'Chiefs',
  'Yankees',
  'Dodgers',
  'Braves',
  'Mets',
  'Rays',
];

const PLAYERS = [
  'LeBron James',
  'Steph Curry',
  'Jayson Tatum',
  'Jimmy Butler',
  'Patrick Mahomes',
  'Christian McCaffrey',
  'Shohei Ohtani',
  'Aaron Judge',
  'Mookie Betts',
  'Nikola Jokic',
  'Luka Doncic',
  'Giannis Antetokounmpo',
];

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const h = hashCode(id);

  const openLineups = (h % 5) + 1; // 1-5
  const totalMoneyWon = ((h % 5000) + 250) * 1.0; // $250 - $5,250

  // Pick top 3 players deterministically
  const p1 = PLAYERS[h % PLAYERS.length];
  const p2 = PLAYERS[(h >> 2) % PLAYERS.length];
  const p3 = PLAYERS[(h >> 3) % PLAYERS.length];
  const topWinningPlayers = [p1, p2, p3].map((name, i) => ({
    name,
    winnings: Math.round(((h >> (i + 1)) % 1500) + 250),
  }));

  const favoriteTeam = TEAMS[(h >> 1) % TEAMS.length];

  return NextResponse.json({
    ok: true,
    userId: id,
    openLineups,
    totalMoneyWon,
    topWinningPlayers,
    favoriteTeam,
  });
}

