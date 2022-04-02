import React, {useEffect, useState} from "react";
import styled from 'styled-components/native';
import { Text, View, Alert,StyleSheet,TextInput ,Button } from "react-native";
import {Picker} from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';

const Area = styled.TouchableOpacity`
    background-color: #FFFFFF;
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 15px;
    flex-direction: row;
`;

const InfoArea = styled.View`
    margin-left: 20px;
    justify-content: space-between;
`;

const SeeProfileButton = styled.View`
    width: 85px;
    height: 26px;
    border: 1px solid #4EADBE;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

const SeeProfileButtonText = styled.Text`
    font-size: 13px;
    color: #268596;
`;

const NomePessoa = styled.Text`
    font-size: 17px;
    font-weight: bold;
`;
const NomeFazenda = styled.Text`
    font-size: 14px;
`;

const InputArea = styled.View`
width: 100%;
height: 60px;
background-color: #fff;
flex-direction: row;
border-radius: 30px;
padding-left: 15px;
align-items: center;
margin-bottom: 15px;
border: 1px solid #ebb105;
`;
const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #ebb105;
    margin-left: 10px;
`;


export default ({data, setAvaliacaoDoencas}) => {
    var myloop = [];
    var myloop2 = [];

    const [doencas, setDoencas] = useState([{'':'','':''},{'value':'C','label':'Cercospora'},{'value':'PH','label':'Phaosferia'},
    {'value':'CF','label':'Comp.Ferrugem'},{'value':'E','label':'Enfezamento'}]); 

    const [doencaSelecionada, setDoencaSelecionada] = useState([]); 
    const [testee, setTestee] = useState(''); 
   // var doencaSelecionada = [];

    function setarDoencaSelecionada(valor,n_planta,n_linha){
        console.log("Oii")
        if(valor == undefined){
            return;
        }
        if(Array.isArray(doencaSelecionada[n_linha]) && doencaSelecionada[n_linha].length > 0){
            //Se ja tem doenca selecionada
            //cria o objeto
           var obj_doenca = {};
            obj_doenca.planta = n_planta;
            obj_doenca.nome = valor;
        
            var array_linha = [];
            array_linha = doencaSelecionada[n_linha];

            doencaSelecionada[n_linha].forEach(function(objeto) {
               // console.log("retorno"+objeto.valor);
            });
            array_linha = array_linha.filter((item) => item.planta !== n_planta);

            array_linha.push(obj_doenca);

            var array = doencaSelecionada;
            array[n_linha] = array_linha;
            setDoencaSelecionada(array);
        }else{ 
            doencaSelecionada[n_linha] = null;
            //Se é a primeira doenca selecionada
            //Cria o array

            var array_linha = [];
            var array = [];

            //Cria o objeto
            var obj_doenca = {};
            obj_doenca.planta = n_planta;
            obj_doenca.nome = valor;
            
            array_linha.push(obj_doenca);
            
            array[n_linha] = array_linha;
                        
            setDoencaSelecionada(array);

            doencaSelecionada.forEach(function(objeto) {
            //    console.log("foreach doencas: "+objeto.valor);
            });

        }
    }

    function obterDoencaSelecionada(n_planta,n_linha){
         
    var retorno = "";
        if(doencaSelecionada[n_linha] !== 'undefined' &&  Array.isArray(doencaSelecionada[n_linha])){
                var qtddd = 0;
                doencaSelecionada[n_linha].forEach(function(objeto) {
                    qtddd++;
                    if(objeto.planta == n_planta){
                        console.log("no if"+objeto.nome);
                        retorno = objeto.nome;
                        return;
                    }
                });
        }else{
            return "";
        }
        console.log("retornou: "+retorno)
        return retorno;
    }


    

    const [quantidadePlantas, setQuantidadePlantas] = useState(['']); 
    const [quantidadePlantasSelecionadas, setQuantidadePlantasSelecionadas] = useState(['']); 

    function quantFolhas(n_linha){
        for (let i1 = 1; i1 <= parseInt(quantidadePlantasSelecionadas); i1++) {

            myloop2.push(
    
            <View key={"doencas_"+i1+"_"+n_linha}
                
            >
                <Text key={"txt_planta_doenca_"+i1+"_"+n_linha}>Doenças da Planta {i1}</Text>
                <View style={styles.divpickercss} key={"view_picker_doenca_"+i1+"_"+n_linha}>
                    <Picker style={styles.pickercss}
                    key={"picker_doenca_"+i1+"_"+n_linha}
                    selectedValue={ obterDoencaSelecionada(i1,n_linha) }
                    onValueChange={(text) => {
                        setarDoencaSelecionada(text,i1,n_linha),
                        setAvaliacaoDoencas(text,i1,n_linha) }}
                    >
                    {
                    doencas.map(doenca => {
                        return <Picker.Item label={doenca.label} value={doenca.value} />
                        })
                    }
                    </Picker>
                </View>
            </View>
            );
        }
    }

    for (let i = 0; i < parseInt(data); i++) {
    myloop.push(
        <View  
                key={"qtd_plantas_doenca_"+i}>
            <Text>Linha {i + 1}</Text>
            <Text>Quantidade de Doenças</Text>
            <View style={styles.divpickercss}
>
                <Picker
                    key={"picker_qtd_plantas_doenca_"+i}
                    selectedValue={quantidadePlantas}
                    onValueChange={(itemValue) => 
                        setQuantidadePlantasSelecionadas(itemValue)}
                    >
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7" />
                    <Picker.Item label="8" value="8" />
                    <Picker.Item label="9" value="9" />
                    <Picker.Item label="10" value="10" />
                    <Picker.Item label="11" value="11" />
                    <Picker.Item label="12" value="12" />
                    <Picker.Item label="13" value="13" />
                    <Picker.Item label="14" value="14" />
                    <Picker.Item label="15" value="15" />
                    <Picker.Item label="16" value="16" />
                    <Picker.Item label="17" value="17" />
                    <Picker.Item label="18" value="18" />
                    <Picker.Item label="19" value="19" />
                    <Picker.Item label="20" value="20" />
                    <Picker.Item label="21" value="21" />
                    <Picker.Item label="22" value="22" />
                    <Picker.Item label="23" value="23" />
                    <Picker.Item label="24" value="24" />
                    <Picker.Item label="25" value="25" />
                    <Picker.Item label="26" value="26" />
                    <Picker.Item label="27" value="27" />
                    <Picker.Item label="28" value="28" />
                    <Picker.Item label="29" value="29" />
                    <Picker.Item label="30" value="30" />
                    <Picker.Item label="30" value="31" />
                    <Picker.Item label="30" value="32" />
                </Picker>
            </View>
            {quantFolhas(i+1)}
            {myloop2}
            

        </View>
    );
    }
    return (
        <View >
            <TextInput
                style={styles.input}
                value={testee}
            />
            {myloop} 
                <Text>Componente</Text>      
            
        </View>
     );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: "center",
    },
    label: {
      margin: 8,
    },
    divpickercss:{
        borderWidth: 1,
        borderColor: '#ebb105',        
        height: 60,
        width:'100%',
        borderStyle: "solid",
        borderRadius: 50,
        paddingLeft:15,
        marginBottom:10,
    },
    pickercss:{
        color:"#ebb105"
    }
  });