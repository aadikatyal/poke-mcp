import { Text, View, styled } from '@tamagui/core';
import { ScrollView } from '@tamagui/scroll-view';
import React, { useState } from "react";
import { FlatList, Image, TextInput, TouchableOpacity } from "react-native";
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

const MainCard = styled(View, {
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
  marginBottom: 16,
})

const InputContainer = styled(View, {
  backgroundColor: '#0A0A0A',
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#333333',
  marginBottom: 16,
})

const StyledTextInput = styled(TextInput, {
  backgroundColor: 'transparent',
  borderRadius: 12,
  paddingHorizontal: 16,
  paddingVertical: 16,
  color: '#FFFFFF',
  fontSize: 16,
  minHeight: 120,
  textAlignVertical: 'top',
})

const SubmitButton = styled(TouchableOpacity, {
  backgroundColor: '#8B5CF6',
  borderRadius: 12,
  paddingVertical: 16,
  paddingHorizontal: 24,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
})

const SubmitButtonText = styled(Text, {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: '700',
  textAlign: 'center',
})

const ResultsSection = styled(View, {
  paddingHorizontal: 20,
  flex: 1,
})

const SectionHeader = styled(View, {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,
})

const SectionTitle = styled(Text, {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#FFFFFF',
})

const BetCard = styled(View, {
  backgroundColor: '#1A1A1A',
  borderRadius: 16,
  padding: 20,
  marginBottom: 12,
  borderWidth: 1,
  borderColor: '#333333',
})

const BetHeader = styled(View, {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 12,
})

const BetTitle = styled(Text, {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#FFFFFF',
  flex: 1,
})

const BetOdds = styled(Text, {
  fontSize: 16,
  color: '#00D4AA',
  fontWeight: 'bold',
})

const BetDescription = styled(Text, {
  fontSize: 14,
  color: '#CCCCCC',
  lineHeight: 20,
  marginBottom: 12,
})

const BetFooter = styled(View, {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const ConfidenceBadge = styled(View, {
  backgroundColor: '#00D4AA',
  borderRadius: 20,
  paddingHorizontal: 12,
  paddingVertical: 6,
})

const ConfidenceText = styled(Text, {
  color: '#000000',
  fontSize: 12,
  fontWeight: 'bold',
})

const AddToSlipButton = styled(TouchableOpacity, {
  backgroundColor: '#8B5CF6',
  borderRadius: 8,
  paddingHorizontal: 16,
  paddingVertical: 8,
})

const AddToSlipText = styled(Text, {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '600',
})

const LoadingCard = styled(View, {
  backgroundColor: '#1A1A1A',
  borderRadius: 16,
  padding: 40,
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#333333',
})

const LoadingText = styled(Text, {
  fontSize: 16,
  color: '#CCCCCC',
  textAlign: 'center',
  marginTop: 12,
})

const ErrorCard = styled(View, {
  backgroundColor: '#1A1A1A',
  borderRadius: 16,
  padding: 24,
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#FF6B6B',
})

const ErrorText = styled(Text, {
  fontSize: 16,
  color: '#FF6B6B',
  textAlign: 'center',
})

export default function TextToBetScreen() {
  const [inputText, setInputText] = useState("");
  const [bets, setBets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const insets = useSafeAreaInsets();

  // Mock Cedar OS integration
  const processTextToBet = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setError("");
    
    try {
      // Simulate Cedar OS API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock betting suggestions based on input
      const mockBets = [
        {
          id: 1,
          title: "LeBron James Points",
          description: "Over 25.5 points based on recent form",
          odds: "+110",
          confidence: "High"
        },
        {
          id: 2,
          title: "Lakers Team Total",
          description: "Over 115.5 points - strong offensive matchup",
          odds: "-105",
          confidence: "Medium"
        },
        {
          id: 3,
          title: "Game Total",
          description: "Over 220.5 points - high-scoring game expected",
          odds: "+100",
          confidence: "High"
        }
      ];
      
      setBets(mockBets);
    } catch (err) {
      setError("Failed to process your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
                  source={require('../assets/images/prizepicks-logo.png')}
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
          <HeaderTitle>Text to Bet</HeaderTitle>
          <HeaderSubtitle>Describe your betting idea and get AI-powered suggestions</HeaderSubtitle>
        </View>
      </Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <MainCard>
          <CardTitle>What do you want to bet on?</CardTitle>
          <InputContainer>
            <StyledTextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="e.g., 'LeBron will score over 25 points tonight' or 'Lakers will win by more than 5'"
              multiline
              placeholderTextColor="#666666"
            />
          </InputContainer>
          <SubmitButton onPress={processTextToBet} disabled={!inputText.trim() || loading}>
            <SubmitButtonText>
              {loading ? "Processing..." : "Submit"}
            </SubmitButtonText>
          </SubmitButton>
        </MainCard>

        <ResultsSection>
          <SectionHeader>
            <SectionTitle>AI Betting Suggestions</SectionTitle>
          </SectionHeader>
          
          {loading && (
            <LoadingCard>
              <Text fontSize={24} color="#8B5CF6">🤖</Text>
              <LoadingText>Analyzing your request with Cedar OS...</LoadingText>
            </LoadingCard>
          )}
          
          {error && (
            <ErrorCard>
              <Text fontSize={24} color="#FF6B6B">⚠️</Text>
              <ErrorText>{error}</ErrorText>
            </ErrorCard>
          )}
          
          {bets.length > 0 && (
            <FlatList
              data={bets}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <BetCard>
                  <BetHeader>
                    <BetTitle>{item.title}</BetTitle>
                    <BetOdds>{item.odds}</BetOdds>
                  </BetHeader>
                  <BetDescription>{item.description}</BetDescription>
                  <BetFooter>
                    <ConfidenceBadge>
                      <ConfidenceText>{item.confidence}</ConfidenceText>
                    </ConfidenceBadge>
                    <AddToSlipButton>
                      <AddToSlipText>Add to Slip</AddToSlipText>
                    </AddToSlipButton>
                  </BetFooter>
                </BetCard>
              )}
              scrollEnabled={false}
            />
          )}
          
          {!loading && !error && bets.length === 0 && (
            <View backgroundColor="#1A1A1A" borderRadius={16} padding={40} alignItems="center" borderWidth={1} borderColor="#333333">
              <Text fontSize={24} color="#8B5CF6" marginBottom={12}>💡</Text>
              <Text fontSize={16} color="#CCCCCC" textAlign="center">
                Enter your betting idea above to get AI-powered suggestions
              </Text>
            </View>
          )}
        </ResultsSection>
      </ScrollView>
    </Container>
  );
}
