import { Button } from '@tamagui/button';
import { Text, View, styled } from '@tamagui/core';
import { Input } from '@tamagui/input';
import React, { useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Simple Tamagui styled components
const Container = styled(View, {
  flex: 1,
  backgroundColor: '#0A0A0A',
})

const HeaderCard = styled(View, {
  marginBottom: 10,
  marginHorizontal: 16,
  marginTop: 10,
  borderRadius: 12,
  backgroundColor: '#1A1A1A',
  borderWidth: 1,
  borderColor: '#333333',
  padding: 16,
})

const Header = styled(Text, {
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center',
  color: '#FFFFFF',
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
  fontSize: 12,
  fontWeight: 'bold',
})

const MessageContent = styled(View, {
  flex: 1,
})

const UserName = styled(Text, {
  fontWeight: 'bold',
  fontSize: 14,
  color: '#FFFFFF',
  marginBottom: 2,
})

const MessageText = styled(Text, {
  fontSize: 16,
  color: '#CCCCCC',
})

const InputCard = styled(View, {
  marginTop: 10,
  marginHorizontal: 16,
  borderRadius: 12,
  backgroundColor: '#1A1A1A',
  borderWidth: 1,
  borderColor: '#333333',
  padding: 16,
})

const InputRow = styled(View, {
  flexDirection: 'row',
  alignItems: 'flex-end',
  gap: 10,
})

const InputContainer = styled(View, {
  flex: 1,
})

const MessageInput = styled(Input, {
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderWidth: 1,
  borderColor: '#333333',
  borderRadius: 8,
  backgroundColor: '#0A0A0A',
  color: '#FFFFFF',
  minHeight: 40,
})

const SendButton = styled(Button, {
  backgroundColor: '#00D4AA',
  borderRadius: 8,
  paddingHorizontal: 20,
  paddingVertical: 12,
})

const SendButtonText = styled(Text, {
  color: '#FFFFFF',
  fontWeight: 'bold',
  fontSize: 16,
})

export default function ChatScreen() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const insets = useSafeAreaInsets();

  // API base URL
  const API_BASE = "http://10.90.204.59:3001";

  // fetch messages on load
  useEffect(() => {
    fetch(`${API_BASE}/chat/1`)
      .then((res) => res.json())
      .then(setMessages)
      .catch((err) => console.error("error fetching chat:", err));
  }, []);

  // send new message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const res = await fetch(`${API_BASE}/chat/1`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: "aadikatyal", text: input }),
    });

    const newMsg = await res.json();
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  // handle input change
  const handleInputChange = (e: any) => {
    setInput(e.nativeEvent?.text || e || '');
  };


  return (
    <Container>
      <View 
        style={{
          paddingHorizontal: 20,
          paddingTop: 60,
          paddingBottom: 20,
          backgroundColor: '#000000',
        }}
      >
        <View 
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <TouchableOpacity 
            style={{
              padding: 8,
            }}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: 20, color: '#FFFFFF' }}>☰</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image 
              source={require('../assets/images/prizepicks-logo.png')}
              style={{
                width: 32,
                height: 32,
                marginRight: 8,
              }}
              resizeMode="contain"
            />
            <Text 
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#FFFFFF',
                textAlign: 'center',
              }}
            >
              PRIZEPICKS
            </Text>
          </View>
          <View 
            style={{
              backgroundColor: '#00D4AA',
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 6,
            }}
          >
            <Text 
              style={{
                color: '#000000',
                fontSize: 12,
                fontWeight: 'bold',
              }}
            >
              LIVE
            </Text>
          </View>
        </View>
        
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text 
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#FFFFFF',
              textAlign: 'center',
              marginBottom: 8,
            }}
          >
            🏀 NBA Room
          </Text>
          <Text 
            style={{
              fontSize: 16,
              color: '#CCCCCC',
              textAlign: 'center',
              fontWeight: '500',
            }}
          >
            Join the community chat
          </Text>
        </View>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MessageContainer key={item.id}>
            <MessageAvatar>
              <AvatarText>
                {item.user.charAt(0).toUpperCase()}
              </AvatarText>
            </MessageAvatar>
            <MessageContent>
              <UserName>{item.user}</UserName>
              <MessageText>{item.text}</MessageText>
            </MessageContent>
          </MessageContainer>
        )}
        style={{ flex: 1, paddingHorizontal: 16 }}
        contentContainerStyle={{ paddingBottom: 10 }}
      />

      <InputCard paddingBottom={insets.bottom + 10}>
        <InputRow>
          <InputContainer>
            <MessageInput
              value={input}
              onChangeText={handleInputChange}
              placeholder="Type a message..."
              multiline
            />
          </InputContainer>
          <SendButton onPress={sendMessage} disabled={!input.trim()}>
            <SendButtonText>Send</SendButtonText>
          </SendButton>
        </InputRow>
      </InputCard>
    </Container>
  );
}

