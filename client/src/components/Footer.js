import React from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBIcon,
    MDBCol,
    MDBRow,
} from 'mdb-react-ui-kit';
import {FaGithub} from "react-icons/fa";
import {Link} from "react-router-dom";
import {ABOUT_ROUTE, MAIN_ROUTE, MENU_ROUTE} from "../utils/consts";

const Footer = () => {
    return (
        <MDBFooter bgColor='dark' className='text-center text-lg-start' style={{marginTop: "180px", color: "#ccc"}} id="footer">
            <section>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <MDBRow className='mt-3 p-4'>
                        <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                <MDBIcon color='secondary' icon='gem' className='me-3' />
                                AsianHouse
                            </h6>
                            <p>
                                Данный проект был разработан в рамках курсового проекта с целью практического применения полученных знаний и навыков.
                            </p>
                        </MDBCol>

                        <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Технологии</h6>
                            <p>
                                    Spring Boot
                            </p>
                            <p>
                                    React
                            </p>
                            <p>
                                    MOBX
                            </p>
                            <p>
                                    React-Bootstrap
                            </p>
                        </MDBCol>

                        <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Навигация</h6>
                            <p>
                                <Link to={MAIN_ROUTE} className='text-reset'>
                                   Главная
                                </Link>
                            </p>
                            <p>
                                <Link to={MENU_ROUTE} className='text-reset'>
                                    Меню
                                </Link>
                            </p>
                            <p>
                                <Link to={ABOUT_ROUTE} className='text-reset'>
                                    О нас
                                </Link>
                            </p>
                        </MDBCol>

                        <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Контакты</h6>
                            <p>
                                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                                eliza.romanova597@gmail.com
                            </p>
                            <p>
                                <a href="https://github.com/monalisssa/asianhouseServer.git" className='text-reset'><FaGithub /> Ссылка на github</a>
                            </p>

                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2023 Copyright: Markiyanova E.A.
            </div>

        </MDBFooter>
    );
};

export default Footer;