import React from "react";
import {  Container, Text } from "../../components/Detail/Detail";

const ShareMemo = (props) => {
    console.log(props.route.params);
    return(
        <Container>
            <Text>ShareMemo</Text>
            <Text>{props.route.params.address}</Text>
        </Container>
    );
};


export default ShareMemo;