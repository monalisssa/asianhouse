
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import React, {useContext, useEffect, useState} from "react";
import NavBar from "./components/NavBar";
import "./styles/main.css"
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {fetchBasketItems} from "./http/basketApi";
import {check} from "./http/userApi";
import Footer from "./components/Footer";
import {Spinner} from "react-bootstrap";

const App = observer(() =>{

    const [modalBasketShow, setModalBasketShow] = useState(false);
    const [isServerAvailable, setIsServerAvailable] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {user, basket} = useContext(Context)
    const handleModalBasketShowChange = (value) => {
        setModalBasketShow(value);
    };
    useEffect(() => {
        
        setIsLoading(true)
        check()
            .then(
                    data => {
                if (data !== null) {
                    user.setUser(data)
                    user.setIsAuth(true)
                } else {
                    user.setIsAuth(false)
                }
                  setIsServerAvailable(true)
                        setIsLoading(false)
                    })
            .catch(error => {
                    setIsServerAvailable(false)
                    setIsLoading(false)}
            )
    }, [isServerAvailable, user])

    useEffect(() => {
        if (user.isAuth && isServerAvailable)
        {
            fetchBasketItems(user.user.user_id).then(data => {
                basket.setBasketItems(data);
            })
        }
    }, [basket, isServerAvailable, user]);

  return (
      <BrowserRouter>

          {
              isLoading  ?

              <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
              </Spinner>
                  :
                  <>

                  {
                      isServerAvailable ?
                  <>

                      <NavBar setModalBasketShow={handleModalBasketShowChange}/>
                      <AppRouter modalBasketShow = {modalBasketShow} setModalBasketShow={handleModalBasketShowChange}/>
                      <Footer/>
                  </>
                          :
                          <div style={{backgroundColor: "white"}}>
                              <h5>
                                  Ошибка подключения к серверу....
                              </h5>
                          </div>
                  }
                  </>

}
      </BrowserRouter>
  );
})

export default App;
