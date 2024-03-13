import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import about_image from "../static/about_image.png"

const About = () => {
    return (
        <Container className="mt-4">
            <Container style={{backgroundColor: "rgb(255,255,255,0.9)", borderRadius: "40px", minHeight: "30rem", minWidth: "70rem"}} className="p-5 w-75">

                <Row className="p-3 d-flex gap-2 align-items-center">
                    <Col md={7} className="d-flex flex-column ">
                        <p>Добро пожаловать в AsianHouse!</p>

                        <p>Мы являемся современным рестораном азиатской кухни, предлагающим неповторимый опыт вкусовых наслаждений.
                            Наша страсть к гастрономии вдохновляет нас создавать блюда, которые сочетают традиции азиатской кухни с современными тенденциями.</p>
                        <p> Мы стремимся предложить нашим гостям уникальные и аутентичные блюда, приготовленные с использованием только свежих и качественных ингредиентов.</p>
                        <p>   Мы гордимся тем, что предлагаем широкий выбор блюд, от классических японских суши и роллов до пикантных китайских лапш и вьетнамских фирменных супов. У нас есть что-то для каждого гурмана, независимо от их предпочтений и диетических ограничений.</p>
                        <p> AsianHouse - это место, где вы можете провести приятное время с семьей и друзьями, насладиться изысканной атмосферой и нашими вкусными блюдами. Мы стремимся создавать незабываемые впечатления для каждого гостя, и ваше удовлетворение - наша главная цель.</p>

                        <p> Присоединяйтесь к нам в AsianHouse и позвольте нам порадовать вас своим гостеприимством и великолепной азиатской кухней!</p>
                    </Col>
                    <Col md={3} className="d-flex flex-column gap-5">
                        <img src={about_image} alt="about" width={600}/>
                    </Col>
                </Row>



            </Container>

        </Container>

    );
};

export default About;