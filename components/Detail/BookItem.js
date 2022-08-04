import React from "react";
import { Container, ScrollContainer, Div, BindingDiv, Item, Text, TextLong, PhoneText, PhoneTextView, Des, DetailTO, DetailShareTO, DetailTODelete, DetailTOText, DetailTODiv } from "./Detail";
import { EmptyCheckboxStyle, ShareCheckboxStyle } from "./Creating";
import Checkbox from "expo-checkbox";
import CallAndSms from "./CallAndSms";


export const Address = (props) => {
    return(
        <BindingDiv onPress={() => props.setState(!props.state)}>
            <Checkbox style={ShareCheckboxStyle} value={props.state}/>
            <Item>주 소</Item><Text>{props.item}</Text>
        </BindingDiv>
    );
};

export const Updated = (props) => {
    return(
        <Div>
            <Checkbox style={EmptyCheckboxStyle} value={props.state}/>
            <Item>확인일</Item><Text>{props.item}</Text>
        </Div>
    );
};

export const Room = (props) => {
    return(
        <BindingDiv onPress={() => props.setState(!props.state)}>
            <Checkbox style={ShareCheckboxStyle} value={props.state}/>
            <Item>방</Item><Text>{props.item}</Text>
        </BindingDiv>
    );
};

export const Bath = (props) => {
    return(
        <BindingDiv onPress={() => props.setState(!props.state)}>
            <Checkbox style={ShareCheckboxStyle} value={props.state}/>
            <Item>화장실</Item><Text>{props.item}</Text>
        </BindingDiv>
    );
};

export const Price = (props) => {
    return(
        <BindingDiv onPress={() => props.setState(!props.state)}>
            <Checkbox style={ShareCheckboxStyle} value={props.state}/>
            <Item>매매가</Item><Text>{props.item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}만원</Text>
        </BindingDiv>
    );
};

export const Deposit = (props) => {
    return(
        <BindingDiv onPress={() => props.setState(!props.state)}>
            <Checkbox style={ShareCheckboxStyle} value={props.state}/>
            <Item>보증금</Item><Text>{props.item ? props.item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}만원</Text>
        </BindingDiv>
    );
};

export const MonthFee = (props) => {
    return(
        <BindingDiv onPress={() => props.setState(!props.state)}>
            <Checkbox style={ShareCheckboxStyle} value={props.state}/>
            <Item>월 세</Item><Text>{props.item ? props.item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}만원</Text>
        </BindingDiv>
    );
};

export const ManagementFee = (props) => {
    return(
        <BindingDiv onPress={() => props.setState(!props.state)}>
            <Checkbox style={ShareCheckboxStyle} value={props.state}/>
            <Item>관리비</Item><Text>{props.item ? props.item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}만원</Text>
        </BindingDiv>
    );
};

export const Birth = (props) => {
    return(
        <BindingDiv onPress={() => props.setState(!props.state)}>
            <Checkbox style={ShareCheckboxStyle} value={props.state}/>
            <Item>준 공</Item><Text>{props.item}</Text>
        </BindingDiv>
    );
};


export const AreaM2 = (props) => {
    return(
        <BindingDiv onPress={() => props.setState(!props.state)}>
            <Checkbox style={ShareCheckboxStyle} value={props.state}/>
            <Item>전용면적</Item><Text>{props.item}㎡</Text>
        </BindingDiv>
    );
};

export const TotalAreaM2 = (props) => {
    return(
        <BindingDiv onPress={() => props.setState(!props.state)}>
            <Checkbox style={ShareCheckboxStyle} value={props.state}/>
            <Item>공급면적</Item><Text>{props.item}㎡</Text>
        </BindingDiv>
    );
};

export const LandM2 = (props) => {
    return(
        <BindingDiv onPress={() => props.setState(!props.state)}>
            <Checkbox style={ShareCheckboxStyle} value={props.state}/>
            <Item>대지지분</Item><Text>{props.item}㎡</Text>
        </BindingDiv>
    );
};

export const Parking = (props) => {
    return(
        <BindingDiv onPress={() => props.setState(!props.state)}>
            <Checkbox style={ShareCheckboxStyle} value={props.state}/>
            <Item>주 차</Item><Text>{props.item ? "O" : "X"}</Text>
        </BindingDiv>
    );
};

export const Empty = (props) => {
    return(
        <BindingDiv onPress={() => props.setState(!props.state)}>
            <Checkbox style={ShareCheckboxStyle} value={props.state}/>
            <Item>공 실</Item><Text>{props.item ? "O" : "X"}</Text>
        </BindingDiv>
    );
};

export const Elevator = (props) => {
    return(
        <BindingDiv onPress={() => props.setState(!props.state)}>
            <Checkbox style={ShareCheckboxStyle} value={props.state}/>
            <Item>승강기</Item><Text>{props.item ? "O" : "X"}</Text>
        </BindingDiv>
    );
};

export const Loan = (props) => {
    return(
        <BindingDiv onPress={() => props.setState(!props.state)}>
            <Checkbox style={ShareCheckboxStyle} value={props.state}/>
            <Item>대 출</Item><Text>{props.item ? "O" : "X"}</Text>
        </BindingDiv>
    );
};

