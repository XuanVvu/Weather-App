import axios from 'axios';
import React, { Fragment, useState, useEffect, createContext } from 'react';
import { Container, Row, Col } from 'reactstrap';

import LeftContent from './LeftContent';
import RightContent from './RightContent';

const API_KEY = 'b72ab10255e1b8706a607546a3537c9b';

export const currentWeatherContext = createContext();

const Layout = () => {
    const [nameLocation, setNameLocation] = useState('Hanoi');
    const [currentWeather, setCurrentWeather] = useState();
    const [forecastWeather, setForecastWeather] = useState();
    const handleChangeSearch = (name) => {
        setNameLocation(name);
    };

    useEffect(() => {
        const fetchData = async () => {
            let resDataCurrentWeather = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${nameLocation}&appid=${API_KEY}&units=metric`,
            );
            let resForeCastWeather = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${nameLocation}&appid=${API_KEY}&units=metric`,
            );
            setCurrentWeather(resDataCurrentWeather.data);
            setForecastWeather(resForeCastWeather.data.list);
        };
        fetchData();
    }, [nameLocation]);

    return (
        <Fragment>
            <Container>
                <currentWeatherContext.Provider value={{ currentWeather, forecastWeather }}>
                    <Row>
                        <Col lg="3 " className=" p-0">
                            {currentWeather && (
                                <LeftContent onChangeSearch={handleChangeSearch} currentWeather={currentWeather} />
                            )}
                        </Col>

                        <Col lg="9" className="p-0">
                            <RightContent />
                        </Col>
                    </Row>
                </currentWeatherContext.Provider>
            </Container>
        </Fragment>
    );
};

export default Layout;
