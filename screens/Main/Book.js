import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, ScrollView } from "react-native";
import styled from "styled-components/native";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { getBooks } from "../../redux/apartsSlice";


const Container = styled.View`
    justifyContent: center;
    alignItems: center;
    flex: 1;
`;

const Text = styled.Text``;

class ExampleOne extends Component {
    constructor({books: {books}}){
        super();
        // console.log(books);
        // console.log(books[0].address);
        this.state = {
            tableHead:['계약유형', '주소', '매매가', '보증금', '월세', '계약금', '중도금', '잔금', '계약일', '중도금일', '잔금일', '신고기한', '잔금일까지(일)', '신고기한까지(일)', '거래신고', '완료계약', '매도(임대)인', '매수(임차)인', '특이사항'],
            tableData: [
                [ `${books[0].address}`, '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
                ['a', 'b', 'c', 'd'],
                ['1', '2', '3', '456\n789dddddddddddddddddddddddddddddddddddd'],
                ['a', 'b', 'c', 'd']
            ]
        }
    }
    
    render(){
        const state = this.state;
        const styles = StyleSheet.create({
            container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
            head: { height: 50, width: 1200, backgroundColor: '#f1f8ff' },
            body: { width: 1200 },
            text: { margin: 6 }
          });
          return (
            <View style={styles.container}>
                <ScrollView horizontal={true}>
                    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                        <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                        <Rows data={state.tableData} style={styles.body} textStyle={styles.text}/>
                    </Table>
              </ScrollView>
            </View>
          )
    }
}


const Book = ({books: {books}}) => {
    useEffect(() => {getBooks()}, []);
    return (
        <Container>
            {books.map(book => (<Text key={book.id}>{book.address}</Text>))}
            <ExampleOne />
        </Container>
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

// export default connect(mapStateToProps, mapDispatchToProps)(Book, ExampleOne);
export default connect(mapStateToProps, mapDispatchToProps)(ExampleOne);