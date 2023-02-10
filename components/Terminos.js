import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Card, Icon, Avatar } from 'react-native-elements';

export default function Terminos() {
    const [accepted, setAccepted] = useState(false);

    const handleAccept = () => {
        setAccepted(true);
        console.log('Gracias por aceptar los Términos y Condiciones!');
    };
    return (
        <View style={styles.container}>
            <Card containerStyle={styles.cardContainer}>
                <View style={styles.headerContainer}>
                    <Avatar
                        size="large"
                        icon={{ name: 'file-text', type: 'font-awesome' }}
                        overlayContainerStyle={styles.avatar}
                    />
                    <Text style={styles.title}>Términos y Condiciones</Text>
                </View>
                <Text style={styles.subtitle}>
                    Recuerda que comprando ropa en esta App y hay algún error de cálculo te llamaremos o devolveremos el dinero
                </Text>
                {!accepted && (
                    <View style={styles.buttonContainer}>
                        <Button title="Aceptar" onPress={handleAccept} />
                    </View>
                )}
                {accepted && (
                    <View style={styles.acceptedContainer}>
                        <Icon name="check" type="font-awesome" color="#4BB543" />
                        <Text style={styles.acceptedText}>Aceptado</Text>
                    </View>
                )}
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    cardContainer: {
        width: '90%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        backgroundColor: '#f1f1f1',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 20,
    },
    subtitle: {
        textAlign: 'justify',
        fontSize: 16,
        marginBottom: 20,
    },
    buttonContainer: {
        marginTop: 20,
    },
    acceptedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    acceptedText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});
