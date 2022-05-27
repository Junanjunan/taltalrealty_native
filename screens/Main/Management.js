import React, { Component } from "react";
import styled from "styled-components/native";
import {StyleSheet, View, FlatList, ActivityIndicator, ScrollView, Text, TouchableOpacity,} from 'react-native';
import { Table, TableWrapper, Row, Col } from 'react-native-table-component';
import { connect } from 'react-redux';


// class TableView extends Component {
//     constructor({books: {books}}){
//         console.log(books);
//         super();
//         this.fields = [
//             { key: 'address', title: '주소'},
//             { key: 'price', title: '가격'},
//             { key: 'room', title: '방수'},
//             { key: 'birth', title: '준공'},
//             { key: 'area_m2', title: '면적'},
//         ];

//         this.rows = Array.apply(null, Array(books.length)).map(
//             (item, idx) => ({
//                 address: books[idx].address,
//                 price: books[idx].price,
//                 room: books[idx].room,
//                 birth: books[idx].birth,
//                 area_m2: books[idx].area_m2
//             })
//         );

//         this.state = {
//             tableHead: this.fields.map(field => field.title),
//             data: this.rows.map(row =>
//                 this.fields.map(field => row[field.key]))
//         };
//     }

//     render(){
//         const styles = StyleSheet.create({
//             container: { 
//                 flex:1, 
//                 padding: 10, 
//                 paddingTop:15, 
//                 backgroundColor: '#fff',
//             },
//             header:{
//                 height: 50,
//                 // backgroundColor: '#212732',
//                 borderColor: 'white',
//             },
//             headerText:{
//                 textAlign: 'center',
//                 // color: 'white',
//                 margin: 6
//             }
//         });

//         const fields = this.state.data;
//         const state = this. state;
//         const tableData = [];
//         for (let i=0; i < this.rows.length; i += 1){
//             const rowData = [];
//             for (let j=0; j<this.fields.length; j += 1){
//                 rowData.push(`${i}:${j}`);
//             }
//             tableData.push(rowData);
//         }

//         return(
//             <ScrollView style={styles.container}>
//                 <Table borderStyle={{borderWidth: 1}}>
//                     <Row data={this.state.tableHead} style={styles.header} />
//                     {
//                         tableData.map((rowData, index) => (
//                             <Row key={index} data={this.state.data[index]} />
//                         ))
//                     }
//                 </Table>
//             </ScrollView>
//         )
//     }
// }

const TableView = () => {
    return (
        <Text>Management</Text>
    );
}


function mapStateToProps(state){
    return state.apartsReducer.explore;
};

function mapDispatchToProps(dispatch){
    return{
        getBooks: () => dispatch(getBooks())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(TableView);



// const Container = styled.View`
//     justifyContent: center;
//     alignItems: center;
//     flex: 1;
// `;


// export default () => {
//     return (
//         <Container>
//             <Text>Management</Text>
//         </Container>
//     );
// }