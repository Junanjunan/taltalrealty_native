import { Dimensions } from "react-native";
import styled from "styled-components/native";


export const { width } = Dimensions.get("screen");

export const SearchInput = styled.TextInput`
    backgroundColor: white;
    width: 60px;
    borderWidth: 1px;
    margin: 3px;
`;

export const SearchInputAddress = styled.TextInput`
    backgroundColor: white;
    width: 150px;
    borderWidth: 1px;
    margin: 3px;
`;

export const SearchTitleText = styled.Text`
    margin: 3px;
    textAlign: right;
`;

export const SearchArticle = styled.View`
    flexDirection: row;
    marginLeft: 5px;
    marginRight: 5px;
    alignItems: center;
`;

export const Div = styled.View`
    flexDirection: row;
    width: ${width*5/6}px;
`;

export const CreatingBtn = styled.TouchableOpacity`
    backgroundColor: pink;
    height: 40px;
    width: ${width*9/10}px;
    alignItems: center;
    justifyContent: center;
    marginBottom: 10px;
    borderRadius: 10px;
`;

export const SearchContainer = styled.View`
    alignItems: center;
    borderWidth: 1px;
    padding: 5px;
    marginBottom: 10px;
    width: ${width*9/10}px;
`;

export const SearchBtn = styled.TouchableOpacity`
    backgroundColor: red;
    width: 120px;
    height: 30px;
    alignItems: center;
    justifyContent: center;
`;

export const SearchBtnText = styled.Text``;

export const CheckboxStyle = {
    marginTop: 10,
    marginBottom: 10
};