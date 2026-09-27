import { View, Text, Image, Button, ScrollView, StyleSheet } from "react-native";

export default function PokemonDetail({ detalhes, loading, erro, onVoltar }) {
  if (loading) {
    return (
      <View style={styles.centro}>
        <Text>Carregando detalhes...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centro}>
        <Text>{erro}</Text>
        <Button title="Voltar" onPress={onVoltar} />
      </View>
    );
  }

  if (!detalhes) {
    return null;
  }

  // A API usa decímetros e hectogramas
  const alturaMetros = detalhes.height / 10;
  const pesoKg = detalhes.weight / 10;

  const tipos = detalhes.types.map((t) => t.type.name);
  const habilidades = detalhes.abilities.map((a) => a.ability.name);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="Voltar" onPress={onVoltar} />

      <Image
        source={{ uri: detalhes.sprites.front_default }}
        style={styles.imagem}
      />

      <Text style={styles.nome}>{detalhes.name}</Text>
      <Text>#{detalhes.id}</Text>

      <Text style={styles.secao}>Medidas</Text>
      <Text>Altura: {alturaMetros} m</Text>
      <Text>Peso: {pesoKg} kg</Text>

      <Text style={styles.secao}>Tipos</Text>
      <Text>{tipos.join(", ")}</Text>

      <Text style={styles.secao}>Habilidades</Text>
      <Text>{habilidades.join(", ")}</Text>

      <Text style={styles.secao}>Estatísticas</Text>
      {detalhes.stats.map((s) => (
        <Text key={s.stat.name}>
          {s.stat.name}: {s.base_stat}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 50, paddingHorizontal: 20, paddingBottom: 40, alignItems: "center" },
  centro: { flex: 1, justifyContent: "center", alignItems: "center", gap: 10 },
  imagem: { width: 200, height: 200 },
  nome: { fontSize: 28, fontWeight: "bold" },
  secao: { fontSize: 18, fontWeight: "bold", marginTop: 16, marginBottom: 4 },
});