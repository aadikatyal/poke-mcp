import { Text, View, styled } from '@tamagui/core';
import React, { useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Image, Linking, ScrollView, TextInput, TouchableOpacity } from 'react-native';
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
  textAlign: 'left',
})

const LogoP = styled(Text, {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#8000FF',
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

// Feed card + Leaderboard UI (PrizePicks-inspired)
const FeedCard = styled(View, {
  backgroundColor: '#1A1A1A',
  borderRadius: 16,
  padding: 16,
  borderWidth: 1,
  borderColor: '#333333',
  marginBottom: 16,
})

const UserHeader = styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 12,
})

const UserMeta = styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
})

const Avatar = styled(View, {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: '#8000FF',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 10,
})

const AvatarInitial = styled(Text, {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: '800',
})

const Username = styled(Text, {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: '700',
})

const Dot = styled(Text, {
  color: '#666666',
  marginHorizontal: 6,
})

const TimeText = styled(Text, {
  color: '#AAAAAA',
})

const HeaderActions = styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
})


const EarningsPill = styled(View, {
  backgroundColor: 'rgba(0,212,170,0.12)',
  borderColor: '#00D4AA',
  borderWidth: 1,
  borderRadius: 16,
  paddingVertical: 6,
  paddingHorizontal: 10,
  marginLeft: 8,
})

const EarningsText = styled(Text, {
  color: '#00D4AA',
  fontWeight: '800',
})

const CardHeaderRow = styled(View, {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 10,
})

const CardTitleText = styled(Text, {
  color: '#FFFFFF',
  fontSize: 18,
  fontWeight: '800',
})

const MultiplierPill = styled(View, {
  backgroundColor: '#111111',
  borderRadius: 12,
  paddingVertical: 6,
  paddingHorizontal: 10,
  borderWidth: 1,
  borderColor: '#333333',
})

const MultiplierText = styled(Text, {
  color: '#00D4AA',
  fontWeight: '800',
})

const FirstGameText = styled(Text, {
  color: '#CCCCCC',
})

const TimeHighlight = styled(Text, {
  color: '#FFD159',
  fontWeight: '700',
})

const PickRow = styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingVertical: 10,
})

const LeftWrap = styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
})

const Jersey = styled(View, {
  width: 44,
  height: 44,
  borderRadius: 22,
  backgroundColor: '#0F0F0F',
  borderWidth: 1,
  borderColor: '#333333',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 12,
})

const JerseyNum = styled(Text, {
  color: '#888888',
  fontWeight: '800',
})

const StatusBadge = styled(View, {
  width: 18,
  height: 18,
  borderRadius: 9,
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: -8,
})

const StatusGlyph = styled(Text, {
  color: '#000000',
  fontWeight: '900',
  fontSize: 12,
})

const PickName = styled(Text, {
  color: '#FFFFFF',
  fontWeight: '700',
  fontSize: 16,
})

const RightWrap = styled(View, {
  alignItems: 'flex-end',
})

const ArrowAndLine = styled(Text, {
  color: '#FFFFFF',
  fontWeight: '800',
})

const PickStatLabel = styled(Text, {
  color: '#A3A3A3',
  fontSize: 12,
})

const Divider = styled(View, {
  height: 1,
  backgroundColor: '#262626',
  marginVertical: 6,
})

const FooterRow = styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: 12,
})

const SmallButton = styled(TouchableOpacity, {
  backgroundColor: '#232323',
  borderRadius: 16,
  paddingVertical: 10,
  paddingHorizontal: 14,
  borderWidth: 1,
  borderColor: '#333333',
})

const SmallText = styled(Text, {
  color: '#CCCCCC',
  fontWeight: '700',
})

const PrimaryCTA = styled(TouchableOpacity, {
  backgroundColor: '#8000FF',
  borderRadius: 24,
  paddingVertical: 12,
  paddingHorizontal: 18,
})

const PrimaryCTAText = styled(Text, {
  color: '#FFFFFF',
  fontWeight: '800',
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

// Polished chat header + toolbar
const ChatHeaderBar = styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 12,
  paddingHorizontal: 4,
})

const BetaBadge = styled(View, {
  backgroundColor: 'rgba(139,92,246,0.18)',
  borderColor: '#8B5CF6',
  borderWidth: 1,
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 12,
})

