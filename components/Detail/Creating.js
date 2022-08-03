import styled from "styled-components/native";
import { Dimensions } from 'react-native';


export const { width, height } = Dimensions.get("screen");

export const Container = styled.View`
    flex:1;
    padding: 20px;
`;

export const CreatingInput = styled.TextInput`
    width: ${width/6}px;
    padding: 12.5px 10px;
    border: 1px solid black;
    background-color: white;
    border-radius: 10px;
    margin-bottom: 5px;
    marginTop: 5px;
    marginRight: 50px;
`;

export const CreatingInputAddress = styled.TextInput`
    width: ${width*3/5}px;
    padding: 12.5px 10px;
    border: 1px solid black;
    background-color: white;
    border-radius: 10px;
    margin-bottom: 5px;
    marginTop: 5px;
`;

export const CreatingInputDes = styled.TextInput`
    width: ${width*3/5}px;
    height: ${height*1/8}px;
    padding: 12.5px 10px;
    border: 1px solid black;
    background-color: white;
    border-radius: 10px;
    margin-bottom: 5px;
    marginTop: 5px;
`;

export const Div = styled.View`
    flexDirection: row;
    alignItems: center;
    vertialAlign: middle;
    textAlign: center;
`;

export const DivText = styled.Text`
    fontSize: 18px;
    marginRight: 5px;
    width: 60px;
    textAlign: center;
`;

export const CheckboxText = styled.Text`
    fontSize: 18px;
    marginRight: 5px;
    width: 45px;
    textAlign: center;
`;

export const BtnDiv = styled.View`
    alignItems: center;
    margin: 20px;
`;

export const ScrollView = styled.ScrollView`
    marginBottom: 20px;
`;

export const NormalText = styled.Text``;

export const ShareCheckboxStyle = {
    padding: 5
};