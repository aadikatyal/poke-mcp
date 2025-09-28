import { Text, View, styled } from '@tamagui/core';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
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

const FeedCard = styled(View, {
  marginHorizontal: 20,
  marginBottom: 16,
  backgroundColor: '#1A1A1A',
  borderRadius: 16,
  padding: 20,
  borderWidth: 1,
  borderColor: '#333333',
})

const PostHeader = styled(View, {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 12,
})

const Avatar = styled(View, {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: '#8B5CF6',
  marginRight: 12,
  justifyContent: 'center',
  alignItems: 'center',
})

const AvatarText = styled(Text, {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: 'bold',
})

const UserInfo = styled(View, {
  flex: 1,
})

const Username = styled(Text, {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#FFFFFF',
  marginBottom: 2,
})

const PostTime = styled(Text, {
  fontSize: 12,
  color: '#CCCCCC',
})

const PostContent = styled(Text, {
  fontSize: 16,
  color: '#FFFFFF',
  lineHeight: 24,
  marginBottom: 12,
})

const BetCard = styled(View, {
  backgroundColor: '#0A0A0A',
  borderRadius: 12,
  padding: 16,
  borderWidth: 1,
  borderColor: '#333333',
})

const BetTitle = styled(Text, {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#FFFFFF',
  marginBottom: 8,
})

const BetDetails = styled(Text, {
  fontSize: 14,
  color: '#CCCCCC',
  marginBottom: 8,
})

const BetOdds = styled(Text, {
  fontSize: 16,
  color: '#00D4AA',
  fontWeight: 'bold',
})

const PostActions = styled(View, {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 12,
  paddingTop: 12,
  borderTopWidth: 1,
  borderTopColor: '#333333',
})

const ActionButton = styled(TouchableOpacity, {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 8,
  paddingHorizontal: 12,
})

const ActionText = styled(Text, {
  fontSize: 14,
  color: '#CCCCCC',
  marginLeft: 6,
})

export default function FeedScreen() {
  const insets = useSafeAreaInsets();

  const feedPosts = [
    {
      id: 1,
      username: "Alex Johnson",
      time: "2h ago",
      content: "Just hit a 5-leg parlay! 🔥 Lakers over 110.5, LeBron over 25.5, AD over 20.5, Warriors under 105, and Steph over 3.5 threes. Feeling confident about this one!",
      bet: {
        title: "Lakers vs Warriors Parlay",
        details: "5-leg parlay • $50 bet",
        odds: "+1200"
      },
      likes: 23,
      comments: 8,
      shares: 3
    },
    {
      id: 2,
      username: "Sarah Chen",
      time: "4h ago",
      content: "Anyone else think the under is the play tonight? Both teams have been struggling offensively lately.",
      bet: {
        title: "Celtics vs Heat Under 215.5",
        details: "Single bet • $25 bet",
        odds: "-110"
      },
      likes: 15,
      comments: 12,
      shares: 2
    },
    {
      id: 3,
      username: "Mike Rodriguez",
      time: "6h ago",
      content: "Big win streak continues! 8 wins in a row now. Here's my pick for tonight's game.",
      bet: {
        title: "Nuggets -7.5 vs Blazers",
        details: "Spread bet • $100 bet",
        odds: "-105"
      },
      likes: 31,
      comments: 19,
      shares: 7
    }
  ];

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
      </Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        {feedPosts.map((post) => (
          <FeedCard key={post.id}>
            <PostHeader>
              <Avatar>
                <AvatarText>{post.username.charAt(0)}</AvatarText>
              </Avatar>
              <UserInfo>
                <Username>{post.username}</Username>
                <PostTime>{post.time}</PostTime>
              </UserInfo>
            </PostHeader>
            
            <PostContent>{post.content}</PostContent>
            
            <BetCard>
              <BetTitle>{post.bet.title}</BetTitle>
              <BetDetails>{post.bet.details}</BetDetails>
              <BetOdds>{post.bet.odds}</BetOdds>
            </BetCard>
            
            <PostActions>
              <ActionButton>
                <Text style={{ fontSize: 16 }}>❤️</Text>
                <ActionText>{post.likes}</ActionText>
              </ActionButton>
              <ActionButton>
                <Text style={{ fontSize: 16 }}>💬</Text>
                <ActionText>{post.comments}</ActionText>
              </ActionButton>
              <ActionButton>
                <Text style={{ fontSize: 16 }}>📤</Text>
                <ActionText>{post.shares}</ActionText>
              </ActionButton>
            </PostActions>
          </FeedCard>
        ))}
      </ScrollView>
    </Container>
  );
}
