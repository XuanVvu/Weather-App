import React, { useState, useRef } from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../scss/index.scss';

const ForecastDay = ({ className, index, data, onClick }) => {
    return (
        <Col lg="4" className="p-1">
            <div className={className} key={index} onClick={onClick}>
                <p className="fs-6 text-black-50">{data.title}</p>
                <div className="week__item__content text-center">
                    <img src={data.url} alt="" />
                    <p className="fs-6 fw-bold text-muted">{data.temp_c}</p>
                </div>
            </div>
        </Col>
    );
};

export default ForecastDay;
