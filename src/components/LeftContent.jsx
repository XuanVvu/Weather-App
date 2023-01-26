import React, { Fragment, useState } from 'react';
import '../scss/index.scss';
import { Input } from 'reactstrap';

const LeftContent = ({ currentWeather, onChangeSearch }) => {
    const dateBuilder = (d) => {
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let day = days[d.getDay()];
        let hour = d.getHours();
        let minute = d.getMinutes();

        return ` ${day}, ${hour} : ${minute}`;
    };
    const [searchData, setSearchData] = useState();
    const handleChangeLocation = (e) => {
        setSearchData(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            // setSearchData(e.target.value);
            onChangeSearch(searchData);
        }
    };

    return (
        <Fragment>
            <div className="left__content__wrapper p-4">
                <div className="search__box">
                    <Input
                        placeholder="Search"
                        value={searchData}
                        onChange={handleChangeLocation}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                <div className="display__content">
                    <img className="pt-3" src="https://react-weather-app-762e5.web.app/img/Clouds.png" alt="" />
                    <h2 className="location__name fs-2">{currentWeather.name}</h2>
                    <h2 className="temp_c fs-1">{currentWeather.main.temp}°C</h2>
                    <div className="time fs-5">{dateBuilder(new Date())}</div>
                    <div className="clouds__description fs-6 ">
                        {currentWeather.weather[0].description}
                        <br></br>
                        {currentWeather.weather[0].main} {currentWeather.clouds.all}%
                    </div>
                    <div className="mt-3 sub__bg d-flex justify-content-center align-items-center">
                        <div className="sub__title fs-3 fw-bold text-white">{currentWeather.name}</div>
                        <img
                            src="https://us.123rf.com/450wm/macrovector/macrovector1805/macrovector180500152/100615959-weather-forecast-web-page-with-heavy-rain-on-dark-cloudy-day-with-people-under-umbrellas-vector-illu.jpg?ver=6"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default LeftContent;
