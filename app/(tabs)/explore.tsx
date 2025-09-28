import { Text, View, styled } from '@tamagui/core';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, Linking, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { resolveWebChatUrl } from '@/lib/resolveWebChatUrl';

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

const ChatContainer = styled(View, {
  flex: 1,
  backgroundColor: '#0A0A0A',
  marginHorizontal: 20,
  borderRadius: 16,
  padding: 16,
  borderWidth: 1,
  borderColor: '#333333',
})

const ChatHeader = styled(Text, {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#FFFFFF',
  marginBottom: 16,
  textAlign: 'center',
})

const MessageContainer = styled(View, {
  backgroundColor: '#1A1A1A',
  marginBottom: 8,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#333333',
  flexDirection: 'row',
  alignItems: 'center',
  padding: 12,
})

const MessageAvatar = styled(View, {
  width: 32,
  height: 32,
  borderRadius: 16,
  backgroundColor: '#00D4AA',
  marginRight: 12,
  justifyContent: 'center',
  alignItems: 'center',
})

const AvatarText = styled(Text, {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: 'bold',
})

const MessageContent = styled(View, {
  flex: 1,
})

const UserName = styled(Text, {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#FFFFFF',
  marginBottom: 4,
})

const MessageText = styled(Text, {
  fontSize: 14,
  color: '#CCCCCC',
})

const ChatInput = styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 12,
  paddingTop: 12,
  borderTopWidth: 1,
  borderTopColor: '#333333',
})

const InputField = styled(TextInput, {
  flex: 1,
  backgroundColor: '#1A1A1A',
  borderRadius: 20,
  paddingHorizontal: 16,
  paddingVertical: 10,
  color: '#FFFFFF',
  fontSize: 14,
  borderWidth: 1,
  borderColor: '#333333',
})

const SendButton = styled(TouchableOpacity, {
  backgroundColor: '#8B5CF6',
  borderRadius: 20,
  paddingHorizontal: 16,
  paddingVertical: 10,
  marginLeft: 8,
})

const SendText = styled(Text, {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: 'bold',
})

