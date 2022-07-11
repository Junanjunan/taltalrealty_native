import { Dimensions } from "react-native";
import styled from "styled-components/native";


export const { width, height } = Dimensions.get("screen");

console.log(Dimensions.get("screen").width)

export const ScreenHeight = Dimensions.get("screen").height;
export const ScreenWidth = Dimensions.get("screen").width;
export const TableWidth = Dimensions.get("screen").width*0.9;

export const TopContainer = styled.View`
    // paddingTop: ${height*0.7/18}px;
    // alignItems: center;
    height: ${height*16.5/18}px;
    backgroundColor:red;
`;

export const NavDiv = styled.View`
    flexDirection: row;
    position: absolute;
    bottom: 0px;
    height: ${height*1.05/18}px;
    backgroundColor: white;
`;

export const NavTab = styled.TouchableOpacity`
    alignItems: center;
    justifyContent: center;
    width: ${width*1/4}px;
`;

export const NavTabText = styled.Text`
    fontSize: 15px;
    color: gray;
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

export const RowCenterDiv = styled.View`
    flexDirection: row;
    alignItems: center;
`;

export const BookMainTitle = styled.View`
    // backgroundColor: rgba(210,210,210,0.4);
    backgroundColor: #E0E0E0;
    width: ${width*1/4}px;
    height: ${height*7/20}px;
    marginLeft: ${width*1/18}px;
    marginRight: ${width*1/18}px;
    alignItems: center;
    justifyContent: center;
`;

export const BookMainTitleText = styled.Text`
    fontSize: 50px;
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

export const BookView = styled.View`
    alignItems: center;
    height: ${height*7/20}px;
    marginRight: ${width*0.5/18}px;
    marginBottom: ${height*0.6/18}px;
    marginTop: ${height*0.6/18}px;
`;

export const BookTypeView = styled.View`
    // backgroundColor: rgba(210,210,210,0.4);
    backgroundColor: #E0E0E0;
    alignItems: center;
    justifyContent: center;
    marginBottom: 5px;
    width: ${width*1/4}px;
    height: ${height*1/20}px;
`;

export const BookTypeTO = styled.TouchableOpacity`
    // backgroundColor: rgba(210,210,210,0.4);
    backgroundColor: rgba(150, 240, 240, 1);
    alignItems: center;
    justifyContent: center;
    margin: 5px;
    width: ${width*1/4}px;
    height: ${height*1/21}px;
    borderRadius: 10px;
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

export const Text = styled.Text``;

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


export const CenterView = styled.View`
    alignItems: center;
`;