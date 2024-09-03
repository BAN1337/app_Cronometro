import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants'

let timer = null
let ss = 0
let mm = 0
let hh = 0

export default function App() {

  const [numero, setNumero] = useState('00:00:00')
  const [botao, setBotao] = useState('VAI')
  const [ultimo, setUltimo] = useState(null)

  function vai() {
    if (timer !== null) {
      clearInterval(timer)
      timer = null
      setBotao('VAI')
    } else {
      timer = setInterval(() => {
        ss++

        if (ss === 60) {
          mm++
          ss = 0
        }

        if (mm === 60) {
          mm = 0
          hh++
        }

        let format = `${hh < 10 ? `0${hh}` : hh}:${mm < 10 ? `0${mm}` : mm}:${ss < 10 ? `0${ss}` : ss}`

        setNumero(format)

      }, 1000)

      setBotao('PARAR')
    }

  }

  function limpar() {
    if (timer !== null) {
      clearInterval(timer)
      timer = null
    }

    setUltimo(numero)

    setNumero('00:00:00')
    ss = 0;
    mm = 0;
    hh = 0;

    setBotao('VAI')
  }

  return (
    <View style={styles.container}>
      <StatusBar />

      <Image
        source={require('./src/crono.png')}
      />

      <Text style={styles.timer}> {numero} </Text>

      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={vai}>
          <Text style={styles.btnTexto}> {botao} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={limpar}>
          <Text style={styles.btnTexto}>LIMPAR</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.areaUltima}>
        <Text style={styles.textoCorrida}>
          {ultimo ? `Último tempo: ${ultimo}` : ''}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aeef'
  },
  timer: {
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff'
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    margin: 17,
    borderRadius: 9
  },
  btnTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef'
  },
  areaUltima: {
    marginTop: 40
  },
  textoCorrida: {
    fontSize: 23,
    color: '#fff',
    fontStyle: 'italic'
  }
});