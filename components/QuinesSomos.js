import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';

const { width } = Dimensions.get('window');

export default function QuienesSomos() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('https://fakestoreapi.com/products');
            setProducts(result.data);
        };

        fetchData();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {products
                .sort((a, b) => b.price - a.price)
                .map((product) => (
                    <View key={product.id} style={styles.product}>
                        <Image
                            style={styles.image}
                            source={{ uri: product.image }}
                            resizeMode='contain'
                        />
                        <View style={styles.details}>
                            <Text style={styles.title}>{product.title}</Text>
                            <Text style={styles.price}>Ranking: {product.price}</Text>
                            <Text style={styles.category}>{product.category}</Text>
                        </View>
                    </View>
                ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    product: {
        width: width - 40,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginVertical: 20,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    image: {
        height: 200,
        width: '100%',
    },
    details: {
        padding: 20,
    },
    title: {
        fontSize: 18,
    },
    price: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#999',
    },
    category: {
        fontSize: 14,
        color: '#999',
    },
});
