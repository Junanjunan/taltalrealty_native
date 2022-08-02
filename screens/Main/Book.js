import React, { Component, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { doSetNavBook } from "../../redux/navigationSlice";
import { connect } from "react-redux";
import { BookView, BookTypeView, BookTypeTO, RowCenterDiv, BookMainTitle, BookMainTitleText, Text } from "../../components/DivCollection";


const BookType = () => {
    const navigation = useNavigation();
    return(
        <>
        <BookView>
            <BookTypeView><Text>매매</Text></BookTypeView>
            <BookTypeTO onPress={() => navigation.navigate("DealApartmentTable")}><Text>아파트</Text></BookTypeTO>
            <BookTypeTO onPress={() => navigation.navigate("DealVillaTable")}><Text>빌라</Text></BookTypeTO>
            <BookTypeTO onPress={() => navigation.navigate("DealOfficetelTable")}><Text>오피스텔</Text></BookTypeTO>
            <BookTypeTO onPress={() => navigation.navigate("DealStoreTable")}><Text>상가</Text></BookTypeTO>
            <BookTypeTO onPress={() => navigation.navigate("DealBuildingTable")}><Text>건물</Text></BookTypeTO>
        </BookView>
        <BookView>
            <BookTypeView><Text>임대</Text></BookTypeView>
            <BookTypeTO onPress={() => navigation.navigate("LeaseApartmentTable")}><Text>아파트</Text></BookTypeTO>
            <BookTypeTO onPress={() => navigation.navigate("LeaseVillaTable")}><Text>주택</Text></BookTypeTO>
            <BookTypeTO onPress={() => navigation.navigate("LeaseOfficetelTable")}><Text>오피스텔</Text></BookTypeTO>
            <BookTypeTO onPress={() => navigation.navigate("LeaseStoreTable")}><Text>상가</Text></BookTypeTO>
        </BookView>
        </>
    );
};

const CustomerType = () => {
    const navigation = useNavigation();
    return(
        <>
        <BookView>
            <BookTypeView><Text>매매</Text></BookTypeView>
            <BookTypeTO onPress={() => navigation.navigate("CustomerDealApartmentTable")}><Text>아파트</Text></BookTypeTO>
            <BookTypeTO onPress={() => navigation.navigate("CustomerDealVillaTable")}><Text>빌라</Text></BookTypeTO>
            <BookTypeTO onPress={() => navigation.navigate("CustomerDealOfficetelTable")}><Text>오피스텔</Text></BookTypeTO>
            <BookTypeTO onPress={() => navigation.navigate("CustomerDealStoreTable")}><Text>상가</Text></BookTypeTO>
            <BookTypeTO onPress={() => navigation.navigate("CustomerDealBuildingTable")}><Text>건물</Text></BookTypeTO>
        </BookView>
        <BookView>
            <BookTypeView><Text>임대</Text></BookTypeView>
            <BookTypeTO onPress={() => navigation.navigate("CustomerLeaseApartmentTable")}><Text>아파트</Text></BookTypeTO>
            <BookTypeTO onPress={() => navigation.navigate("CustomerLeaseVillaTable")}><Text>주택</Text></BookTypeTO>
            <BookTypeTO onPress={() => navigation.navigate("CustomerLeaseOfficetelTable")}><Text>오피스텔</Text></BookTypeTO>
            <BookTypeTO onPress={() => navigation.navigate("CustomerLeaseStoreTable")}><Text>상가</Text></BookTypeTO>
        </BookView>
        </>
    );
};


const Book = (props) => {
    return(        
        <>
            <RowCenterDiv>
            <BookMainTitle>
                <BookMainTitleText>매물</BookMainTitleText>
            </BookMainTitle>
            <BookType />
            </RowCenterDiv>
            <RowCenterDiv>
            <BookMainTitle>
                <BookMainTitleText>손님</BookMainTitleText>
            </BookMainTitle>
            <CustomerType />
            </RowCenterDiv>
        </>
    )
};


function mapStateToProps(state){
    return state.navigationReducer
};

function mapDispatchToProps(dispatch){
    return{
        doSetNavBook: () => dispatch(doSetNavBook())
    }
};

// export default Book;
export default connect(mapStateToProps, mapDispatchToProps)(Book);