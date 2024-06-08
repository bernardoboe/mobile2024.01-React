import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default function Itemlistauni({ university, onPress, mode }) {
    return (
        <View style={styles.container}>
        {mode === 'name' ? (
            <Button 
                title={university.name} 
                style={{ text: styles.ItemlistauniText }} 
                onPress={onPress} 
            />
        ) : (
            <Button 
                title={university.web_pages} 
                style={{ text: styles.ItemlistauniText }} 
                onPress={onPress} 
            />
        )}
    </View>
);
}


const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        padding: 10,
        borderColor: "#000",
        borderWidth: 2,
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    ItemlistauniText: {
        fontSize: 15,
        maxWidth: "100%",
        textAlign: "center"
    }
});