const BetaText = styled(Text, {
  color: '#C7B8FF',
  fontSize: 12,
  fontWeight: '800',
})

const ChatToolbar = styled(View, {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: 8,
  marginBottom: 8,
})

const ToolBtn = styled(TouchableOpacity, {
  backgroundColor: '#232323',
  borderWidth: 1,
  borderColor: '#333333',
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 14,
})

const ToolText = styled(Text, {
  color: '#CCCCCC',
  fontWeight: '700',
  fontSize: 12,
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
  backgroundColor: '#8000FF',
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
  const webRef = useRef<WebView>(null);
  const [messages, setMessages] = useState([
    { id: 1, user: "Alex Johnson", text: "Anyone betting on the Lakers game tonight?" },
    { id: 2, user: "Sarah Chen", text: "I'm taking the under on LeBron's points" },
    { id: 3, user: "Mike Rodriguez", text: "Lakers -7.5 looking good to me" },
  ]);
  const [inputText, setInputText] = useState("");

  const leaderboardData = useMemo(() => ([
    {
      username: 'Pranav',
      minutesAgo: '5m',
      lineupType: '3-Pick Flex Play',
      multiplier: '5x',
      timeUntil: '10:53:52',
      earnings: 324.75,
      picks: [
        { player: 'Jalen Hurts', stat: 'Pass Yards', direction: 'up', line: '0.5', result: 'hit' },
        { player: 'Patrick Mahomes', stat: 'Pass Yards', direction: 'up', line: '285.5', result: 'miss' },
        { player: 'A\'ja Wilson', stat: 'Fantasy Score', direction: 'down', line: '52.0', result: 'hit' },
      ],
    },
    {
      username: 'Satvik',
      minutesAgo: '12m',
      lineupType: '5-Pick Power Play',
      multiplier: '10x',
      timeUntil: '08:12:04',
      earnings: 512.10,
      picks: [
        { player: 'Josh Allen', stat: 'Pass Yards', direction: 'up', line: '270.5', result: 'hit' },
        { player: 'Tyreek Hill', stat: 'Receiving Yards', direction: 'up', line: '89.5', result: 'hit' },
        { player: 'Christian McCaffrey', stat: 'Rush Yards', direction: 'down', line: '95.5', result: 'miss' },
        { player: 'Nikola Jokic', stat: 'Fantasy Score', direction: 'up', line: '54.5', result: 'pending' },
        { player: 'Luka Doncic', stat: 'Assists', direction: 'up', line: '8.5', result: 'pending' },
      ],
    },
    {
      username: 'Aadi',
      minutesAgo: '20m',
      lineupType: '2-Pick Flex Play',
      multiplier: '3x',
      timeUntil: '06:26:31',
      earnings: 148.00,
      picks: [
        { player: 'Joe Burrow', stat: 'Pass Yards', direction: 'up', line: '260.5', result: 'miss' },
        { player: 'Stefon Diggs', stat: 'Receptions', direction: 'up', line: '6.5', result: 'hit' },
      ],
    },
    {
      username: 'Harish',
      minutesAgo: '28m',
      lineupType: '6-Pick Power Play',
      multiplier: '15x',
      timeUntil: '04:02:55',
      earnings: 289.40,
      picks: [
        { player: 'Lamar Jackson', stat: 'Pass+Rush Yds', direction: 'up', line: '305.5', result: 'hit' },
        { player: 'Anthony Davis', stat: 'Rebounds', direction: 'down', line: '11.5', result: 'miss' },
        { player: 'Ja\'Marr Chase', stat: 'Receiving Yards', direction: 'up', line: '82.5', result: 'pending' },
        { player: 'Connor McDavid', stat: 'Points', direction: 'up', line: '1.5', result: 'hit' },
        { player: 'Kevin Durant', stat: 'Points', direction: 'up', line: '27.5', result: 'pending' },
        { player: 'Sidney Crosby', stat: 'Shots', direction: 'up', line: '2.5', result: 'hit' },
      ],
    },
    {
      username: 'Mukesh',
      minutesAgo: '42m',
      lineupType: '4-Pick Flex Play',
      multiplier: '5x',
      timeUntil: '03:14:09',
      earnings: 742.25,
      picks: [
        { player: 'Aaron Rodgers', stat: 'Fantasy Score', direction: 'up', line: '13.5', result: 'hit' },
        { player: 'Joe Flacco', stat: 'Fantasy Score', direction: 'up', line: '13.0', result: 'hit' },
        { player: 'Bryce Young', stat: 'Fantasy Score', direction: 'up', line: '14.0', result: 'miss' },
        { player: 'Amon-Ra St. Brown', stat: 'Receiving Yards', direction: 'down', line: '78.5', result: 'pending' },
      ],
    },
  ]), []);

  const groupEarnings = useMemo(() =>
    leaderboardData.reduce((sum, u) => sum + (u.earnings || 0), 0),
  [leaderboardData]);

  // Inject styling into the embedded web chat to match brand.
  const injectedChatCSS = `
    :root {
      --bg: #000000; --panel: #0F0F0F; --panel-2: #1A1A1A; --border: #333333;
      --text: #FFFFFF; --muted: #CCCCCC; --muted-2: #A3A3A3; --pp-green: #00D4AA; --pp-purple: #8000FF;
    }
    html, body { background: var(--bg) !important; color: var(--text) !important; }
    body, input, textarea, button { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro', Inter, Roboto, 'Helvetica Neue', Arial, sans-serif !important; }
    a { color: var(--pp-green) !important; }
    input, textarea { background: var(--panel-2) !important; color: var(--text) !important; border: 1px solid var(--border) !important; border-radius: 12px !important; padding: 12px 14px !important; }
    button { background: var(--pp-purple) !important; border-radius: 16px !important; color: #fff !important; font-weight: 800 !important; border: none !important; padding: 10px 14px !important; }
    /* Common chat containers */
    .container, .wrapper, .content, .app, #__next, main { background: var(--bg) !important; }
    /* Message bubbles (best-effort selectors) */
    .message, .msg, [class*="message"], [data-role="message"], .bubble { border-radius: 14px !important; padding: 10px 12px !important; border: 1px solid var(--border) !important; }
    .message.user, .outgoing, .right, [data-side="outgoing"] { background: #131313 !important; }
    .message.bot, .incoming, .left, [data-side="incoming"] { background: var(--panel-2) !important; }
    .system, .meta { color: var(--muted-2) !important; }
    hr { border-top: 1px solid var(--border) !important; }
  `;
  const injectScript = `(() => { try { const s = document.createElement('style'); s.id = 'pp-brand-style'; s.type = 'text/css'; s.appendChild(document.createTextNode(` + JSON.stringify(injectedChatCSS) + `)); document.head.appendChild(s); } catch (e) { console.warn('style inject failed', e); } })();`;

  const openInBrowser = () => {
    try { Linking.openURL(resolveWebChatUrl()); } catch {}
  };
  const refreshWeb = () => webRef.current?.reload();

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: 'You',
        text: inputText.trim(),
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  return (
    <Container>
      {activeTab === 'leaderboard' && (
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
          
          {/* Title removed per spec; header keeps app chrome only */}
        </Header>
      )}

      <View style={{ flex: 1 }}>
        {/* Tab Selector — show ONLY on Leaderboard. When on Chat, no top UI. */}
{activeTab === 'leaderboard' && (
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: 20, marginBottom: 8, gap: 32 }}>
            <TouchableOpacity onPress={() => setActiveTab('leaderboard')} activeOpacity={0.8}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: '800', color: activeTab === 'leaderboard' ? '#FFFFFF' : '#7A7A7A' }}>Leaderboard</Text>
                {activeTab === 'leaderboard' && (
                  <View style={{ height: 6, backgroundColor: '#8000FF', borderRadius: 999, marginTop: 8, width: 120 }} />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('chat')} activeOpacity={0.8}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: '800', color: activeTab === 'chat' ? '#FFFFFF' : '#7A7A7A' }}>Chat</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Content Area */}
        <View style={{ flex: 1, marginHorizontal: activeTab === 'leaderboard' ? 20 : 0 }}>
          {activeTab === 'leaderboard' ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Friends Leaderboard — PrizePicks-style cards */}
              {leaderboardData.map((u, idx) => {
                const initials = u.username.slice(0, 1).toUpperCase();
                const earningStr = `$${u.earnings.toFixed(2)}`;
                return (
                  <FeedCard key={`${u.username}-${idx}`}>
                    {/* User header */}
                    <UserHeader>
                      <UserMeta>
                        <Avatar>
                          <AvatarInitial>{initials}</AvatarInitial>
                        </Avatar>
                        <View>
                          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                            <Username>{u.username}</Username>
                            <Dot> • </Dot>
                            <TimeText>{u.minutesAgo}</TimeText>
                          </View>
                        </View>
                      </UserMeta>
                      <HeaderActions>
<EarningsPill>
                          <EarningsText>{earningStr}</EarningsText>
                        </EarningsPill>
                        <Text style={{ color: '#AAAAAA', fontSize: 20 }}>⋯</Text>
                      </HeaderActions>
                    </UserHeader>

                    {/* Lineup card body */}
                    <View style={{
                      backgroundColor: '#0F0F0F',
                      borderRadius: 14,
                      padding: 14,
                      borderWidth: 1,
                      borderColor: '#2A2A2A',
                    }}>
                      <CardHeaderRow>
                        <CardTitleText>{u.lineupType}</CardTitleText>
                        <MultiplierPill>
                          <MultiplierText>{u.multiplier}</MultiplierText>
                        </MultiplierPill>
                      </CardHeaderRow>
                      <FirstGameText>
                        First game starts in <TimeHighlight>{u.timeUntil}</TimeHighlight>
                      </FirstGameText>

                      <View style={{ marginTop: 10 }}>
                        {u.picks.map((p, i) => {
                          const up = p.direction === 'up';
                          const arrow = up ? '↑' : '↓';
                          const statusBg = p.result === 'hit' ? '#00D4AA' : p.result === 'miss' ? '#FF4D4D' : '#6B7280';
                          const statusGlyph = p.result === 'hit' ? '✓' : p.result === 'miss' ? '✕' : '•';
                          return (
                            <View key={`${u.username}-pick-${i}`}>
                              <PickRow>
                                <LeftWrap>
                                  <Jersey>
                                    <JerseyNum>{i + 1}</JerseyNum>
                                  </Jersey>
                                  <StatusBadge style={{ backgroundColor: statusBg }}>
                                    <StatusGlyph>{statusGlyph}</StatusGlyph>
                                  </StatusBadge>
                                  <View style={{ marginLeft: 8 }}>
                                    <PickName>{p.player}</PickName>
                                  </View>
                                </LeftWrap>
                                <RightWrap>
                                  <ArrowAndLine>{arrow} {p.line}</ArrowAndLine>
                                  <PickStatLabel>{p.stat}</PickStatLabel>
                                </RightWrap>
                              </PickRow>
                              {i < u.picks.length - 1 && <Divider />}
                            </View>
                          );
                        })}
                      </View>

                      {/* Footer actions */}
<FooterRow>
                        <View />
                        <PrimaryCTA activeOpacity={0.9}>
                          <PrimaryCTAText>Copy lineup ⎘</PrimaryCTAText>
                        </PrimaryCTA>
                      </FooterRow>
                    </View>
                  </FeedCard>
                );
              })}

              {/* Group winnings summary */}
              <FeedCard>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ color: '#CCCCCC', marginBottom: 8, fontWeight: '700' }}>Group Winnings</Text>
                  <Text style={{ color: '#00D4AA', fontSize: 28, fontWeight: '900' }}>${groupEarnings.toFixed(2)}</Text>
                </View>
              </FeedCard>
            </ScrollView>
          ) : (
            /* Chat Tab */
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1, borderRadius: 0, overflow: 'hidden', paddingTop: insets.top, paddingBottom: 12, backgroundColor: '#000000' }}>
                <WebView
                  ref={webRef}
                  source={{ uri: resolveWebChatUrl() }}
                  originWhitelist={["*"]}
                  injectedJavaScriptBeforeContentLoaded={injectScript}
                  injectedJavaScript={injectScript}
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
                  onMessage={(event) => {
                    try {
                      const data = JSON.parse(event.nativeEvent.data);
                      if (data && data.type === 'exit_chat') {
                        setActiveTab('leaderboard');
                        return;
                      }
                    } catch (e) {
                      if (event.nativeEvent.data === 'exit_chat') {
                        setActiveTab('leaderboard');
                        return;
                      }
                    }
                  }}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </Container>
  );
}

