import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

export default function Loading({ mensagem = "Carregando..." }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", gap: 10 },
});