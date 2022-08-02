<>
    <View>
        <CreatingBtn onPress={() => props.navigation.navigate('${Lease}${Villa}Creating')}>
            <Text>매물등록</Text>
        </CreatingBtn>
        <SearchContainer>
            <Div>
                <SearchArticle><SearchTitleText>주소</SearchTitleText><SearchInputAddress value={address} onChangeText={text => setAddress(text)} /></SearchArticle>
                <SearchArticle><SearchTitleText>방</SearchTitleText><SearchInput keyboardType="numeric" value={room} onChangeText={text => setRoom(text)} /></SearchArticle>
            </Div>
            <Div>
                <SearchArticle><SearchTitleText>보증금</SearchTitleText><SearchInput keyboardType="numeric" value={deposit} onChangeText={text => setDeposit(text)} /><Text>만원 이하</Text></SearchArticle>
                <SearchArticle><SearchTitleText>월세</SearchTitleText><SearchInput keyboardType="numeric" value={month_fee} onChangeText={text => setMonth_fee(text)} /><Text>만원 이하</Text></SearchArticle>
            </Div>
            <Div>
                <SearchArticle><SearchTitleText>전용면적</SearchTitleText><SearchInput keyboardType="numeric" value={area_m2} onChangeText={text => setArea_m2(text)} /><Text>㎡ 이상</Text></SearchArticle>
            </Div>
            <Div>
                <SearchArticle>
                    <SearchTitleText>주차</SearchTitleText>
                    <Checkbox style={CheckboxStyle} value={parking} onValueChange={(newValue) => setParking(newValue)}/>
                </SearchArticle>
                <SearchArticle>
                    <SearchTitleText>공실</SearchTitleText>
                    <Checkbox style={CheckboxStyle} value={empty} onValueChange={(newValue) => setEmpty(newValue)}/>
                </SearchArticle>
                <SearchArticle>
                    <SearchTitleText>승강기</SearchTitleText>
                    <Checkbox style={CheckboxStyle} value={elevator} onValueChange={(newValue) => setElevator(newValue)}/>
                </SearchArticle>
                <SearchArticle>
                    <SearchTitleText>대출</SearchTitleText>
                    <Checkbox style={CheckboxStyle} value={loan} onValueChange={(newValue) => setLoan(newValue)}/>
                </SearchArticle>
                <SearchArticle>
                    <SearchTitleText>진행중</SearchTitleText>
                    <Checkbox style={CheckboxStyle} value={not_finished} onValueChange={(newValue) => setNot_finished(newValue)}/>
                </SearchArticle>
            </Div>
            <SearchBtn onPress={() => getSearching()}>
                <SearchBtnText>매물 검색</SearchBtnText>
            </SearchBtn>
        </SearchContainer>
    </View>
    <View>
    <Table borderStyle={TableBorderStyle}>
        <Row 
            data={state.tableHead} 
            widthArr={state.widthArr}
            textStyle={RowTextStyle}
            style={RowHeadStyle}
        />
    </Table>
    </View>
    <ScrollView contentContainerStyle={{alignItems: "center"}}>
        <Table borderStyle={TableBorderStyle}>
            {
                tableData.map((rowData, index) => (
                    <Row 
                        key={index} 
                        data={state.data[index]}
                        style={RowBodyStyle}
                        textStyle={RowTextStyle} 
                        widthArr={state.widthArr}
                        onPress={() => props.navigation.navigate("${Lease}${Villa}Detail", allRows[index] )}
                    />
                ))
            }
        </Table>
    </ScrollView>
</>