export default function FriendsScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('leaderboard'); // 'leaderboard' or 'chat'
  const [messages, setMessages] = useState([
    { id: 1, user: "Alex Johnson", text: "Anyone betting on the Lakers game tonight?" },
    { id: 2, user: "Sarah Chen", text: "I'm taking the under on LeBron's points" },
    { id: 3, user: "Mike Rodriguez", text: "Lakers -7.5 looking good to me" },
  ]);
  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: "You",
        text: inputText.trim(),
      };
      setMessages([...messages, newMessage]);
      setInputText("");
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
          <HeaderTitle>Friends</HeaderTitle>
          <HeaderSubtitle>Connect with your betting community</HeaderSubtitle>
        </View>
      </Header>

      <View style={{ flex: 1 }}>
        {/* Tab Selector */}
        <View style={{ 
          flexDirection: 'row', 
          marginHorizontal: 20, 
          marginBottom: 16,
          backgroundColor: '#1A1A1A',
          borderRadius: 12,
          padding: 4,
          borderWidth: 1,
          borderColor: '#333333'
        }}>
          <TouchableOpacity
            style={{
              flex: 1,
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 8,
              backgroundColor: activeTab === 'leaderboard' ? '#8B5CF6' : 'transparent',
              alignItems: 'center'
            }}
            onPress={() => setActiveTab('leaderboard')}
          >
            <Text style={{ 
              fontSize: 16, 
              fontWeight: 'bold', 
              color: activeTab === 'leaderboard' ? '#FFFFFF' : '#CCCCCC' 
            }}>
              Leaderboard
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 8,
              backgroundColor: activeTab === 'chat' ? '#8B5CF6' : 'transparent',
              alignItems: 'center'
            }}
            onPress={() => setActiveTab('chat')}
          >
            <Text style={{ 
              fontSize: 16, 
              fontWeight: 'bold', 
              color: activeTab === 'chat' ? '#FFFFFF' : '#CCCCCC' 
            }}>
              Chat
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content Area */}
        <View style={{ flex: 1, marginHorizontal: 20 }}>
          {activeTab === 'leaderboard' ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Your stats - Compact */}
              <View style={{ 
                marginBottom: 16, 
                backgroundColor: '#1A1A1A', 
                borderRadius: 12, 
                padding: 16,
                borderWidth: 1,
                borderColor: '#333333'
              }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 12, textAlign: 'center' }}>
                  Your Performance
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#00D4AA', marginBottom: 4 }}>12</Text>
                    <Text style={{ fontSize: 12, color: '#CCCCCC', fontWeight: '500' }}>Picks</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#00D4AA', marginBottom: 4 }}>8</Text>
                    <Text style={{ fontSize: 12, color: '#CCCCCC', fontWeight: '500' }}>Wins</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#00D4AA', marginBottom: 4 }}>66%</Text>
                    <Text style={{ fontSize: 12, color: '#CCCCCC', fontWeight: '500' }}>Win Rate</Text>
                  </View>
                </View>
              </View>

              {/* Friends Leaderboard */}
              <View style={{ 
                backgroundColor: '#1A1A1A', 
                borderRadius: 16, 
                padding: 16,
                borderWidth: 1,
                borderColor: '#333333',
                marginBottom: 20
              }}>
                <SectionTitle>Your Friends</SectionTitle>
                {[
                  { rank: 1, name: "Alex Johnson", picks: 45, wins: 32, winRate: "71%", status: "Online" },
                  { rank: 2, name: "Sarah Chen", picks: 38, wins: 26, winRate: "68%", status: "Online" },
                  { rank: 3, name: "Mike Rodriguez", picks: 42, wins: 28, winRate: "67%", status: "Offline" },
                  { rank: 4, name: "You", picks: 12, wins: 8, winRate: "66%", status: "Online" },
                  { rank: 5, name: "Emma Wilson", picks: 35, wins: 22, winRate: "63%", status: "Online" },
                  { rank: 6, name: "David Kim", picks: 28, wins: 18, winRate: "64%", status: "Offline" },
                  { rank: 7, name: "Lisa Park", picks: 31, wins: 20, winRate: "65%", status: "Online" },
                  { rank: 8, name: "Chris Brown", picks: 22, wins: 14, winRate: "64%", status: "Online" },
                ].map((friend) => (
                  <PlayerCard key={friend.rank}>
                    <PlayerRow>
                      <RankContainer>
                        <View 
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: 6,
                            backgroundColor: friend.status === "Online" ? "#00D4AA" : "#666666",
                            marginRight: 8,
                          }}
                        />
                      </RankContainer>
                      <PlayerInfo>
                        <PlayerName>{friend.name}</PlayerName>
                        <PlayerStats>
                          {friend.picks} picks • {friend.wins} wins • {friend.winRate} win rate
                        </PlayerStats>
                      </PlayerInfo>
                      <TrophyContainer>
                        <Text style={{ fontSize: 12, color: friend.status === "Online" ? "#00D4AA" : "#666666" }}>
                          {friend.status}
                        </Text>
                      </TrophyContainer>
                    </PlayerRow>
                  </PlayerCard>
                ))}
              </View>
            </ScrollView>
          ) : (
            /* Chat Tab */
            <View style={{ flex: 1 }}>
              <ChatHeader>Group Chat</ChatHeader>
              <View style={{ flex: 1, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#333333' }}>
                <WebView
                  source={{ uri: resolveWebChatUrl() }}
                  originWhitelist={["*"]}
                  startInLoadingState
                  renderLoading={() => (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000' }}>
                      <ActivityIndicator size="small" color="#00D4AA" />
                      <Text style={{ marginTop: 8, color: '#CCCCCC' }}>Loading chat…</Text>
                    </View>
                  )}
                  onShouldStartLoadWithRequest={(req) => {
                    try {
                      const chatUrl = resolveWebChatUrl();
                      const chatOrigin = new URL(chatUrl).origin;
                      const reqOrigin = new URL(req.url).origin;
                      if (req.navigationType === 'click' && reqOrigin !== chatOrigin) {
                        Linking.openURL(req.url);
                        return false;
                      }
                    } catch {}
                    return true;
                  }}
                  allowsInlineMediaPlayback
                  style={{ backgroundColor: '#000000' }}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </Container>
  );
}

