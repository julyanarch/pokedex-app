import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";

function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export default function PokemonCard({ pokemon, onPress }) {
  const id = pokemon.url.split("/").filter(Boolean).pop();

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        }}
        style={styles.imagem}
      />
      <Text style={styles.nome}>{capitalizar(pokemon.name)}</Text>
      <Text>#{id}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    margin: 8,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
  },
  imagem: {
    width: 100,
    height: 100,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
  },
});