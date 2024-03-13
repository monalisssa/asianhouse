import React, {useContext, useEffect, useState} from 'react';
import ReactEcharts from "echarts-for-react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {fetchCategoryOrderStatistics} from "../../http/orderApi";



const UserOrderStatistics = observer(() => {

    const {user} = useContext(Context)
    const [names, setNames] = useState(null);
    const [quantities, setQuantities] = useState(null);
    useEffect(() => {
        fetchCategoryOrderStatistics(user.user.user_id).then( data => {
            setNames(Object.keys(data));
            console.log(names)
            setQuantities(Object.values(data));
        })

    },[])

    const option = {
            xAxis: {
                type: 'category',
                data: names,
                axisLabel: {
                    interval: 0,
                    rotate: 30 //If the label names are too long you can manage this by rotating the label.
                }
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: quantities,
                    type: 'bar'
                }
            ]
        };

    return (

        <ReactEcharts option={option} notMerge={true} />


    );
});

export default UserOrderStatistics;