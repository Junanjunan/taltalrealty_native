import { Dimensions } from "react-native";
import styled from "styled-components/native";
export const { width, height } = Dimensions.get("screen");

export const TopContainer = styled.View`
    paddingTop: ${height*0.7/18}px; 
    // alignItems: center;
    height: 500px;
`;

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
    alignItems: center;
    vertialAlign: middle;
    textAlign: center;
`;

export const CreatingBtn = styled.TouchableOpacity`
    backgroundColor: pink;
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
    backgroundColor: red;
    width: 120px;
    height: 30px;
    alignItems: center;
    justifyContent: center;
`;

export const View = styled.View`
    paddingTop: ${height*0.6/18}px; 
    alignItems: center;
`;

export const SearchBtnText = styled.Text``;

export const CheckboxStyle = {
    marginTop: 10,
    marginBottom: 10
};

export const TableBorderStyle = {
    borderWidth: 1
}

export const RowHeadStyle = {
    backgroundColor: "skyblue",
    height: 50
}

export const RowBodyStyle = {
    height: 50
}

export const RowTextStyle = {
    textAlign: "center"
}

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
    marginBottom: 50px;
`;

export const NormalText = styled.Text``;


export const ScrollContainer = styled.ScrollView`
    height: ${height*2/3}px;
`;


export const Item = styled.Text`
    width: 60px;
    margin: 5px;
    fontSize: 17px;
`;

export const Text = styled.Text`
    width: 100px;
    margin: 5px;
    fontSize: 17px;
`;

export const TextLong = styled.Text`
    margin: 5px;
    fontSize: 15px;
`;

export const Des = styled.Text`
    width: ${width*7/12}px;
    fontSize: 17px;
    margin: 5px;
`;

export const DetailTODiv = styled.View`
    flexDirection: row;
    alignItems: center;
    justifyContent: center;
`;

export const DetailTO = styled.TouchableOpacity`
    border: 1px solid;
    border-radius: 10px;
    padding: 15px 0px;
    margin: 10px;
    align-items: center;
    width: ${width *2/5}px;
`;

export const DetailTODelete = styled.TouchableOpacity`
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 15px 0px;
    margin: 10px;
    align-items: center;
    width: ${width *2/5}px;
    backgroundColor: rgba(0,0,0, 0.2);
`;

export const DetailTOText = styled.Text``;