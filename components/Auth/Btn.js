import React from "react";
import { ActivityIndicator, Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import colors from "../../colors";

const { width } = Dimensions.get("screen");

const Button = styled.View`
    border: 1px solid ${props => (props.accent ? "transparent" : "transparent")};
    border-radius: 10px;
    padding: 15px 0px;
    margin: 5px;
    align-items: center;
    width: ${width *1/2}px;
    background-color: ${props => (props.accent ? "#A7EEFF" : "rgb(240,240,240)")}
`;

const Text = styled.Text`
    color: ${props => (props.accent ? "black" : "black")};
`;

const Btn = ({loading, onPress, text, accent = false}) => (
    <TouchableOpacity onPress={loading ? null : onPress}>
        <Button accent={accent}>
            {loading ? (
                <ActivityIndicator color={accent ? "white" : "black"}/>     // loading일 때 버튼이 안보이도록
            ) : (
                <Text accent={accent}>{text}</Text>
            )}
        </Button>
    </TouchableOpacity>
);

export default Btn;