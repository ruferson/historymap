import React, { useState, useEffect } from 'react';
import './styles.css';
import mockmapa1 from '../../mocks/map-1.json';
import mocktexto from '../../mocks/texto-1.json'
import Evento from '../../components/Evento';
import Mapa from '../../components/Mapa';
import { useLocation } from 'wouter';
import Compartir from '../../components/Compartir';
import Footer from '../../components/Footer';
import useMapa from 'hooks/useMapa';

function Ver(props) {

    const [mapaID, setMapaID] = useState(props.params.id)
    const [location, setLocation] = useLocation();
    const [marcadorID, setMarcadorID] = useState(0);
    const [noClicked, setNoClicked] = useState(true);
    const [tipo, setTipo] = useState("");
    const { mapaDatos, loading } = useMapa(mapaID);
    const [evento, setEvento] = useState(null)

    if (localStorage.getItem("isLoggedIn") === "false") {
        setLocation("/session")
    }

    //useEffect(() => {setMapaID(props.params.id)}, [props.params.id]);

    function cambiarMarcador(event){
        setNoClicked(false);
        setTipo(event.target.options.tipo)
        setMarcadorID(event.target.options.id);
    }

    console.log(mapaID)

    return (<>{ !loading ?
        <div className="pl-4 pr-4 pt-3 text-white">
            <div className="">
                {<Compartir mapName={mapaDatos.data.nombre} mapaID={mapaID}></Compartir>}
                <h1>{mapaDatos.data.nombre}</h1> <br />
                <div className="">
                    <Mapa cambiarMarcador={cambiarMarcador} crear={false} id={mapaID} evento={evento}></Mapa>
                </div> <br/>
                <div className="">
                    <Evento id={marcadorID} tipo={tipo} noClicked={noClicked} setEvento={setEvento}></Evento>
                </div>
            </div>
            <br/>
        </div>
         : <></>}
        <Footer/>
        </>

    );
}

export default Ver;