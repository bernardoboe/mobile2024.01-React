import Listfavcontext from '../contexts/ListFavContext';
import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { inserir, debugDatabase, deletar } from '../components/Db';
import List from '../components/ListUni';
import axios from 'axios';

export default function Pesq_Univer({ navigation }) {
  const { listfav, setlistfav } = useContext(Listfavcontext);
  const [universities, setUniversities] = useState([]);
  const [nome, setNome] = useState('');
  const [pais, setPais] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const pesq = async (nome, pais) => {
    try {
      const response = await axios.get(`http://universities.hipolabs.com/search?name=${nome}&country=${pais}`);
      if (response.data.length === 0) {
        setMessage('Nenhuma universidade encontrada.');
        setUniversities([]);
      } else {
        setMessage('');
        setErrorMessage('');
        setUniversities(response.data);
      }
    } catch (error) {
      setErrorMessage('Erro ao buscar universidades.');
      setUniversities([]);
    }
  };

function addfavorito(uni) {
    return () => {

        inserir(uni.name, uni.web_pages[0])
            .then(() => {
                let aux = new Set(listafavoritos);
                aux.add(uni);
                setlistafavoritos(aux);
                debugDatabase()
            })
    };

}
function deletarFav() {
    return function () {  
        deletar()
          .then(() => {
            listar().then(setUniversities);
            debugDatabase();
            })
};
    }

  const changeScreen = () => {
    navigation.navigate("Lista de Favoritos");
  };

  return (
    <View style={styles.container}>
        <Button title="Deletar Favoritos" onPress={deletarFav()} />
      <View style={styles.bloco}>
        <TextInput
          style={styles.input}
          value={pais}
          placeholder="Nome do País"
          onChangeText={setPais}
        />
        <TextInput
          style={styles.input}
          value={nome}
          placeholder="Nome da Universidade"
          onChangeText={setNome}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.botao}
          title="PESQUISAR"
          onPress={() => pesq(nome, pais)}
        />
        <Button
          style={styles.botao}
          title="FAVORITOS"
          onPress={changeScreen}
        />
      </View>

      {message ? <Text style={styles.message}>{message}</Text> : null}
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <View style={styles.listContainer}>
        <List data={universities} itemIdKey={'name'} onItemPress={addfavorito} mode={'name'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  bloco: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  botao: {
    flex: 1,
    marginHorizontal: 5,
  },
  listContainer: {
    flex: 1,
  },
  message: {
    color: 'blue',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
