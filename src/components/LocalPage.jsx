import React from 'react'
import axios from 'axios';
import { Row, Col, Table, Form, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import MapPage from './MapPage';

const LocalPage = () => {
    const [locals, setLocals] = useState([]);
    const [query, setQuery] = useState('인하대학교');
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [is_end, setIs_end] = useState(1);


    const getLocal = async () => {
        const url = "https://dapi.kakao.com/v2/local/search/keyword.json";
        const config = {
            headers: { "Authorization": "KakaoAK b979e6aeda07a0907d3501c51b49df61" },
            params: { query: query, page: page, size: 5 }
        }
        const result = await axios.get(url, config);
        console.log(result);
        setLocals(result.data.documents);
        setTotal(result.data.meta.pageable_count)
        setIs_end(result.data.meta.is_end);
    }

    useEffect(() => { //페이지가 렌더링(출력)될때 호출되는 함수
        getLocal();
    }, [page]); // ,[] 처음에만 실행시켜주기 위해 중괄호 뒤에 추가 

    const onSearch = (e) => {
        e.preventDefault();
        getLocal();
    }

    return (
        <Row>
            <Row>
                <Col>
                    <h1 className='text-center my-5'>지역검색</h1>
                    <Row className='my-2'>
                        <Col md={3} xs="6">
                            <Form onSumbit={onSearch}>
                                <Form.Control value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder='검색어' />
                            </Form>
                        </Col>
                        <Col> 검색수 : {total} 건</Col>
                    </Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr className='text-center'>
                                <td>장소명</td>
                                <td>주소</td>
                                <td>전화</td>
                                <td>위치</td>
                            </tr>
                        </thead>
                        <tbody>
                            {locals.map(local =>
                                <tr key={local.id}>
                                    <td>{local.place_name}</td>
                                    <td>{local.phone}</td>
                                    <td>{local.address_name}</td>
                                    <td><MapPage local={local}/></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <div className='text-center my-2'>
                        <Button
                            disabled={page==1}
                            onClick={() => setPage(page - 1)}>이전</Button>
                        <span className='mx-3'>{page}</span>
                        <Button 
                            disabled={is_end}
                            onClick={() => setPage(page + 1)}>다음</Button>
                    </div>
                </Col>
            </Row>
        </Row>
    )
}

export default LocalPage