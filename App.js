import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TextInput, Button } from "react-native";
import PokemonCard from "./components/PokemonCard";
import PokemonDetail from "./screens/PokemonDetail";
import SearchBar from "./components/SearchBar";
import Loading from "./components/Loading";

export default function App() {
  // 1) ESTADOS DA LISTA
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [pesquisa, setPesquisa] = useState("");

  // 1.1) ESTADOS DOS DETALHES
  const [pokemonSelecionado, setPokemonSelecionado] = useState(null);
  const [detalhes, setDetalhes] = useState(null);
  const [loadingDetalhes, setLoadingDetalhes] = useState(false);
  const [erroDetalhes, setErroDetalhes] = useState(null);

  // 2) FUNÇÃO QUE BUSCA A LISTA
  async function carregarPokemons() {
    try {
      setLoading(true);
      setErro(null);

      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30");
      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      setPokemons(data.results);
    } catch (error) {
      setErro("Não foi possível carregar os Pokémon.");
    } finally {
      setLoading(false);
    }
  }

  // 2.1) FUNÇÃO QUE BUSCA OS DETALHES (não existe no documento)
  async function carregarDetalhes(nome) {
    try {
      setLoadingDetalhes(true);
      setErroDetalhes(null);
      setDetalhes(null);

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${nome.trim().toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      setDetalhes(data);
    } catch (error) {
      setErroDetalhes("Pokémon não encontrado.");
    } finally {
      setLoadingDetalhes(false);
    }
  }

  // 2.2) VOLTAR PARA A LISTA
  function voltarParaLista() {
    setPokemonSelecionado(null);
    setDetalhes(null);
    setErroDetalhes(null);
  }

  // 3) EFEITOS
  // [] -> roda uma vez, quando o app abre
  useEffect(() => {
    carregarPokemons();
  }, []);

  // [pokemonSelecionado] -> roda sempre que o Pokémon selecionado mudar
  useEffect(() => {
    if (pokemonSelecionado) {
      carregarDetalhes(pokemonSelecionado.name);
    }
  }, [pokemonSelecionado]);

  // 4) LISTA FILTRADA
  const pokemonsFiltrados = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(pesquisa.toLowerCase())
  );

  // 5) RENDERIZAÇÃO CONDICIONAL
  if (loading) {
    return <Loading mensagem="Carregando Pokédex..." />;
  }

  if (erro) {
    return (
      <View style={styles.centro}>
        <Text>{erro}</Text>
        <Button title="Tentar novamente" onPress={carregarPokemons} />
      </View>
    );
  }

  // "Tela" de detalhes
  if (pokemonSelecionado) {
    return (
      <PokemonDetail
        detalhes={detalhes}
        loading={loadingDetalhes}
        erro={erroDetalhes}
        onVoltar={voltarParaLista}
      />
    );
  }

  // 6) "Tela" da lista
  return (
    <View style={styles.container}>
      <SearchBar valor={pesquisa} onChange={setPesquisa} />
      
      <Button
        title="Buscar na API"
        onPress={() => setPokemonSelecionado({ name: pesquisa })}
      />

      <Button title="Recarregar" onPress={carregarPokemons} />

      <FlatList
        data={pokemonsFiltrados}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PokemonCard
            pokemon={item}
            onPress={() => setPokemonSelecionado(item)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhum Pokémon encontrado.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  centro: { flex: 1, justifyContent: "center", alignItems: "center" },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, margin: 8 },
  vazio: { textAlign: "center", marginTop: 20 },
});