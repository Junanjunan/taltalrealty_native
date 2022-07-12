import { Dimensions } from "react-native";
import styled from "styled-components/native";


export const { width, height } = Dimensions.get("screen");

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
    backgroundColor: rgba(150, 240, 240, 1);
    height: 40px;
    width: ${width}px;
    alignItems: center;
    justifyContent: center;
    marginBottom: 10px;
`;

export const SearchContainer = styled.View`
    alignItems: center;
    borderWidth: 1px;
    padding: 5px;
    marginBottom: 10px;
    width: ${width*9/10}px;
`;

export const SearchBtn = styled.TouchableOpacity`
    backgroundColor: #E0E0E0;
    width: 120px;
    height: 30px;
    alignItems: center;
    justifyContent: center;
`;


export const ScrollView = styled.ScrollView`
    marginBottom: 70px;
`;

export const View = styled.View`
    alignItems: center;
`;

export const Text = styled.Text``;

export const SearchBtnText = styled.Text``;

export const CheckboxStyle = {
    marginTop: 10,
    marginBottom: 10
};

export const TableBorderStyle = {
    borderWidth: 1
}

export const RowHeadStyle = {
    backgroundColor: "#E0E0E0",
    height: 50
}

export const RowBodyStyle = {
    height: 50
}

export const RowTextStyle = {
    textAlign: "center"
}

