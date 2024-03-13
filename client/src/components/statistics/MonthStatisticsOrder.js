import React, {useEffect, useState} from 'react';
import {Line} from "@ant-design/charts";
import {fetchDateOrderStatistics} from "../../http/orderApi";

import {observer} from "mobx-react-lite";

const MonthStatisticsOrder: React.FC = observer(() => {
    const [dates, setDates] = useState([]);

    useEffect(() => {
            fetchDateOrderStatistics().then(data => {
                const transformedData = data.map(obj => {
                    const [date, value] = Object.entries(obj)[0];
                    return {year: date, value};
                });
                setDates(transformedData);
                console.log(data); // Log the updated data instead of 'dates'
            });

    }, []);

    const props = {
        data: dates,
        xField: 'year',
        yField: 'value'
    };

    return  (<div>
        <h4>Статистика заказов за месяц</h4>
        <Line {...props} />
    </div>);
});


export default MonthStatisticsOrder;