import React, { Fragment, useContext, useRef, useState } from 'react';
import { Row, Col } from 'reactstrap';
import ForecastDay from '../components/ForecastDay';
import { currentWeatherContext } from '../components/Layout';

import '../scss/index.scss';

const Data = [
    {
        title: 'Mon, 10/1',
        url: 'https://openweathermap.org/img/w/10d.png',
        temp_c: '17° - 22°',
    },
    {
        title: 'Mon,11/1',
        url: 'https://openweathermap.org/img/w/04d.png',
        temp_c: '17° - 22°',
    },
    {
        title: 'Mon, 12/1',
        url: 'https://openweathermap.org/img/w/04d.png',
        temp_c: '17° - 22°',
    },
    {
        title: 'Mon, 13/1',
        url: 'https://openweathermap.org/img/w/04d.png',
        temp_c: '17° - 22°',
    },
    {
        title: 'Mon, 14/1',
        url: 'https://openweathermap.org/img/w/04d.png',
        temp_c: '17° - 22°',
    },
];

const Week = () => {
    const { forecastWeather } = useContext(currentWeatherContext);
    let day = new Date();

    const add0 = (num) => {
        if (num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    };
    let d = add0(day.getDate());
    let m = add0(day.getMonth() + 1);
    let y = add0(day.getFullYear());

    let forecastWeatherDay = [];
    if (forecastWeather) {
        for (let i = 0; i < 5; i++) {
            forecastWeatherDay[i] = forecastWeather.filter((item) => {
                return item.dt_txt.includes(`${y}-${m}-${d + i}`);
            });
        }
    }

    const tempC_max = [];

    for (let i = 0; i < forecastWeatherDay.length; i++) {
        tempC_max[i] = forecastWeatherDay[i][0].main.temp_max;
        for (let j = 1; j < forecastWeatherDay[i].length; j++) {
            if (forecastWeatherDay[i][j].main.temp_max > tempC_max[i]) {
                tempC_max[i] = forecastWeatherDay[i][j].main.temp_max;
            }
        }
    }
    console.log(tempC_max);

    const [appState, ChangeState] = useState({
        activeObject: null,
        objects: [...Data],
    });
    const [dataItem, setDataItem] = useState(null);

    const toggleActive = (index, item) => {
        ChangeState({ ...appState, activeObject: appState.objects[index] });
        setDataItem(item);
    };

    const toggleActiveStyles = (index) => {
        if (appState.objects[index] === appState.activeObject) {
            return 'week__item p-2 active__week';
        } else {
            return 'week__item p-2 inactive__week';
        }
    };
    return (
        <Fragment>
            <div className="week__wrapper">
                <Row>
                    <div className="week__inner d-flex flex-wrap">
                        {Data.map((item, index) => (
                            <ForecastDay
                                className={toggleActiveStyles(index)}
                                index={index}
                                data={item}
                                onClick={() => toggleActive(index, item)}
                            />
                        ))}
                    </div>
                </Row>
                {dataItem && (
                    <div className="week__infor h-100 p-2 my-5">
                        <p className="title fs-5 text-muted">{dataItem.title}</p>
                        <Row>
                            <Col lg="6">
                                <p className="fs-6 text-muted">Temp current : 21.1 °C</p>
                                <p className="fs-6 text-muted">Temp : 17.43 °C - 23.17 °C</p>
                                <p className="fs-6 text-muted">Humidity : 58 %</p>
                                <p className="fs-6 text-muted">Wind speed : 10.62 km/h</p>
                            </Col>

                            <Col lg="6">
                                <p className="fs-6 text-muted">Sunrise : 6:35 am</p>
                                <p className="fs-6 text-muted">Sunset : 5:31 pm</p>
                                <p className="fs-6 text-muted">Description : overcast clouds</p>
                                <p className="fs-6 text-muted">Atmospheric pressure : 1019 hPa</p>
                            </Col>
                        </Row>
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default Week;
