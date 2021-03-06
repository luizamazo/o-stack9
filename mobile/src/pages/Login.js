import React from 'react';
import { View, KeyboardAvoidingView, Platform, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import logo from '../assets/logo.png';

//no ios o teclado pode cobrir o form, no android nao, por isso pro ios usa o keyboard avoiding view

export default function Login(){
    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
            <Image source={logo} />

            //n temos tag form então vai ser outra view
            <View style={styles.form}>
                <Text style={styles.label}>SEU EMAIL *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Seu email"
                    placeholderTextColor='#999'
                    keyboardType="email-address"
                    autoCapitalize="none" //nenhuma letra em caps do keyboard
                    autoCorrect={false}    
                />

                <Text style={styles.label}>TECNOLOGIAS *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Tecnologias de interesse"
                    placeholderTextColor='#999'
                    autoCapitalize="words" 
                    autoCorrect={false}    
                />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Encontrar spots</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, //pra ocupar todo o tamanho da tela
        justifyContent: 'center',
        alignItems: 'center'
    },

    form: {
        alignSelf: 'stretch', //ocupe a largura inteira possível,
        paddingHorizontal: 30, 
        marginTop: 30,

    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2

    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }


   

})