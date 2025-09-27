import { Text, View, styled } from '@tamagui/core';
import { ScrollView } from '@tamagui/scroll-view';
import { Link } from 'expo-router';
import { Image, StatusBar, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Styled components for PrizePicks theme
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

const SportsTabs = styled(View, {
  flexDirection: 'row',
  paddingHorizontal: 16,
  gap: 12,
  marginBottom: 20,
})

const SportTab = styled(TouchableOpacity, {
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 20,
  backgroundColor: '#1A1A1A',
  borderWidth: 1,
  borderColor: '#333333',
})

const SportTabActive = styled(TouchableOpacity, {
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 20,
  backgroundColor: '#8B5CF6',
  borderWidth: 1,
  borderColor: '#00D4AA',
})

const SportTabText = styled(Text, {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '600',
})

const OnboardingSection = styled(View, {
  marginHorizontal: 16,
  marginBottom: 20,
  backgroundColor: '#1A1A1A',
  borderRadius: 12,
  padding: 16,
})

const OnboardingTitle = styled(Text, {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#FFFFFF',
  marginBottom: 4,
})

const OnboardingSubtitle = styled(Text, {
  fontSize: 14,
  color: '#CCCCCC',
  marginBottom: 16,
})

const StepItem = styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 12,
})

const StepNumber = styled(View, {
  width: 24,
  height: 24,
  borderRadius: 12,
  backgroundColor: '#333333',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 12,
})

const StepNumberText = styled(Text, {
  color: '#FFFFFF',
  fontSize: 12,
  fontWeight: 'bold',
})

const StepCheck = styled(View, {
  width: 24,
  height: 24,
  borderRadius: 12,
  backgroundColor: '#00D4AA',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 12,
})

const StepText = styled(Text, {
  flex: 1,
  color: '#FFFFFF',
  fontSize: 14,
})

const StepButton = styled(TouchableOpacity, {
  backgroundColor: '#8B5CF6',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 6,
})

const StepButtonText = styled(Text, {
  color: '#FFFFFF',
  fontSize: 12,
  fontWeight: '600',
})

const SectionTitle = styled(Text, {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#FFFFFF',
  marginHorizontal: 16,
  marginBottom: 12,
})

const GamesSection = styled(View, {
  marginHorizontal: 16,
  marginBottom: 20,
})

const GamesRow = styled(View, {
  flexDirection: 'row',
  gap: 12,
})

const GameCard = styled(TouchableOpacity, {
  flex: 1,
  backgroundColor: '#1A1A1A',
  borderRadius: 12,
  padding: 16,
  alignItems: 'center',
})

const GameIcon = styled(Text, {
  fontSize: 24,
  marginBottom: 8,
})

const GameText = styled(Text, {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 4,
})

const GameTime = styled(Text, {
  color: '#CCCCCC',
  fontSize: 12,
  textAlign: 'center',
})

const PopularPicksSection = styled(View, {
  marginHorizontal: 16,
  marginBottom: 20,
})

const PicksRow = styled(View, {
  flexDirection: 'row',
  gap: 12,
})

const PickCard = styled(TouchableOpacity, {
  width: 120,
  backgroundColor: '#1A1A1A',
  borderRadius: 12,
  padding: 12,
  alignItems: 'center',
})

const JerseyIcon = styled(Text, {
  fontSize: 32,
  marginBottom: 8,
})

const TeamName = styled(Text, {
  color: '#FFFFFF',
  fontSize: 12,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 4,
})

const PlayerNumber = styled(Text, {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 8,
})

const PopularityInfo = styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
})