export const OwnerPhone = (props) => {
    return(
        <>
        <BindingDiv onPress={() => props.setState(!props.state)}>
            <Checkbox style={ShareCheckboxStyle} value={props.state}/>
            <Item>집주인</Item>
            <PhoneTextView><PhoneText>{props.item}</PhoneText></PhoneTextView>
        </BindingDiv>
        <CallAndSms href={props.item}/>
        </>
    );
};

export const TenantPhone = (props) => {
    return(
        <>
        <BindingDiv onPress={() => props.setState(!props.state)}>
            <Checkbox style={ShareCheckboxStyle} value={props.state}/>
            <Item>세입자</Item>
            <PhoneTextView><PhoneText>{props.item}</PhoneText></PhoneTextView>
        </BindingDiv>
        <CallAndSms href={props.item}/>
        </>
    );
};

export const Description = (props) => {
    return(
        <BindingDiv onPress={() => props.setState(!props.state)}>
            <Checkbox style={ShareCheckboxStyle} value={props.state}/>
            <Item>상세설명</Item>
            <Des>{props.item}</Des>
        </BindingDiv>
    );
};

export const NotFinished = (props) => {
    return(
        <BindingDiv>
            <Checkbox style={EmptyCheckboxStyle} value={props.state}/>
            <Item>진행매물</Item>
            <Text>{props.item ? "O" : "X"}</Text>
        </BindingDiv>
    );
};

export const Naver = (props) => {
    return(
        <BindingDiv>
            <Checkbox style={EmptyCheckboxStyle} value={props.state}/>
            <Item>네이버</Item>
            <Text>{props.item ? "O" : "X"}</Text>
        </BindingDiv>
    );
};

export const Dabang = (props) => {
    return(
        <BindingDiv>
            <Checkbox style={EmptyCheckboxStyle} value={props.state}/>
            <Item>다 방</Item>
            <Text>{props.item ? "O" : "X"}</Text>
        </BindingDiv>
    );
};

export const Zicbang = (props) => {
    return(
        <BindingDiv>
            <Checkbox style={EmptyCheckboxStyle} value={props.state}/>
            <Item>직 방</Item>
            <Text>{props.item ? "O" : "X"}</Text>
        </BindingDiv>
    );
};

export const Peterpan = (props) => {
    return(
        <BindingDiv>
            <Checkbox style={EmptyCheckboxStyle} value={props.state}/>
            <Item>피터팬</Item>
            <Text>{props.item ? "O" : "X"}</Text>
        </BindingDiv>
    );
};


export const FloorTop = (props) => {
    return(
        <BindingDiv onPress={() => props.setState(!props.state)}>
            <Checkbox style={ShareCheckboxStyle} value={props.state}/>
            <Item>지상층</Item><Text>{props.item}</Text>
        </BindingDiv>
    );
};

export const FloorBottom = (props) => {
    return(
        <BindingDiv onPress={() => props.setState(!props.state)}>
            <Checkbox style={ShareCheckboxStyle} value={props.state}/>
            <Item>지하층</Item><Text>{props.item}</Text>
        </BindingDiv>
    );
};

export const LandType = (props) => {
    return(
        <BindingDiv onPress={() => props.setState(!props.state)}>
            <Checkbox style={ShareCheckboxStyle} value={props.state}/>
            <Item>토지종류</Item><Text>{props.item}</Text>
        </BindingDiv>
    );
};

export const LandM2Building = (props) => {
    return(
        <BindingDiv onPress={() => props.setState(!props.state)}>
            <Checkbox style={ShareCheckboxStyle} value={props.state}/>
            <Item>토지면적</Item><Text>{props.item}㎡</Text>
        </BindingDiv>
    );
};

export const ParkingNumber = (props) => {
    return(
        <BindingDiv onPress={() => props.setState(!props.state)}>
            <Checkbox style={ShareCheckboxStyle} value={props.state}/>
            <Item>주차대수</Item><Text>{props.item}대</Text>
        </BindingDiv>
    );
};

export const BuildingAreaM2 = (props) => {
    return(
        <BindingDiv onPress={() => props.setState(!props.state)}>
            <Checkbox style={ShareCheckboxStyle} value={props.state}/>
            <Item>건축면적</Item><Text>{props.item}㎡</Text>
        </BindingDiv>
    );
};

export const TotalFloorAreaM2 = (props) => {
    return(
        <BindingDiv onPress={() => props.setState(!props.state)}>
            <Checkbox style={ShareCheckboxStyle} value={props.state}/>
            <Item>연면적</Item><Text>{props.item}㎡</Text>
        </BindingDiv>
    );
};

export const TotalFloorAreaM2ForRatio = (props) => {
    return(
        <BindingDiv onPress={() => props.setState(!props.state)}>
            <Checkbox style={ShareCheckboxStyle} value={props.state}/>
            <Item>연면적 (용적률)</Item><Text>{props.item}㎡</Text>
        </BindingDiv>
    );
};

export const BuildingCoverage = (props) => {
    return(
        <BindingDiv onPress={() => props.setState(!props.state)}>
            <Checkbox style={ShareCheckboxStyle} value={props.state}/>
            <Item>건폐율</Item><Text>{props.item}%</Text>
        </BindingDiv>
    );
};

export const FloorAreaRatio = (props) => {
    return(
        <BindingDiv onPress={() => props.setState(!props.state)}>
            <Checkbox style={ShareCheckboxStyle} value={props.state}/>
            <Item>용적률</Item><Text>{props.item}%</Text>
        </BindingDiv>
    );
};