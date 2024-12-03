'use client'
import React, { useRef, useEffect,useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';



const DataVizTemplate = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://public.flourish.studio/resources/embed.js';
    script.async = true;
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const videoRef = useRef<HTMLVideoElement>(null);
  const venuesRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [venuesStart, setVenuesStart] = useState(0);

  // Calcular la posición inicial de la sección "Venues"
  useEffect(() => {
    const handleResize = () => {
      if (venuesRef.current) {
        const rect = venuesRef.current.getBoundingClientRect();
        setVenuesStart(window.scrollY + rect.top);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const videoDuration = 60; // Duración del video en segundos
  const scrollRange = 12000; // Ajusta este rango según el efecto deseado

  // Mapear el scroll al progreso del video
  const videoTime = useTransform(
    scrollY,
    [venuesStart, venuesStart + scrollRange],
    [0, videoDuration]
  );

  useEffect(() => {
    const unsubscribe = videoTime.on('change', (currentTime) => {
      if (videoRef.current) {
        videoRef.current.currentTime = currentTime;
      }
    });

    return () => unsubscribe();
  }, [videoTime]);

  return (
    <div className="px-[20px] mx-auto grid grid-cols-12 gap-x-5">
      <header>
        {/* Barra de navegación */}
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 col-span-12">
          <div className="container mx-auto flex items-center justify-between py-4 px-8">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="Logo" width={80} height={80} />
            </div>

            {/* Menú */}
            <div className="flex space-x-8 text-[#232324] text-lg">
              <a href="#home" className="hover:text-[#FF6054] hover:font-semibold">Home</a>
              <a href="#venues" className="hover:text-[#FF6054] hover:font-semibold">Venues</a>
              <a href="#infraestructura" className="hover:text-[#FF6054] hover:font-semibold">Infraestructura</a>
              <a href="#audiencia" className="hover:text-[#FF6054] hover:font-semibold">Audiencia</a>
              <a href="#economia" className="hover:text-[#FF6054] hover:font-semibold">Economía</a>
            </div>
          </div>
        </nav>
      </header>

      <main className="col-span-12">

        {/* Sección 1 */}
        <section id="home" className="flex flex-col justify-center items-center text-center col-span-12 mt-32">
          <div style={{ width: '1100px', height: '500px' }} className="flex items-center justify-center mt-12">
            {/* Video inserción */}
            <video 
              src="/Paris2024Animacion.mp4" 
              style={{ width: '800PX', height: '800PX' }} 
              autoPlay 
              loop 
              muted 
              controls={false} 
            />
          </div>

           {/* FOTO <div style={{ width: '1100px', height: '500px' }} className="flex items-center justify-center mt-12">
            <img src="/paris2024.svg" alt="SVG Image" style={{ width: '110%', height: '110%' }} />
          </div>*/}
          
          <p className="text-[#232324] font-semibold mt-24">
            JUEGOS OLÍMPICOS
          </p>

        </section>

        {/* Sección 2 */}
        <section className="flex flex-col justify-center items-center text-center col-span-6 mt-64">
          <h1 className="text-6xl text-[#232324] font-bold">Los anillos</h1> 
          <div style={{ width: '600px', height: '600px' }} className='mt-0'>
            <img src="/aros.svg" alt="" style={{ width: '100%', height: '100%' }} />
          </div>
          <p className="text-3xl text-[#232324] font-bold">El impacto de los Juegos Olímpicos <br/> en París basado en 5 factores</p> 
        </section>

        {/* Sección 3 */}
        <section className="flex flex-col justify-center items-center text-center col-span-8 mt-24">
          <h1 className="text-6xl mb-2 text-[#232324] font-bold">¿Espectáculo o deporte?</h1>
          <h2 className="text-2xl mb-2 text-[#232324] font-normal mt-2">
            ¿Por qué millones siguen los Juegos Olímpicos?
          </h2>

        <div style={{ width: '50%', height: '50%' }} className='mt-24'>
        <div className="flourish-embed flourish-chart" data-src="visualisation/19289043"></div>
        </div>
      
        </section>

        {/* Sección 4 */}
        <section className="flex flex-col justify-center items-center text-center col-span-12 mt-24">
          <h1 className="text-6xl mb-2 text-[#232324] font-bold">Fanáticos en foco</h1>
          <h2 className="text-3xl mb-2 text-[#232324] font-normal mt-2 mb-16">¿Quiénes siguen el espectáculo?</h2>

          <div className='mt-0 mb-0' style={{ width: '50%', height: '50%' }} >
        
        <div className="flourish-embed flourish-chart" data-src="visualisation/19344356"></div>
        <div className="flourish-embed flourish-chart" data-src="visualisation/19344083"></div>
        <div className="flourish-embed flourish-chart" data-src="visualisation/19344156"></div>
        <div className="flourish-embed flourish-chart" data-src="visualisation/19344344"></div>
        
        </div>

        </section>

        {/* Sección 5 */}
        <section className="flex flex-col justify-center items-center text-center col-span-4 mt-12 mb-20">
          <h2 className="text-5xl mb-2 text-[#232324] font-bold mt-24">Más de 500.000 <br /> espectadores</h2>
          <p className="text-lg mb-2 text-[#232324] font-normal mt-4">En la ceremonia de apertura</p>
          <div style={{ width: '600px', height: '300px' }} className="mt-12 mb-4">
            <img src="/VENUE.svg" alt="" style={{ width: '100%', height: '100%' }} />
          </div>
          <h1 className="text-4xl mb-2 text-[#232324] font-semibold mt-12">Entradas vendidas</h1>
          <h2 className="text-3xl mb-2 text-[#232324] font-normal mt-2">8.8 Millones</h2>
          <p className="text-lg mb-2 text-[#232324] font-normal mt-2 mx-80">
            A partir de julio de 2024, el Comité Organizador de París anunció una venta récord de 8,8 millones de entradas para los Juegos Olímpicos de 2024, superando el máximo anterior de 8,3 millones establecido durante los Juegos de Atlanta 1996
          </p>
        </section>

        {/* Video que se controla con scroll y Sección 6 */}

        <div className="grid grid-cols-12 gap-5 h-[150vh] mt-32">
          
          {/* Sección 6 - ocupa las primeras 8 columnas */}
          
          <section className="col-span-6">
           
            {/* seccion Venues */}
            <section ref={venuesRef} id="venues" className="flex flex-col justify-left items-left text-left col-span-12 mt-64 ml-16">
              <h1 className="text-7xl text-[#D98795] font-bold">Venues</h1>
              
              <h2 className="text-3xl mb-2 text-[#232324] font-normal mt-8">Capacidad total de espectadores</h2>
              <h3 className="text-4xl mb-2 text-[#D98795] font-semibold mt-2">300.000 a 800.000</h3>
              <div className= "flex flex-col justify-left items-left mt-24">
                <p className="text-3xl mb-6 text-[#232324] font-semibold text-left ">Espectadores diarios</p>
                <p className="text-lg mb-2 text-[#232324] font-normal mt-2 text-left">La construcción y modernización de sedes deportivas para los Juegos de París 2024 ha tenido un impacto significativo en la ciudad y sus alrededores. Un ejemplo clave es el Centro Acuático Olímpico, situado cerca del Stade de France en Saint-Denis. Esta es la única instalación deportiva permanente construida específicamente para los Juegos y seguirá siendo utilizada después del evento como un centro público para nadadores locales y atletas de élite.</p>

                <div style={{ width: '648px', height: '702px' }} className="mt-12 mb-24 justify-left items-left">
                  <img src="/torreEiffel.png" alt="" style={{ width: '100%', height: '100%' }} />
                </div>
              </div>
            
              <div className= "flex flex-col justify-left items-left mb-24">
                <p className="text-3xl mb-6 text-[#232324] font-semibold text-left"> Modernización </p>
                <p className="text-lg mb-2 text-[#232324] font-normal mt-2 text-left"> Además, varias infraestructuras deportivas existentes fueron renovadas y modernizadas, como el Stade Roland Garros para el tenis y el Arena Bercy para el baloncesto. Estas inversiones han fortalecido la infraestructura deportiva de París, asegurando un legado duradero para el deporte y beneficiando a la comunidad local en el futuro.</p>
                
                <div style={{ width: '300px', height: '300px' }} className= "mb-40 mx-40 mt-12" >
                <div className="flourish-embed flourish-chart" data-src="visualisation/19833720"style={{ width: '100%', height: '100%' }}>
                </div>
                </div> 
                 
              </div>

              {/* seccion Villa olimpica */}
              <div className= "flex flex-col justify-left items-left mb-12">
                <p className="text-5xl mb-6 text-[#D98795] font-semibold text-left ">La Villa Olímpica</p>
                <p className="text-xl mb-2 text-[#232324] font-normal mt-2 text-left">Construcción de la Villa Olímpica </p>
                <h3 className="text-3xl mb-2 text-[#232324] font-bold">Edificio en Saint-Denis</h3>
                <p className="text-lg mb-2 text-[#232324] font-normal mt-2 text-left">La Villa Olímpica de los Juegos Olímpicos de París 2024 está ubicada en la región de Saint-Denis, al norte de París. Este proyecto no solo proporcionó infraestructura moderna y sostenible para albergar a los atletas, sino que también revitalizó una zona previamente subdesarrollada. </p>
              </div>
              
              <div className="flex items-left justify-left">
                {/* Contenedor para el texto y el subtítulo */}
                <div>
                  <h1 className="text-3xl text-[#D98795] font-bold"> Saint Denis </h1>
                  <p className="text-lg text-[#232324] font-normal mt-2"> Tras los Juegos, la villa se transformará en viviendas, oficinas y espacios comunitarios, creando nuevas oportunidades económicas y mejorando la calidad de vida local. <br /><br /> Además, la inversión en transporte y servicios ha dejado una infraestructura robusta y accesible que beneficiará a los residentes durante muchos años, reforzando el legado de París como una ciudad verde e inclusiva.</p>
                </div>
              </div>

              <div style={{ width: '684px', height: '359px' }} className="flex mt-12 mb-24 justify-left items-left">
                  <img src="/saintDenis.png" alt="" style={{ width: '100%', height: '100%' }} />
                </div>


              
            </section>
            
           
            {/*seccion Infraestructura*/} 
            <section id="infraestructura" className="flex flex-col justify-left items-left text-left col-span-12 mt-24 ml-16">
                <h1 className="text-6xl text-[#72AFC1] font-bold"> Infraestructura </h1>
               {/*<p className="text-xl text-[#232324] font-normal mt-14"> Modificación de la infraestructura de París </p>*/}

               <div className= "flex flex-col justify-center items-center mt-16">
              <div className='flex flex-col justify-left items-left text-left col-span-12 mt-2'>
                <h2 className="text-3xl mb-2 text-[#232324] font-normal mt-6">Modernización de <span className="font-medium text-[#72AFC1]">Infraestructura</span></h2>
                  <p className="text-lg mb-2 text-[#232324] font-normal mt-2 text-left">Se han renovado y modernizado varias instalaciones deportivas existentes, como el Stade Roland Garros para el tenis y el Arena Bercy para el baloncesto.</p>
                
                </div>
              </div>

              <div className= "flex flex-col justify-left items-left mt-12">
                <p className="text-5xl mb-6 text-[#72AFC1] font-semibold text-left mt-12">Hoteles</p>
                <h2 className="text-3xl mb-2 text-[#232324] font-normal mt-6"> Mejoras en <span className='text-[#72AFC1]'>alojamiento</span><br /> e infraestructuras urbanas </h2>
                <div className="flex items-left justify-left">
                <div>
                  <p className="text-lg text-[#232324] font-normal mt-6"> Durante los Juegos, se han construido nuevos hoteles y modernizado antiguos espacios industriales para convertirlos en alojamientos contemporáneos. Un ejemplo destacado es el proyecto "Îlot Fertile", que combina hospedajes ecológicos con áreas verdes como huertos urbanos, integrando sostenibilidad y eficiencia energética. <br /> <br /> Además, se han llevado a cabo mejoras significativas en las infraestructuras urbanas, incluyendo la expansión de ciclovías y la creación de nuevas zonas peatonales. Estas iniciativas no solo facilitan el acceso a los distintos puntos de interés, sino que también fomentan una movilidad sostenible en la ciudad.</p>
                </div>
              </div>
              <div style={{ width: '605px', height: '384px' }} className="flex mt-12 mb-24 justify-left items-left">
                  <img src="/proyecto.png" alt="" style={{ width: '100%', height: '100%' }} />
                </div>

               </div>

              {/* seccion Transporte publico */}
              <div className= "flex flex-col justify-left items-left mt-12">
                <p className="text-5xl mb-6 text-[#72AFC1] font-semibold text-left mt-12">Transporte</p>
                <h2 className="text-3xl mb-2 text-[#232324] font-normal mt-6"> Mejoras: <span className='text-[#72AFC1]'>Nuevas líneas</span></h2>
                <p className="text-lg mb-2 text-[#232324] font-normal mt-2 text-left">Se han llevado a cabo mejoras significativas en la red de transporte público, incluida la expansión de la <span className='font-semibold'> linea de tren RER B </span>que conecta el aeropuerto Charles de Gaulle con el centro de París y la Villa Olímpica. También se están desarrollando nuevas lineas de metro dentro del proyecto Grand Paris Express, que facilitarán el acceso a los diferentes recintos olímpicos y mejorarán la movilidad en la región. </p>

                <div style={{ width: '609px', height: '490px' }} className="mt-12">
                <img src="\transporte.png" alt="" style={{ width: '100%', height: '100%' }} />
                </div>
              </div>

              {/* seccion Turismo */}
              <div className= "flex flex-col justify-left items-left mt-16 mb-32">
                <p className="text-6xl mb-6 text-[#E84B3B] font-semibold text-left mt-12">Turismo</p>
  
                <h1 className="text-3xl mb-2 text-[#232324] font-normal mt-6">Crecimiento del turismo</h1>
                <p className="text-lg text-[#232324] font-normal text-left mb-12">Generaron ingresos de <span className='font-semibold'>€4 mil millones en gastos turísticos.</span> Estas cifras subrayan el impacto de los Juegos en el crecimiento económico, la mejora de infraestructuras y el legado duradero que dejaron en París y sus alrededores</p>

                <div style={{ width: '500px', height: '300px' }} className="mx-4">
                <img src="\personitas.svg" alt="" style={{ width: '100%', height: '100%' }} />
                </div>

                <h3 className="text-4xl mb-2 text-[#E84B3B] font-semibold mt-0">3 Millones de visitantes</h3>
                <h2 className="text-lg text-[#232324] font-normal text-left mb-12">Adicionales en 2024 </h2>
                
                
                <div style={{ width: '600px', height: '300px' }} className= "mt-12 mb-40">
                   <div className="flourish-embed flourish-pictogram" data-src="visualisation/19831846" style={{ width: '100%', height: '100%' }}></div>
                </div>
              </div>
            </section>

        
            {/*seccion Audiencia*/}
            <section id="audiencia" className="flex flex-col justify-left items-left text-left col-span-12 mt-16 ml-16">

              <h1 className="text-6xl text-[#FFBB00] font-bold mb-6"> Audiencia </h1>  
              
              <div className="flex items-left justify-left">
                    <div>            
                      <h2 className="text-3xl mb-2 text-[#232324] font-normal mt-6">Espectadores Totales <br/> de la Ceremonia de <br/> Apertura (tv) </h2>
                      <h1 className="text-8xl mb-2 text-[#FFBB00] font-bold mt-12">1000</h1>
                      <h3 className="text-3xl mb-2 text-[#FFBB00] font-normal mt-2">Millones</h3>
                      <p className="text-lg text-[#232324] font-normal mt-6"> El alcance global y la visibilidad que recibe el país pueden mejorar su reputación internacional, atrayendo futuras inversiones y turismo.</p>
                      <p className="text-lg text-[#232324] font-normal mt-6">Con el desfile de las delegaciones a lo largo del río Sena, el evento captó la atención tanto de los asistentes presenciales como de millones de personas que lo siguieron a través de transmisiones internacionales. Esta celebración masiva fortaleció la conexión con el público y consolidó la imagen de París como un referente de creatividad e inclusión en el escenario global.</p>
                    </div>
                </div>
          
                <div className= "flex flex-col justify-left items-left mt-24">
                        <p className="text-3xl mb-6 text-[#232324] font-semibold text-left ">La batalla por la audiencia</p>
                        <div style={{ width: '500px', height: '200px' }} className= "mb-80">
                          <div className="flourish-embed flourish-chart" data-src="visualisation/20281431" style={{ width: '100%', height: '100%' }}></div>
                        </div>                   
                </div>

                <div className= "flex flex-col justify-left items-left mt-24">
                      <h1 className="text-lg text-[#232324] font-normal mt-40 mb-4">Se reunieron dos tipos de audiencias:</h1>   
                      <h2 className="text-5xl mb-6 text-[#232324] font-semibold text-left">Física <span className='text-[#FFBB00]'>vs.</span> Digital</h2>  
                      <h3 className="text-3xl mb-2 text-[#232324] font-normal mt-0">Con experiencias muy distintas</h3>    
                      <p className="text-lg text-[#232324] font-normal mt-6 text-left"> Quienes asistieron <span className='text-[#FFBB00] font-semibold'>en persona</span> vivieron la emoción del ambiente, el contacto directo con los atletas y el espectáculo de la ciudad, haciendo de su experiencia algo inolvidable. Al mismo tiempo, las <span className='text-[#FFBB00] font-semibold'>audiencias digitales</span> disfrutaron del evento desde casa, accediendo a contenido exclusivo y personalizado. A través de plataformas en línea, pudieron seguir sus deportes favoritos en tiempo real, interactuar en redes sociales y sentir la conexión con la emoción olímpica a distancia. </p>                                  
                </div>
              
            </section>
        

          {/*seccion Economia*/}
              <section id="economia" className="flex flex-col justify-left items-left text-left col-span-12 mt-64 ml-16">
             
                  <div>            
                  <h1 className="text-6xl text-[#378A7B] font-bold justify-left">Economía</h1> 
                  </div>


            <div className= "flex flex-col justify-left items-left mt-12 mb-24 text-left">
              <p className="text-5xl text-[#232324] font-semibold mb-6">Inversión</p>
              <h1 className="text-lg text-[#378A7B] font-semibold"> La organización de los Juegos Olímpicos 2024 <br />representó una inversión significativa </h1> 
              <p className="text-lg text-[#232324] font-normal mt-6 "> Esta inversión tuvo como objetivo no solo la celebración del evento, sino también el impulso de sectores clave como la construcción, los servicios y el turismo, fortaleciendo la economía de la ciudad y del país. <br /> <br />El impacto económico fue considerable: los Juegos generaron €10.7 mil millones para la economía francesa, con la región de Île-de-France, que incluye a París, recibiendo €5.7 mil millones de esa contribución. </p>  
            </div>


            <div className= "flex flex-col justify-left items-left mt-6 mt-24 mb-24 text-left">
              <p className="text-5xl text-[#232324] font-semibold mb-6">Presupuesto</p>
              <h3 className="text-6xl mb-2 text-[#378A7B] font-semibold mt-6"> €8.8 millones</h3>  
              <h1 className="text-lg text-[#232324] font-semibold mt-6">Total estimado con $3 mil millones de fondos públicos </h1> 
              <p className="text-lg text-[#232324] font-normal mt-4">Estos datos reflejan una inversión significativa que podría impulsar sectores como la construcción, los servicios, y el turismo. Analizar el retorno de esta inversión a través del aumento del PIB, creación de empleos, y la mejora de infraestructuras puede respaldar la hipótesis.</p>  
            </div>    

            <div className= "flex flex-col justify-left items-left mt-6 mt-24 mb-24 text-left">
              <p className="text-5xl text-[#232324] font-semibold mb-6">Ganancia</p>
              <h3 className="text-6xl mb-2 text-[#378A7B] font-semibold mt-6"> €10.700 millones</h3> 
              <p className="text-lg text-[#232324] font-normal mt-6 ">Se espera que los Juegos Olímpicos y Paralímpicos de París 2024 generen una contribución económica de 10.700 millones de euros en Francia, con la región de Île-de-France, donde se encuentra París, recibiendo 5.700 millones de euros.</p>  
            </div>    

            <div className= "flex flex-col justify-left items-left mt-6 mt-24 mb-24 text-left">
              <p className="text-5xl text-[#232324] font-semibold mb-6">Empleo</p>
              <h1 className="text-lg text-[#232324] font-normal mt-6">Se proyecta que el evento creará </h1> 
              <h3 className="text-6xl mb-2 text-[#378A7B] font-bold mt-0">119.000 Empleos</h3>  
              <h1 className="text-lg text-[#232324] font-normal">cada año desde 2024 hasta 2030</h1> 
              <p className="text-lg text-[#232324] font-normal mt-6 ">Esto es debido al impacto a largo plazo de los juegos en el turismo y la economía. Los Juegos Olímpicos impulsarán directamente el turismo, con expectativas de hasta 3 millones de turistas adicionales en 2024, lo que podría sumar hasta 4.000 millones de euros en gastos turísticos.</p>  
            </div>    
            </section>

            {/* Conclusion */}
            <section className="flex flex-col justify-left items-left text-left col-span-12 mt-24 ml-16 mb-64">
            <h1 className="text-6xl text-[#232324] font-bold justify-left">La Ciudad como Escenario</h1> 
            <p className="text-lg text-[#232324] font-normal mt-6 ">París 2024 transformó la ciudad en un mosaico vibrante, donde cada rincón cobró vida gracias al impacto de los Juegos Olímpicos. Desde la construcción de sedes icónicas hasta la modernización de transporte y la revitalización de espacios urbanos, la capital francesa se convirtió en un modelo de innovación y legado sostenible. <br /><br />

            La imagen final de este proyecto no es solo una ciudad llena, sino una ciudad mejorada: un lugar donde la infraestructura, el turismo y la economía se entrelazan para garantizar beneficios duraderos. París no solo fue anfitriona de un evento global; fue protagonista de su propia evolución, dejando una huella que continuará inspirando.</p>
            </section>
          </section>
          
             {/* Video - ocupa las últimas 4 columnas y es sticky */}
             <div className="col-span-6 flex justify-right">
                      <div className="sticky top-1/2 transform -translate-y-1/2 h-[80vh] flex items-start mx-12">
                        <div className="relative" style={{ width: '780px', height: '780px' }}>
                          <motion.video
                            ref={videoRef}
                            className="w-full object-contain"
                            src="\composicion-mapa-paris-cuadrado8.mp4"
                            muted
                            playsInline
                          />
                        </div>
                      </div>
                    </div>

        </div>

      </main>


    </div>

  );
};

export default DataVizTemplate;
