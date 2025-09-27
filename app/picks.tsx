import { Text, View, styled } from '@tamagui/core';
import { ScrollView } from '@tamagui/scroll-view';
import React, { useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// API base URL
const API_BASE = "http://10.90.204.59:3001";

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

const SportsTabs = styled(View, {
  flexDirection: 'row',
  paddingHorizontal: 20,
  gap: 12,
  marginBottom: 20,
})

const SportTab = styled(View, {
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 20,
  backgroundColor: '#1A1A1A',
  borderWidth: 1,
  borderColor: '#333333',
})

const ActiveSportTab = styled(View, {
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 20,
  backgroundColor: '#8B5CF6',
})

const SportTabText = styled(Text, {
  fontSize: 14,
  fontWeight: '600',
  color: '#CCCCCC',
})

const ActiveSportTabText = styled(Text, {
  fontSize: 14,
  fontWeight: '600',
  color: '#FFFFFF',
})

const PropsSection = styled(View, {
  flex: 1,
  paddingHorizontal: 20,
})

const PropCard = styled(View, {
  backgroundColor: '#1A1A1A',
  borderRadius: 8,
  padding: 12,
  marginBottom: 8,
  flexDirection: 'row',
  alignItems: 'center',
})

const JerseyIcon = styled(View, {
  width: 32,
  height: 32,
  borderRadius: 16,
  marginRight: 10,
  justifyContent: 'center',
  alignItems: 'center',
})

const JerseyText = styled(Text, {
  color: '#FFFFFF',
  fontSize: 12,
  fontWeight: 'bold',
})

const PlayerInfo = styled(View, {
  flex: 1,
})

const PlayerName = styled(Text, {
  fontSize: 14,
  fontWeight: '600',
  color: '#FFFFFF',
  marginBottom: 2,
})

const GameInfo = styled(Text, {
  fontSize: 11,
  color: '#00D4AA',
  marginBottom: 2,
  fontWeight: '500',
})

const StatInfo = styled(Text, {
  fontSize: 12,
  color: '#CCCCCC',
})

const ActionButtons = styled(View, {
  flexDirection: 'row',
  gap: 6,
})

const OverButton = styled(TouchableOpacity, {
  backgroundColor: '#333333',
  borderRadius: 8,
  paddingVertical: 8,
  paddingHorizontal: 12,
  minWidth: 80,
  alignItems: 'center',
  justifyContent: 'center',
  activeOpacity: 0.7,
})

const UnderButton = styled(TouchableOpacity, {
  backgroundColor: '#333333',
  borderRadius: 8,
  paddingVertical: 8,
  paddingHorizontal: 12,
  minWidth: 80,
  alignItems: 'center',
  justifyContent: 'center',
  activeOpacity: 0.7,
})

const SelectedButton = styled(TouchableOpacity, {
  backgroundColor: '#8B5CF6',
  borderRadius: 8,
  paddingVertical: 8,
  paddingHorizontal: 12,
  minWidth: 80,
  alignItems: 'center',
  justifyContent: 'center',
  activeOpacity: 0.7,
})

const ButtonText = styled(Text, {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: 'bold',
})

const SlipSection = styled(View, {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#1A1A1A',
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  padding: 16,
  borderWidth: 1,
  borderColor: '#333333',
  maxHeight: 350,
})

const SlipHeader = styled(View, {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 12,
})

const SlipTitle = styled(Text, {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#FFFFFF',
})

const SlipCount = styled(Text, {
  fontSize: 14,
  color: '#00D4AA',
  fontWeight: 'bold',
})

const PayoutSection = styled(View, {
  backgroundColor: '#0A0A0A',
  borderRadius: 8,
  padding: 12,
  marginBottom: 12,
})

const PayoutTitle = styled(Text, {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#FFFFFF',
  marginBottom: 6,
})

const PayoutRow = styled(View, {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 4,
})

const PayoutLabel = styled(Text, {
  fontSize: 12,
  color: '#CCCCCC',
})

const PayoutAmount = styled(Text, {
  fontSize: 14,
  color: '#00D4AA',
  fontWeight: 'bold',
})

const SlipItem = styled(View, {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 8,
  borderBottomWidth: 1,
  borderBottomColor: '#333333',
})

const SlipItemText = styled(Text, {
  flex: 1,
  fontSize: 12,
  color: '#FFFFFF',
})

const CheckIcon = styled(Text, {
  fontSize: 14,
  color: '#00D4AA',
  marginLeft: 6,
})

const SubmitButton = styled(TouchableOpacity, {
  backgroundColor: '#8B5CF6',
  borderRadius: 12,
  paddingVertical: 16,
  marginTop: 16,
  alignItems: 'center',
  justifyContent: 'center',
})

const SubmitButtonText = styled(Text, {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: 'bold',
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

export default function PicksScreen() {
  const [props, setProps] = useState<any[]>([]);
  const [slip, setSlip] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();

  // Fetch props from API
  useEffect(() => {
    fetch(`${API_BASE}/api/props`)
      .then((res) => res.json())
      .then(setProps)
      .catch((err) => console.error("Error fetching props:", err))
      .finally(() => setLoading(false));
  }, []);

  const addToSlip = (pick: any, choice: "Over" | "Under") => {
    console.log("Adding to slip:", pick, choice);
    const slipItem = { 
      ...pick, 
      choice, 
      slipId: Date.now() + Math.random() // Create unique ID for slip item
    };
    setSlip([...slip, slipItem]);
    console.log("Slip updated:", [...slip, slipItem]);
  };

  const removeFromSlip = (slipId: number) => {
    setSlip(slip.filter((p) => p.slipId !== slipId));
  };

  const submitSlip = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/picks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ picks: slip }),
      });
      const result = await response.json();
      alert(result.message);
    setSlip([]); // clear slip
    } catch (error) {
      console.error("Error submitting picks:", error);
      alert("Failed to submit picks. Please try again.");
    }
  };

  if (loading) {
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
          
          <SportsTabs>
            <ActiveSportTab>
              <ActiveSportTabText>NBA</ActiveSportTabText>
            </ActiveSportTab>
            <SportTab>
              <SportTabText>NFL</SportTabText>
            </SportTab>
            <SportTab>
              <SportTabText>MLB</SportTabText>
            </SportTab>
            <SportTab>
              <SportTabText>NHL</SportTabText>
            </SportTab>
          </SportsTabs>
        </Header>
        <LoadingCard>
          <Text fontSize={24} color="#8B5CF6">🏀</Text>
          <LoadingText>Loading props...</LoadingText>
        </LoadingCard>
      </Container>
    );
  }

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
        
        <SportsTabs>
          <ActiveSportTab>
            <ActiveSportTabText>NBA</ActiveSportTabText>
          </ActiveSportTab>
          <SportTab>
            <SportTabText>NFL</SportTabText>
          </SportTab>
          <SportTab>
            <SportTabText>MLB</SportTabText>
          </SportTab>
          <SportTab>
            <SportTabText>NHL</SportTabText>
          </SportTab>
        </SportsTabs>
      </Header>
      
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <PropsSection paddingBottom={slip.length > 0 ? 200 : 20}>
      <FlatList
            data={props}
        keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const isOverSelected = slip.some(pick => pick.id === item.id && pick.choice === "Over");
              const isUnderSelected = slip.some(pick => pick.id === item.id && pick.choice === "Under");
              
              return (
                <PropCard>
                  <JerseyIcon backgroundColor={item.team === 'HOU' ? '#CE1141' : '#552583'}>
                    <JerseyText>{item.player.split(' ').map(n => n[0]).join('')}</JerseyText>
                  </JerseyIcon>
                  <PlayerInfo>
                    <PlayerName>{item.player}</PlayerName>
                    <GameInfo>{item.game}</GameInfo>
                    <StatInfo>{item.stat}</StatInfo>
                  </PlayerInfo>
                  <ActionButtons>
                    {isOverSelected ? (
                      <TouchableOpacity 
                        style={{
                          backgroundColor: '#8B5CF6',
                          borderRadius: 6,
                          paddingVertical: 6,
                          paddingHorizontal: 10,
                          minWidth: 70,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        activeOpacity={0.7}
                        onPress={() => removeFromSlip(slip.find(p => p.id === item.id && p.choice === "Over")?.slipId)}
                      >
                        <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '600' }}>OVER {item.line}</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity 
                        style={{
                          backgroundColor: '#333333',
                          borderRadius: 6,
                          paddingVertical: 6,
                          paddingHorizontal: 10,
                          minWidth: 70,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        activeOpacity={0.7}
                        onPress={() => addToSlip(item, "Over")}
                      >
                        <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '600' }}>OVER {item.line}</Text>
                      </TouchableOpacity>
                    )}
                    {isUnderSelected ? (
                      <TouchableOpacity 
                        style={{
                          backgroundColor: '#8B5CF6',
                          borderRadius: 6,
                          paddingVertical: 6,
                          paddingHorizontal: 10,
                          minWidth: 70,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        activeOpacity={0.7}
                        onPress={() => removeFromSlip(slip.find(p => p.id === item.id && p.choice === "Under")?.slipId)}
                      >
                        <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '600' }}>UNDER {item.line}</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity 
                        style={{
                          backgroundColor: '#333333',
                          borderRadius: 6,
                          paddingVertical: 6,
                          paddingHorizontal: 10,
                          minWidth: 70,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        activeOpacity={0.7}
                        onPress={() => addToSlip(item, "Under")}
                      >
                        <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '600' }}>UNDER {item.line}</Text>
                      </TouchableOpacity>
                    )}
                  </ActionButtons>
                </PropCard>
              );
            }}
            scrollEnabled={false}
      />
        </PropsSection>
      </ScrollView>

      {slip.length > 0 && (
        <SlipSection paddingBottom={insets.bottom + 20}>
          <SlipHeader>
            <SlipTitle>{slip.length} Picks to pay $50</SlipTitle>
            <SlipCount>+$50.00</SlipCount>
          </SlipHeader>
          
          <PayoutSection>
            <PayoutTitle>Two Wins for Win</PayoutTitle>
            <PayoutRow>
              <PayoutLabel>2 picks</PayoutLabel>
              <PayoutAmount>Power Play</PayoutAmount>
            </PayoutRow>
            <PayoutRow>
              <PayoutLabel>Total Payout</PayoutLabel>
              <PayoutAmount>$10.00</PayoutAmount>
            </PayoutRow>
          </PayoutSection>
          
          <ScrollView showsVerticalScrollIndicator={false} maxHeight={120}>
          {slip.map((pick) => (
              <SlipItem key={pick.slipId}>
                <SlipItemText>
                  {pick.player} {pick.choice} {pick.line}
                </SlipItemText>
                <CheckIcon>✓</CheckIcon>
              </SlipItem>
            ))}
          </ScrollView>
          
          <TouchableOpacity 
            style={{
              backgroundColor: '#8B5CF6',
              borderRadius: 12,
              paddingVertical: 16,
              marginTop: 16,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            activeOpacity={0.7}
            onPress={submitSlip}
          >
            <SubmitButtonText>PLACE ENTRY</SubmitButtonText>
          </TouchableOpacity>
        </SlipSection>
      )}
    </Container>
  );
}
