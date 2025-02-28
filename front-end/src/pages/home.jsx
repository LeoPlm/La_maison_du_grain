import { Link } from "react-router-dom"
import '../styles/home.css'
import { Carousel, Container } from "react-bootstrap"

export const Home = () => {
    const img = [
        "/img/carroussel/coffee-roasting-1.jpg",
        "/img/carroussel/coffee-roasting-2.jpg",
        "/img/carroussel/man.jpg"
    ]

    return (
        <div className="text-center">
            <h2 className="mt-4 fs-6 p-2 bg-brown-light d-inline-block rounded cinzel fw-bold">ARTISANTS TORREFACTEURS</h2> 

            <Carousel>
                {img.map((image,i) =>(
                    <Carousel.Item key={i}>
                    <img src={image} alt={`coffee roasting ${i}`} className="mt-4 carroussel-homepage" />
                </Carousel.Item>
                ))}
            </Carousel>

            
            <Container className="col-xl-8">
                <div className="d-inline-block bg-brown-light rounded mt-5">
                    <h2 className="rounded rounded-lg p-2 d-inline-block bg-brown-dark mt-4 border-0">
                        <Link to={"/articlesview"} className="custom-hover text-dark"> 
                            <span>DECOUVRIR NOS CAFES</span> <i class="bi bi-arrow-right"></i>
                        </Link>
                    </h2>

                    <div className="text-start ms-2 mt-3">
                        <h3 className="fs-6 fw-bold mb-0"><i class="bi bi-globe-europe-africa"></i> Une chaîne de production éthique</h3>
                        <p className="fs-6 mt-0">
                            Des partenariats équitables, soutenant le producteur et l'écologie
                        </p>

                        <h3 className="fs-6 fw-bold mb-0"><i class="bi bi-fire"></i> Torréfaction artisanale</h3>
                        <p className="fs-8">
                            Notre savoir-faire local vous garanti un grain de café sans 
                            compromis et brulé dans la tradition.
                        </p>
                        
                        <h3 className="fs-6 fw-bold mb-0"><i class="bi bi-cup-hot-fill"></i> Une qualité exceptionnelle</h3>
                        <p className="fs-6">
                            Forts de notre savoir-faire et de notre expérience dans l’art
                            du café, nous avons parcouru le monde à la recherche des
                            meilleurs grains afin de vous offrir une expérience unique.
                        </p>
                    </div>
                </div>
            </Container>

            <Container className="col-xl-9">
                <div className="bg-sand mt-5 w-100 ">
                    <div className="d-inline-block bg-brown-light w-75 mt-3 p-3 width-custom-home mb-4 ">
                        <h3 className="fw-bold fs-6 mt-3">La Maison du Grain</h3>
                        <h4 className="fs-6 text-brown">Pourquoi notre café est unique au monde ?</h4>
                        <p className="text-start">•Nos grain sont rigoureusement sélectionnés.
                        Les cerises de café sont récoltées manuellement à 
                        maturité, puis séchées au soleil afin de révéler le
                        terroir d'origine et la palette aromatique associée.
                        Nous travaillons main dans la main avec les 
                        coopératives partenaires pour proposer des 
                        dégustations riches en saveurs et de qualité 
                        constante.</p>
                        <p className="text-start">• Nos grains sont ensuite torréfiés avec soin, en 
                        fonction de leur variété et origine. Ce processus 
                        déclenche des réactions chimiques, comme la 
                        Maillard, qui révèlent les arômes, et la caramé-
                        lisation des sucres. Les grains se dilatent et éclatent, 
                        libérant des saveurs riches et complexes. Chaque lot 
                        est surveillé pour garantir une torréfaction uniforme, 
                        permettant ainsi de révéler toute la palette 
                        aromatique du terroir d’origine.</p>
                    </div>
                </div>
            </Container>
        </div>
    )
}