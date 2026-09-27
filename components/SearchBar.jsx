import { TextInput, StyleSheet } from "react-native";

export default function SearchBar({ valor, onChange }) {
  return (
    <TextInput
      style={styles.input}
      placeholder="Pesquisar Pokémon..."
      value={valor}
      onChangeText={onChange}
      autoCapitalize="none"
      autoCorrect={false}
    />
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderRadius: 8, padding: 10, margin: 8 },
});