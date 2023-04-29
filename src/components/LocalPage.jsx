import React from 'react'
import axios from 'axios';
import { Row, Col, Table } from 'react-bootstrap'
import { useEffect, useState } from 'react';

const LocalPage = () => {
    const [locals, setLocals] = useState([]);

    const getLocal = async () => {
        const url = "https://dapi.kakao.com/v2/local/search/keyword.json";
        const config = {
            headers: { "Authorization": "KakaoAK b979e6aeda07a0907d3501c51b49df61" },
            params: { query: '인하대학교', page: 1, size: 5 }
        }
        const result = await axios.get(url, config);
        console.log(result);
        setLocals(result.data.documents);
    }

    useEffect(() => { //페이지가 렌더링(출력)될때 호출되는 함수
        getLocal();
    }, []); // ,[] 처음에만 실행시켜주기 위해 중괄호 뒤에 추가 

    return (
        <Row>
            <Col>
                <h1 className='text-center my-5'>지역검색</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr className='text-center'>
                            <td>장소명</td>
                            <td>주소</td>
                            <td>전화</td>
                        </tr>
                    </thead>
                    <tbody>
                        {locals.map(local =>
                            <tr key={local.id}>
                                <td>{local.place_name}</td>
                                <td>{local.phone}</td>
                                <td>{local.address_name}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}

export default LocalPage