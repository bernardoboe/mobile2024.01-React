import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Itemlistauni from './ItemList';

export default function List({ data, onItemPress, mode }) {
    return (
        <FlatList
            style={styles.listauniversidades}
            data={data}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
                <Itemlistauni 
                    university={item} 
                    onPress={onItemPress(item)} 
                    mode={mode} 
                />
            )}
        />
    );
}

const styles = StyleSheet.create({
    listauniversidades: {
        margin: 5,
        paddingHorizontal: 16,
        paddingTop: 20,
        overflow: 'scroll',
        width: '100%',}
})