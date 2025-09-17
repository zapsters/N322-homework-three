import { useState } from "react";
import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const startEditing = (id, name) => {
    setEditingId(id);
    setEditingText(name);
  };

  const saveEdit = (id) => {
    setList(list.map((g) => (g.id === id ? { ...g, name: editingText } : g)));
    setEditingId(null);
    setEditingText("");
  };

  const addItem = () => {
    if (item.trim().length === 0) return;
    setList([...list, { id: Date.now().toString(), name: item }]);
    setItem("");
  };

  const removeItem = (id) => {
    setList(list.filter((g) => g.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add To-Do Item"
          value={item}
          onChangeText={setItem}
        />
        <Button title="Add" style={{ backgroundColor: "blue" }} onPress={addItem} />
      </View>
      <FlatList
        data={list}
        keyExtractor={(g) => g.id}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemRow}>
              {editingId === item.id ? (
                <TextInput
                  style={styles.input}
                  value={editingText}
                  onChangeText={setEditingText}
                  onSubmitEditing={() => saveEdit(item.id)}
                  autoFocus
                />
              ) : (
                <Text style={styles.itemText}>{item.name}</Text>
              )}
              <View style={{ flexDirection: "row" }}>
                {editingId === item.id ? (
                  <Pressable onPress={() => saveEdit(item.id)}>
                    <Text style={styles.save}>S</Text>
                  </Pressable>
                ) : (
                  <Pressable onPress={() => startEditing(item.id, item.name)}>
                    <Text style={styles.edit}>E</Text>
                  </Pressable>
                )}
                <Pressable onPress={() => removeItem(item.id)}>
                  <Text style={styles.deleteButton}>X</Text>
                </Pressable>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#6B0F1A",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "white",
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 15,
    width: "98vw",
    maxWidth: "400px",
    margin: "auto",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: "#DCE0D9",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#c7b1b1",
    color: "white",
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    evalation: 2,
    maxWidth: "400px",
    width: "98vw",
    margin: "auto",
    borderRadius: "8px",
  },
  itemText: {
    fontSize: 16,
    width: "100%",
    flex: 1,
  },
  deleteButton: {
    fontSize: 18,
    color: "red",
  },
  edit: {
    marginRight: 20,
    fontSize: 18,
    color: "blue",
  },
  save: {
    marginRight: 20,
    fontSize: 18,
    color: "green",
  },
});
