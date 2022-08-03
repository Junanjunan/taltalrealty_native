const ClipboardParams = `
    ${address ? `주소: ${props.route.params.address},\n` : ""}
    ${room ? `방: ${props.route.params.room},\n` : ""}
    ${bath ? `화장실: ${props.route.params.bath ? props.route.params.bath : 0},\n` : ""}
    ${price ? `매매가: ${props.route.params.price}만원,\n` : ""}
    ${deposit ? `보증금: ${props.route.params.deposit ? props.route.params.deposit : 0}만원,\n` : ""}
    ${month_fee ? `월세: ${props.route.params.month_fee ? props.route.params.month_fee : 0}만원,\n` : ""}
    ${management_fee ? `관리비: ${props.route.params.management_fee ? props.route.params.management_fee : 0}만원,\n` : ""}
    ${birth ? `준공: ${props.route.params.birth},\n` : ""}
    ${area_m2 ? `전용면적: ${props.route.params.area_m2}㎡,\n` : ""}
    ${total_area_m2 ? `공급면적: ${props.route.params.total_area_m2 ? props.route.params.total_area_m2 : 0}㎡,\n` : ""}
    ${land_m2 ? `대지지분: ${props.route.params.land_m2 ? props.route.params.land_m2 : 0}㎡,\n` : ""}
    ${parking ? `주차: ${props.route.params.parking ? "O" : "X"},\n` : ""}
    ${empty ? `공실: ${props.route.params.empty ? "O" : "X"},\n` : ""}
    ${elevator ? `승강기: ${props.route.params.elevator ? "O" : "X"},\n` : ""}
    ${loan ? `대출: ${props.route.params.loan ? "O" : "X"},\n` : ""}
    ${owner_phone ? `매도인: ${props.route.params.owner_phone ? props.route.params.owner_phone : ""},\n` : ""}
    ${tenant_phone ? `세입자: ${props.route.params.tenant_phone ? props.route.params.tenant_phone : ""},\n` : ""}
    ${description ? `상세설명: ${props.route.params.description ? props.route.params.description : "" },\n` : ""}
`;