const PopularityText = styled(Text, {
  color: '#CCCCCC',
  fontSize: 10,
})

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  
  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <ScrollView showsVerticalScrollIndicator={false}>
            {/* PrizePicks-style header */}
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
            </Header>

        {/* Sports filter bar */}
        <View paddingHorizontal={16} marginBottom={20}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View flexDirection="row" gap={8}>
              <View 
                style={{
                  backgroundColor: '#8B5CF6',
                  borderRadius: 20,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderWidth: 2,
                  borderColor: '#00D4AA',
                  shadowColor: '#8B5CF6',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <Text fontSize={14} fontWeight="600" color="#FFFFFF">NBA</Text>
              </View>
              <View backgroundColor="#1A1A1A" borderRadius={20} paddingHorizontal={16} paddingVertical={8} borderWidth={1} borderColor="#333333">
                <Text fontSize={14} fontWeight="600" color="#FFFFFF">NFL</Text>
              </View>
              <View backgroundColor="#1A1A1A" borderRadius={20} paddingHorizontal={16} paddingVertical={8} borderWidth={1} borderColor="#333333">
                <Text fontSize={14} fontWeight="600" color="#FFFFFF">MLB</Text>
              </View>
              <View backgroundColor="#1A1A1A" borderRadius={20} paddingHorizontal={16} paddingVertical={8} borderWidth={1} borderColor="#333333">
                <Text fontSize={14} fontWeight="600" color="#FFFFFF">NHL</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Let's get you started section */}
        <View paddingHorizontal={16} marginBottom={20}>
          <View backgroundColor="#1A1A1A" borderRadius={12} padding={16} borderWidth={1} borderColor="#333333">
            <Text fontSize={18} fontWeight="bold" color="#FFFFFF" marginBottom={4}>Let's get you started</Text>
            <Text fontSize={12} color="#CCCCCC" marginBottom={16}>Verify your account, add funds & start playing!</Text>
            
            <View flexDirection="row" alignItems="center" marginBottom={12}>
              <View width={20} height={20} borderRadius={10} backgroundColor="#00D4AA" marginRight={12} justifyContent="center" alignItems="center">
                <Text color="#000000" fontSize={12} fontWeight="bold">✓</Text>
              </View>
              <Text fontSize={14} color="#FFFFFF" flex={1}>Verify your email address</Text>
            </View>
            
            <View flexDirection="row" alignItems="center" marginBottom={12}>
              <View width={20} height={20} borderRadius={10} backgroundColor="#333333" marginRight={12} justifyContent="center" alignItems="center">
                <Text color="#FFFFFF" fontSize={12} fontWeight="bold">2</Text>
              </View>
              <Text fontSize={14} color="#FFFFFF" flex={1}>Deposit to claim bonus offer</Text>
              <Text fontSize={14} color="#00D4AA" fontWeight="600">Deposit page</Text>
            </View>
            
            <View flexDirection="row" alignItems="center">
              <View width={20} height={20} borderRadius={10} backgroundColor="#333333" marginRight={12} justifyContent="center" alignItems="center">
                <Text color="#FFFFFF" fontSize={12} fontWeight="bold">3</Text>
              </View>
              <Text fontSize={14} color="#FFFFFF" flex={1}>Place your first lineup</Text>
              <Text fontSize={14} color="#00D4AA" fontWeight="600">Game rules</Text>
            </View>
          </View>
        </View>

        {/* Promotions/Missions bar */}
        <View paddingHorizontal={16} marginBottom={20}>
          <View backgroundColor="#1A1A1A" borderRadius={8} padding={12} borderWidth={1} borderColor="#333333" flexDirection="row" alignItems="center">
            <View width={8} height={8} borderRadius={4} backgroundColor="#8B5CF6" marginRight={8} />
            <Text fontSize={14} fontWeight="600" color="#FFFFFF" marginRight={16}>FREE 2PLAY 4</Text>
            <Text fontSize={12} color="#CCCCCC" marginRight={16}>Promos 0</Text>
            <Text fontSize={12} color="#CCCCCC" marginRight={8}>Missions 0</Text>
            <Text fontSize={12} color="#CCCCCC">▼</Text>
          </View>
        </View>

        {/* Upcoming games section */}
        <View paddingHorizontal={16} marginBottom={20}>
          <Text fontSize={18} fontWeight="bold" color="#FFFFFF" marginBottom={12}>Upcoming games</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View flexDirection="row" gap={12}>
              <View backgroundColor="#1A1A1A" borderRadius={8} padding={12} borderWidth={1} borderColor="#333333" width={140}>
                <Text fontSize={16} marginBottom={4}>⚾</Text>
                <Text fontSize={14} fontWeight="600" color="#FFFFFF" marginBottom={2}>TB @ TOR</Text>
                <Text fontSize={11} color="#CCCCCC">Today • 3:07pm</Text>
              </View>
              <View backgroundColor="#1A1A1A" borderRadius={8} padding={12} borderWidth={1} borderColor="#333333" width={140}>
                <Text fontSize={16} marginBottom={4}>🏈</Text>
                <Text fontSize={14} fontWeight="600" color="#FFFFFF" marginBottom={2}>CAL @ BC</Text>
                <Text fontSize={11} color="#CCCCCC">Today • 3:30pm</Text>
              </View>
              <View backgroundColor="#1A1A1A" borderRadius={8} padding={12} borderWidth={1} borderColor="#333333" width={140}>
                <Text fontSize={16} marginBottom={4}>🏈</Text>
                <Text fontSize={14} fontWeight="600" color="#FFFFFF" marginBottom={2}>UTAH @ V</Text>
                <Text fontSize={11} color="#CCCCCC">Today • 3:30pm</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Popular picks section */}
        <View paddingHorizontal={16} marginBottom={20}>
          <Text fontSize={18} fontWeight="bold" color="#FFFFFF" marginBottom={12}>Popular picks</Text>
          <View backgroundColor="#1A1A1A" borderRadius={8} padding={12} borderWidth={1} borderColor="#333333">
            <View flexDirection="row" alignItems="center" marginBottom={8}>
              <View flexDirection="row" alignItems="center" flex={1}>
                <View width={32} height={32} borderRadius={16} backgroundColor="#CE1141" marginRight={8} justifyContent="center" alignItems="center">
                  <Text color="#FFFFFF" fontSize={12} fontWeight="bold">SD</Text>
                </View>
                <View width={32} height={32} borderRadius={16} backgroundColor="#333333" marginRight={8} />
                <View width={32} height={32} borderRadius={16} backgroundColor="#333333" marginRight={8} />
                <View width={32} height={32} borderRadius={16} backgroundColor="#333333" marginRight={8} />
                <Text fontSize={12} color="#CCCCCC">+2</Text>
              </View>
              <View alignItems="flex-end">
                <Text fontSize={14} fontWeight="bold" color="#00D4AA">Pays up to 40x</Text>
                <Text fontSize={12} color="#00D4AA">Finalize Lineup →</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick access buttons */}
        <View paddingHorizontal={16} gap={8} marginBottom={24}>
          <Link href="/picks">
            <Link.Trigger>
              <View backgroundColor="#1A1A1A" borderRadius={8} padding={12} flexDirection="row" alignItems="center" borderWidth={1} borderColor="#333333">
                <Text fontSize={16} color="#00D4AA" marginRight={10}>🏀</Text>
                <View flex={1}>
                  <Text fontSize={14} fontWeight="600" color="#FFFFFF">NBA Picks</Text>
                  <Text fontSize={11} color="#CCCCCC">Make your picks</Text>
                </View>
                <Text fontSize={14} color="#CCCCCC">→</Text>
              </View>
            </Link.Trigger>
          </Link>

          <Link href="/chat">
            <Link.Trigger>
              <View backgroundColor="#1A1A1A" borderRadius={8} padding={12} flexDirection="row" alignItems="center" borderWidth={1} borderColor="#333333">
                <Text fontSize={16} color="#00D4AA" marginRight={10}>💬</Text>
                <View flex={1}>
                  <Text fontSize={14} fontWeight="600" color="#FFFFFF">Community</Text>
                  <Text fontSize={11} color="#CCCCCC">Join the chat</Text>
                </View>
                <Text fontSize={14} color="#CCCCCC">→</Text>
              </View>
            </Link.Trigger>
          </Link>

          <Link href="/text-to-bet">
            <Link.Trigger>
              <View backgroundColor="#1A1A1A" borderRadius={8} padding={12} flexDirection="row" alignItems="center" borderWidth={1} borderColor="#333333">
                <Text fontSize={16} color="#00D4AA" marginRight={10}>📱</Text>
                <View flex={1}>
                  <Text fontSize={14} fontWeight="600" color="#FFFFFF">Text to Bet</Text>
                  <Text fontSize={11} color="#CCCCCC">AI-powered betting</Text>
                </View>
                <Text fontSize={14} color="#CCCCCC">→</Text>
              </View>
            </Link.Trigger>
          </Link>
        </View>

        {/* Stats section */}
        <View paddingHorizontal={16} paddingBottom={40}>
          <Text fontSize={18} fontWeight="bold" color="#FFFFFF" marginBottom={12}>Your Performance</Text>
          <View flexDirection="row" gap={8}>
            <View flex={1} backgroundColor="#1A1A1A" borderRadius={8} padding={12} alignItems="center" borderWidth={1} borderColor="#333333">
              <Text fontSize={20} fontWeight="bold" color="#00D4AA" marginBottom={2}>12</Text>
              <Text fontSize={10} color="#CCCCCC" textAlign="center">Picks Today</Text>
            </View>
            <View flex={1} backgroundColor="#1A1A1A" borderRadius={8} padding={12} alignItems="center" borderWidth={1} borderColor="#333333">
              <Text fontSize={20} fontWeight="bold" color="#00D4AA" marginBottom={2}>8</Text>
              <Text fontSize={10} color="#CCCCCC" textAlign="center">Wins</Text>
            </View>
            <View flex={1} backgroundColor="#1A1A1A" borderRadius={8} padding={12} alignItems="center" borderWidth={1} borderColor="#333333">
              <Text fontSize={20} fontWeight="bold" color="#00D4AA" marginBottom={2}>66%</Text>
              <Text fontSize={10} color="#CCCCCC" textAlign="center">Win Rate</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
