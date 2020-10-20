
import React,{useState,useEffect} from 'react';
import {StyleSheet,View,Text,Image,ScrollView,ActivityIndicator} from 'react-native';
import Header from './components/Header'
import Formulario from './components/Formulario'
import Cotizacion from './components/Cotizacion'

import axios from 'axios'
const App = () => {
  const [moneda,guardarMoneda] = useState('')
  const [criptomoneda,guardarCriptoMoneda]= useState('')
  const [consultarAPI,guardarConsultarAPI] = useState(false)
  const [resultado,guardarResultado] = useState({})
  const [cargando,guardarCargando] = useState(false)
  useEffect(()=>{
   const cotizarCrpMon=async()=>{
    if(consultarAPI){
      //consulta api para obt cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda},ETH&tsyms=${moneda}`
      guardarCargando(true)
      const resultado = await axios.get(url)
      //ocultar spinner
      setTimeout(() => {
        guardarConsultarAPI(false)
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda])
        guardarCargando(false)
      }, 3000);
    }
   }
   cotizarCrpMon()
  },[consultarAPI])

  //mostrar spinner o reuslt
  const componente = cargando ? <ActivityIndicator size="large" color="#5E49E2"/>:  <Cotizacion resultado={resultado}/>
  return (
    <>
    <ScrollView>
    <Header/>
    <Image style={styles.imagen} source={require('./assets/img/cryptomonedas.png')}/>
   <View style={styles.contenido}>
   <Formulario
   moneda={moneda}
   criptomoneda={criptomoneda}
   guardarMoneda={guardarMoneda}
   guardarCriptoMoneda={guardarCriptoMoneda}
   guardarConsultarAPI={guardarConsultarAPI}
   />
  
   </View>
   <View style={{marginTop:40}}>
   {componente}

   </View>
    </ScrollView>
    
    </>
  );
};

const styles = StyleSheet.create({
  imagen:{
    width:'100%',
    height:150,
    marginHorizontal:'2.5%'
  },
  contenido:{
    marginHorizontal:'2.5%'
  }
});

export default App;
