import React from 'react'
import Carousel from 'react-material-ui-carousel'
import "./Banner.css"

const data = [
    "https://www.shutterstock.com/shutterstock/photos/2182861533/display_1500/stock-vector-book-festival-concept-of-a-little-girl-sailing-the-boat-and-reading-an-open-huge-book-fantasy-and-2182861533.jpg",
    "https://www.shutterstock.com/shutterstock/photos/2127230852/display_1500/stock-vector-book-exchange-landing-page-template-or-bookcrossing-vector-illustration-banner-education-and-2127230852.jpg",
    "https://www.shutterstock.com/shutterstock/photos/557138818/display_1500/stock-photo-various-old-books-on-a-shelf-on-dark-background-banner-557138818.jpg",
    "https://www.shutterstock.com/shutterstock/photos/2299693591/display_1500/stock-vector-young-woman-opening-a-huge-open-book-surrounding-the-many-flowers-leaves-plants-back-to-school-2299693591.jpg",
    // "https://rukminim1.flixcart.com/flap/1680/280/image/8d4150cc4f3f967d.jpg?q=50",
    // "https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50",
    // "https://rukminim1.flixcart.com/fk-p-flap/1680/280/image/46240cf187ba33af.jpeg?q=50",
    // "https://rukminim1.flixcart.com/fk-p-flap/1680/280/image/695c3f2c3e58d89b.jpg?q=50",
    // "https://rukminim1.flixcart.com/fk-p-flap/1680/280/image/cc813f341ff2ae7d.jpg?q=50"
]


const Banner = () => {
  return (
    <>

            <Carousel
                className="carasousel"
                autoPlay={true}
                animation="slide"
                indicators={false}
                navButtonsAlwaysVisible={true}
                cycleNavigation={true}
                navButtonsProps={{
                    style: {
                        background: "#fff",
                        color: "#494949",
                        borderRadius: 0,
                        marginTop: -22,
                        height: "104px",
                    }
                }}>
                {
                    data.map((imag, i) => {
                        return (
                            <>
                                <img src={imag} alt="img" key={i} className="banner_img" />
                            </>
                        )
                    })
                }

            </Carousel>
        </>
  )
}

export default Banner
 