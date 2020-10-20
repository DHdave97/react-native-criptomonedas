import React ,{useState,useEffect} from 'react'
import {Text,StyleSheet,Platform, View,TouchableHighlight,Alert} from 'react-native'
import {Picker} from '@react-native-community/picker'
import axios from 'axios'   
const Formulario = ({moneda,criptomoneda,guardarMoneda,guardarCriptoMoneda,guardarConsultarAPI}) => {
    
    const [criptomonedas,guardarCriptoMonedas]= useState([])
    useEffect(()=>{
        const consultarAPI = async() =>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const resultado = await  axios.get(url)
            guardarCriptoMonedas(resultado.data.Data)
        }
        consultarAPI()
    },[])
    //almacena selecciones
    const obtenerMoneda = moneda=>{
        guardarMoneda(moneda)
    }

    const obtenerCriptoMoneda = moneda=>{
        guardarCriptoMoneda(moneda)
    }
    const cotizarPrecio = ()=>{
        if(moneda.trim() === '' || criptomoneda.trim() === ''){
            mostrarAlerta();
            return
        }
        guardarConsultarAPI(true)
    }
    const mostrarAlerta = () => {
        Alert.alert(
            'Error...',
            'Ambos campos son obligatorios',
            [
                {text:'OK'}
            ]

        )
    }
    
    return(
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker 
            selectedValue={moneda}
            onValueChange={ moneda=>obtenerMoneda(moneda)}
            itemStyle={{height:120}}
            >
                <Picker.Item label="- Seleccione -" value=""/>
                <Picker.Item label="Dolar de Estados Unidos" value="USD"/>
                <Picker.Item label="Peso Mexicano" value="MXN"/>
                <Picker.Item label="Euro" value="EUR"/>
                <Picker.Item label="Libra Esterlina" value="GBP"/>
            </Picker>
            <Text style={styles.label}>Criptomoneda</Text>
            <Picker 
            selectedValue={criptomoneda}
            onValueChange={ criptomoneda=>obtenerCriptoMoneda(criptomoneda)}
            itemStyle={{height:120}}
            >
                <Picker.Item label="- Seleccione -" value=""/>
               { criptomonedas.map(cripto=>(
                   <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name}/>
               )) }
            </Picker>
            <TouchableHighlight
                style={styles.btnCotizar}
                onPress={()=>cotizarPrecio()}
            >
                <Text style={styles.txtCotizar}>Cotizar</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    label:{
        fontFamily:'Lato-Black',
        textTransform:'uppercase',
        fontSize:22,
        marginVertical:20
    },
    btnCotizar:{
        backgroundColor:'#5E49E2',
        padding:10,
        marginTop:20
    },
    txtCotizar:{
        color:'#fff',
        fontSize:18,
        fontFamily:'Lato-Black',
        textTransform:'uppercase',
        textAlign:'center'
    }
});
export default Formulario
