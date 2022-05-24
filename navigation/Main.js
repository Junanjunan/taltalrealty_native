import React, { useEffect } from "react";
import styled from "styled-components/native";
import { connect } from "react-redux";
import api from "../api";
import { getBooks } from "../redux/apartsSlice";


const Container = styled.View`
    justifyContent: center;
    alignItems: center;
    flex: 1;
`;

const Text = styled.Text``;

// export default () => {
//     return (
//         <Container>
//             <Text>Main</Text>
//         </Container>
//     );
// }

// const test = async () => {
//     const { data } = await api.test3();
//     console.log(data);
// }

const Main = ({getBooks}) =>{
    // console.log(props);
    // getBooks();
    useEffect(() => {getBooks()}, []);
    return (
        <Container>
            <Text>Main</Text>
        </Container>
    );
}

function mapStateToProps(state){
    return state.apartsReducer.explore;
}

function mapDispatchToProps(dispatch){
    return{
        getBooks: () => dispatch(getBooks())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);