import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Button, Card, Divider, ListItem } from "react-native-elements";

// API base URL
const API_BASE = "http://10.90.204.59:3001";

export default function PicksScreen() {
  const [props, setProps] = useState<any[]>([]);
  const [slip, setSlip] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch props from API
  useEffect(() => {
    fetch(`${API_BASE}/api/props`)
      .then((res) => res.json())
      .then(setProps)
      .catch((err) => console.error("Error fetching props:", err))
      .finally(() => setLoading(false));
  }, []);

  const addToSlip = (pick: any, choice: "Over" | "Under") => {
    const slipItem = { 
      ...pick, 
      choice, 
      slipId: Date.now() + Math.random() // Create unique ID for slip item
    };
    setSlip([...slip, slipItem]);
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>NBA Picks</Text>

      {loading ? (
        <Text style={styles.loadingText}>Loading props...</Text>
      ) : (
        <FlatList
          data={props}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card containerStyle={styles.card}>
              <Card.Title style={styles.player}>{item.player}</Card.Title>
              <Text style={styles.game}>{item.game}</Text>
              <Text style={styles.stat}>
                {item.stat}: {item.line}
              </Text>
              <View style={styles.actions}>
                <Button
                  title="Over"
                  buttonStyle={[styles.btn, { backgroundColor: "#4caf50" }]}
                  onPress={() => addToSlip(item, "Over")}
                  containerStyle={styles.btnContainer}
                />
                <Button
                  title="Under"
                  buttonStyle={[styles.btn, { backgroundColor: "#f44336" }]}
                  onPress={() => addToSlip(item, "Under")}
                  containerStyle={styles.btnContainer}
                />
              </View>
            </Card>
          )}
        />
      )}

      {/* Slip builder */}
      {slip.length > 0 && (
        <View style={styles.slip}>
          <Text style={styles.slipHeader}>Your Slip</Text>
          <Divider style={{ marginBottom: 10 }} />
          {slip.map((pick) => (
            <ListItem key={pick.slipId} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>
                  {pick.player} {pick.choice} {pick.line}
                </ListItem.Title>
              </ListItem.Content>
              <Button
                title="Remove"
                type="outline"
                onPress={() => removeFromSlip(pick.slipId)}
                buttonStyle={{ borderColor: "#f44336" }}
                titleStyle={{ color: "#f44336", fontSize: 12 }}
              />
            </ListItem>
          ))}
          <Button
            title="Submit Picks"
            buttonStyle={{ backgroundColor: "#2196F3", marginTop: 10 }}
            onPress={submitSlip}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0A0A", padding: 16 },
  header: { fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#FFFFFF" },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#333",
  },
  player: { fontSize: 20, fontWeight: "bold", color: "#FFFFFF" },
  game: { fontSize: 14, color: "#00D4AA", marginBottom: 4, fontWeight: "600" },
  stat: { fontSize: 16, marginVertical: 8, color: "#CCCCCC" },
  loadingText: { textAlign: "center", fontSize: 18, color: "#CCCCCC", marginTop: 50 },
  actions: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginTop: 12,
    gap: 8
  },
  btn: { 
    borderRadius: 8,
    paddingVertical: 12,
  },
  btnContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  slip: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1A1A1A",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    maxHeight: 300,
    borderWidth: 1,
    borderColor: "#333",
  },
  slipHeader: { 
    fontWeight: "bold", 
    fontSize: 18, 
    marginBottom: 10,
    color: "#FFFFFF"
  },
});