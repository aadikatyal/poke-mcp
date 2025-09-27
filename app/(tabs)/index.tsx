import { Text, View, styled } from '@tamagui/core';
import { ScrollView } from '@tamagui/scroll-view';
import { Link } from 'expo-router';
import { StatusBar, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Styled components for PrizePicks theme
const Container = styled(View, {
  flex: 1,
  backgroundColor: '#000000',
})

const Header = styled(View, {
  paddingHorizontal: 16,
  paddingTop: 50,
  paddingBottom: 16,
  backgroundColor: '#000000',
})

const TopBar = styled(View, {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,
})

const Balance = styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
})

const BalanceText = styled(Text, {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: 'bold',
})

const AddFundsButton = styled(TouchableOpacity, {
  width: 24,
  height: 24,
  borderRadius: 12,
  backgroundColor: '#00D4AA',
  justifyContent: 'center',
  alignItems: 'center',
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
            <View />
            <Logo>
              <LogoP>P</LogoP>RIZEPICKS
            </Logo>
            <Balance>
              <BalanceText>$0.00</BalanceText>
              <AddFundsButton>
                <Text color="#FFFFFF" fontSize={16}>+</Text>
              </AddFundsButton>
            </Balance>
          </TopBar>
        </Header>

        {/* Quick stats section */}
        <View paddingHorizontal={16} marginBottom={20}>
          <View flexDirection="row" gap={12}>
            <View flex={1} backgroundColor="#1A1A1A" borderRadius={12} padding={16} alignItems="center" borderWidth={1} borderColor="#333333">
              <Text fontSize={20} fontWeight="bold" color="#00D4AA" marginBottom={4}>5</Text>
              <Text fontSize={12} color="#CCCCCC" textAlign="center">Games Today</Text>
            </View>
            <View flex={1} backgroundColor="#1A1A1A" borderRadius={12} padding={16} alignItems="center" borderWidth={1} borderColor="#333333">
              <Text fontSize={20} fontWeight="bold" color="#00D4AA" marginBottom={4}>23</Text>
              <Text fontSize={12} color="#CCCCCC" textAlign="center">Props Available</Text>
            </View>
            <View flex={1} backgroundColor="#1A1A1A" borderRadius={12} padding={16} alignItems="center" borderWidth={1} borderColor="#333333">
              <Text fontSize={20} fontWeight="bold" color="#00D4AA" marginBottom={4}>Live</Text>
              <Text fontSize={12} color="#CCCCCC" textAlign="center">NBA Action</Text>
            </View>
          </View>
        </View>

        {/* Main action buttons */}
        <View paddingHorizontal={16} gap={12} marginBottom={30}>
          <Link href="/picks">
            <Link.Trigger>
              <View backgroundColor="#1A1A1A" borderRadius={12} padding={20} flexDirection="row" alignItems="center" borderWidth={1} borderColor="#333333">
                <Text fontSize={24} color="#00D4AA" marginRight={16}>🏀</Text>
                <View flex={1}>
                  <Text fontSize={18} fontWeight="bold" color="#FFFFFF" marginBottom={4}>NBA Picks</Text>
                  <Text fontSize={14} color="#CCCCCC">Make your picks</Text>
                </View>
              </View>
            </Link.Trigger>
          </Link>

          <Link href="/chat">
            <Link.Trigger>
              <View backgroundColor="#1A1A1A" borderRadius={12} padding={20} flexDirection="row" alignItems="center" borderWidth={1} borderColor="#333333">
                <Text fontSize={24} color="#00D4AA" marginRight={16}>💬</Text>
                <View flex={1}>
                  <Text fontSize={18} fontWeight="bold" color="#FFFFFF" marginBottom={4}>Community</Text>
                  <Text fontSize={14} color="#CCCCCC">Join the chat</Text>
                </View>
              </View>
            </Link.Trigger>
          </Link>
        </View>

        {/* Stats section */}
        <View paddingHorizontal={16} paddingBottom={40}>
          <Text fontSize={20} fontWeight="bold" color="#FFFFFF" marginBottom={16}>Your Stats</Text>
          <View flexDirection="row" gap={12}>
            <View flex={1} backgroundColor="#1A1A1A" borderRadius={12} padding={16} alignItems="center" borderWidth={1} borderColor="#333333">
              <Text fontSize={24} fontWeight="bold" color="#00D4AA" marginBottom={4}>12</Text>
              <Text fontSize={12} color="#CCCCCC" textAlign="center">Picks Today</Text>
            </View>
            <View flex={1} backgroundColor="#1A1A1A" borderRadius={12} padding={16} alignItems="center" borderWidth={1} borderColor="#333333">
              <Text fontSize={24} fontWeight="bold" color="#00D4AA" marginBottom={4}>8</Text>
              <Text fontSize={12} color="#CCCCCC" textAlign="center">Wins</Text>
            </View>
            <View flex={1} backgroundColor="#1A1A1A" borderRadius={12} padding={16} alignItems="center" borderWidth={1} borderColor="#333333">
              <Text fontSize={24} fontWeight="bold" color="#00D4AA" marginBottom={4}>66%</Text>
              <Text fontSize={12} color="#CCCCCC" textAlign="center">Win Rate</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
