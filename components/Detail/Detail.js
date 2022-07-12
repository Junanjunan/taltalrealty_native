import { Dimensions } from "react-native";
import styled from "styled-components/native";

const { width, height } = Dimensions.get("screen");

export const Container = styled.View`
    padding: 15px;
`;

export const ScrollContainer = styled.ScrollView`
    height: ${height*3/4}px;
`;

export const Div = styled.View`
    flexDirection: row;
    marginBottom: 10px;
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
    // alignItems: center;
    justifyContent: center;
    width: ${width*0.93}px;
`;

export const DetailTO = styled.TouchableOpacity`
    border: 1px solid;
    borderRadius: 10px;
    padding: 15px 0px;
    margin: 10px;
    align-items: center;
    width: ${width *2/5}px;
    backgroundColor: rgba(150, 240, 240, 1);
    borderWidth: 0;
`;

export const DetailTODelete = styled.TouchableOpacity`
    border: 0px solid rgba(0, 0, 0, 0.2);
    borderRadius: 10px;
    padding: 15px 0px;
    margin: 10px;
    align-items: center;
    width: ${width *2/5}px;
    backgroundColor: rgba(0,0,0, 0.2);
`;

export const DetailTOText = styled.Text``;

