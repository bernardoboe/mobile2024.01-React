import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import List from '../components/ListUni.js';
import { listar, excluir, debugDatabase } from '../components/Db';

export default function Tela_Fav_Func({ navigation }) { 

    const [Universities, setUniversities] = useState([])

    useEffect(() => {
        listar().then(setUniversities);
    }, []);

    function removerfavoritado(uni) {
        return function () {  
            excluir(uni.web_pages)
                .then(() => {
                    listar().then(setUniversities);
                    debugDatabase();
                })
        }
    }

    return (
        <View style={styles.container}>
            <List
                data={Universities}
                onItemPress={removerfavoritado}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        width: '100%',
    },
});
