import * as SQLite from 'expo-sqlite';

const bcodados = SQLite.openDatabase('pesq_uni.db');

export const iniciar = () => {

    const executar = (tx, resolve, reject) => {

        tx.executeSql('CREATE TABLE IF NOT EXISTS fav_univer (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, web_pages TEXT);',
            [],
            (_, rs) => resolve(rs),
            (_, err) => reject(err)
        );
    }

    return new Promise((resolve, reject) => {
        bcodados.transaction((tx) => executar(tx, resolve, reject), reject, resolve);
    });
}

export const inserir = (name, web_pages) => {

    const executar = (tx, resolve, reject) => {

        tx.executeSql("INSERT INTO fav_univer (name, web_pages) VALUES (?, ?)",
            [name, web_pages],
            (_, rs) => resolve(rs),
            reject
        );
    }

    return new Promise((resolve, reject) => {
        bcodados.transaction((tx) => executar(tx, resolve, reject), reject, resolve);
    });
}

export const excluir = (web_pages) => {

    const executar = (tx, resolve, reject) => {

        tx.executeSql("DELETE FROM fav_univer WHERE web_pages = ?",
            [web_pages],
            (_, rs) => resolve(rs),
            reject
        );
    }

    return new Promise((resolve, reject) => {
        bcodados.transaction((tx) => executar(tx, resolve, reject), reject, resolve);
    });
}
export const deletar = () => {

    const executar = (tx, resolve, reject) => {

        tx.executeSql("DELETE FROM fav_univer",
            (_, rs) => resolve(rs),
            reject
        );
    }

    return new Promise((resolve, reject) => {
        bcodados.transaction((tx) => executar(tx, resolve, reject), reject, resolve);
    });
}
export const listar = async () => {

    const executar = (tx, resolve, reject) => {

        tx.executeSql('SELECT web_pages FROM fav_univer',
            [],
            (_, rs) => resolve(rs.rows._array),
            reject
        );
    }

    return new Promise((resolve, reject) => {
        bcodados.transaction((tx) => executar(tx, resolve, reject), reject, resolve);
    });



}

export const debugDatabase = () => {
    const executar = (tx, resolve, reject) => {
        tx.executeSql(
            'SELECT * FROM fav_univer;',
            [],
            (_, rs) => {
                console.log("Conteúdo do DB:", rs.rows._array);
                resolve(rs.rows._array);
            },
            (_, err) => reject(err)
        );
    };

    return new Promise((resolve, reject) => {
        bcodados.transaction((tx) => executar(tx, resolve, reject), reject, resolve);
    });
}