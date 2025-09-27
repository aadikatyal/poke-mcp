import { Ionicons } from '@expo/vector-icons';
import { Text, View, styled } from '@tamagui/core';
import { Image, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// PrizePicks-style components
const Container = styled(View, {
  flex: 1,
  backgroundColor: '#000000',
})

const Header = styled(View, {
  paddingHorizontal: 20,
  paddingTop: 60,
  paddingBottom: 20,
  backgroundColor: '#000000',
})

const TopBar = styled(View, {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 20,
})

const Logo = styled(Text, {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#FFFFFF',
  textAlign: 'center',
})

const LogoP = styled(Text, {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#8B5CF6',
})

const LiveButton = styled(View, {
  backgroundColor: '#00D4AA',
  borderRadius: 20,
  paddingHorizontal: 12,
  paddingVertical: 6,
})

const LiveText = styled(Text, {
  color: '#000000',
  fontSize: 12,
  fontWeight: 'bold',
})

const HeaderTitle = styled(Text, {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#FFFFFF',
  textAlign: 'center',
  marginBottom: 8,
})

const HeaderSubtitle = styled(Text, {
  fontSize: 16,
  color: '#CCCCCC',
  textAlign: 'center',
  fontWeight: '500',
})

const StatsCard = styled(View, {
  marginHorizontal: 20,
  marginBottom: 24,
  backgroundColor: '#1A1A1A',
  borderRadius: 16,
  padding: 24,
  borderWidth: 1,
  borderColor: '#333333',
})

const CardTitle = styled(Text, {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#FFFFFF',
  marginBottom: 20,
  textAlign: 'center',
})

const StatsRow = styled(View, {
  flexDirection: 'row',
  justifyContent: 'space-around',
})

const StatItem = styled(View, {
  alignItems: 'center',
})

const StatNumber = styled(Text, {
  fontSize: 28,
  fontWeight: 'bold',
  color: '#00D4AA',
  marginBottom: 4,
})

const StatLabel = styled(Text, {
  fontSize: 14,
  color: '#CCCCCC',
  fontWeight: '500',
})

const LeaderboardSection = styled(View, {
  paddingHorizontal: 20,
  paddingBottom: 40,
})

const SectionTitle = styled(Text, {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#FFFFFF',
  marginBottom: 16,
})

const PlayerCard = styled(View, {
  backgroundColor: '#1A1A1A',
  borderRadius: 16,
  padding: 20,
  marginBottom: 12,
  borderWidth: 1,
  borderColor: '#333333',
})

const PlayerRow = styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
})

const RankContainer = styled(View, {
  width: 50,
  alignItems: 'center',
  marginRight: 16,
})

const Rank = styled(Text, {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#00D4AA',
})

const PlayerInfo = styled(View, {
  flex: 1,
})

const PlayerName = styled(Text, {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#FFFFFF',
  marginBottom: 4,
})

const PlayerStats = styled(Text, {
  fontSize: 14,
  color: '#CCCCCC',
})

const TrophyContainer = styled(View, {
  width: 40,
  alignItems: 'center',
})

export default function LeaderboardScreen() {
  const insets = useSafeAreaInsets();

  return (
    <Container>
      <Header paddingTop={insets.top}>
            <TopBar>
              <TouchableOpacity 
                style={{
                  padding: 8,
                }}
                activeOpacity={0.7}
              >
                <Text style={{ fontSize: 20, color: '#FFFFFF' }}>☰</Text>
              </TouchableOpacity>
              <View flexDirection="row" alignItems="center">
                <Image 
                  source={require('../../assets/images/prizepicks-logo.png')}
                  style={{
                    width: 32,
                    height: 32,
                    marginRight: 8,
                  }}
                  resizeMode="contain"
                />
                <Logo>
                  PRIZEPICKS
                </Logo>
              </View>
              <LiveButton>
                <LiveText>LIVE</LiveText>
              </LiveButton>
            </TopBar>
        
        <View alignItems="center">
          <HeaderTitle>Leaderboard</HeaderTitle>
          <HeaderSubtitle>Top performers this week</HeaderSubtitle>
        </View>
      </Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Your stats */}
        <StatsCard>
          <CardTitle>Your Performance</CardTitle>
          <StatsRow>
            <StatItem>
              <StatNumber>12</StatNumber>
              <StatLabel>Picks</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>8</StatNumber>
              <StatLabel>Wins</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>66%</StatNumber>
              <StatLabel>Win Rate</StatLabel>
            </StatItem>
          </StatsRow>
        </StatsCard>

        {/* Leaderboard */}
        <LeaderboardSection>
          <SectionTitle>Weekly Leaders</SectionTitle>
          
          {[
            { rank: 1, name: "BallIsLife23", picks: 45, wins: 32, winRate: "71%" },
            { rank: 2, name: "HoopsKing", picks: 38, wins: 26, winRate: "68%" },
            { rank: 3, name: "NBAExpert", picks: 42, wins: 28, winRate: "67%" },
            { rank: 4, name: "You", picks: 12, wins: 8, winRate: "66%" },
            { rank: 5, name: "LakerFan99", picks: 35, wins: 22, winRate: "63%" },
          ].map((player) => (
            <PlayerCard key={player.rank}>
              <PlayerRow>
                <RankContainer>
                  <Rank>#{player.rank}</Rank>
                </RankContainer>
                <PlayerInfo>
                  <PlayerName>{player.name}</PlayerName>
                  <PlayerStats>
                    {player.picks} picks • {player.wins} wins • {player.winRate} win rate
                  </PlayerStats>
                </PlayerInfo>
                <TrophyContainer>
                  {player.rank <= 3 && (
                    <Ionicons 
                      name="star" 
                      size={24} 
                      color={player.rank === 1 ? "#FFD700" : player.rank === 2 ? "#C0C0C0" : "#CD7F32"} 
                    />
                  )}
                </TrophyContainer>
              </PlayerRow>
            </PlayerCard>
          ))}
        </LeaderboardSection>
      </ScrollView>
    </Container>
  );
}

