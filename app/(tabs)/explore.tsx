import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Icon, Text } from 'react-native-elements';

export default function LeaderboardScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <Text style={styles.subtitle}>Top performers this week</Text>
      </View>

      {/* Your stats */}
      <Card containerStyle={styles.statsCard}>
        <Card.Title style={styles.cardTitle}>Your Performance</Card.Title>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Picks</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Wins</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>66%</Text>
            <Text style={styles.statLabel}>Win Rate</Text>
          </View>
        </View>
      </Card>

      {/* Leaderboard */}
      <View style={styles.leaderboardSection}>
        <Text style={styles.sectionTitle}>Weekly Leaders</Text>
        
        {[
          { rank: 1, name: "BallIsLife23", picks: 45, wins: 32, winRate: "71%" },
          { rank: 2, name: "HoopsKing", picks: 38, wins: 26, winRate: "68%" },
          { rank: 3, name: "NBAExpert", picks: 42, wins: 28, winRate: "67%" },
          { rank: 4, name: "You", picks: 12, wins: 8, winRate: "66%" },
          { rank: 5, name: "LakerFan99", picks: 35, wins: 22, winRate: "63%" },
        ].map((player) => (
          <Card key={player.rank} containerStyle={styles.leaderboardCard}>
            <View style={styles.playerRow}>
              <View style={styles.rankContainer}>
                <Text style={styles.rank}>#{player.rank}</Text>
              </View>
              <View style={styles.playerInfo}>
                <Text style={styles.playerName}>{player.name}</Text>
                <Text style={styles.playerStats}>
                  {player.picks} picks • {player.wins} wins • {player.winRate} win rate
                </Text>
              </View>
              <View style={styles.trophyContainer}>
                {player.rank <= 3 && (
                  <Icon 
                    name="star" 
                    size={20} 
                    color={player.rank === 1 ? "#FFD700" : player.rank === 2 ? "#C0C0C0" : "#CD7F32"} 
                  />
                )}
              </View>
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    padding: 24,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#CCCCCC',
  },
  statsCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    margin: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00D4AA',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  leaderboardSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  leaderboardCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
  },
  rank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00D4AA',
  },
  playerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  playerStats: {
    fontSize: 12,
    color: '#CCCCCC',
  },
  trophyContainer: {
    width: 30,
    alignItems: 'center',
  },
});
