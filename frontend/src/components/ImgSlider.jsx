
import Slider from "react-slick";
import styled from "styled-components";

import image1 from "./images/slider-badag.jpg"

const ImgSlider = () => {
  return (
    <div>
      <Carousel
        dots={true}
        infinite={true}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        autoplay={true}
      >
        <Wrap>
          <a>
            <img src={image1} alt="" />
          </a>
        </Wrap>

        <Wrap>
          <a>
            <img src="/images/slider-scale.jpg" alt="" />
          </a>
        </Wrap>

        <Wrap>
          <a>
            <img src="/images/slider-badag.jpg" alt="" />
          </a>
        </Wrap>

        <Wrap>
          <a>
            <img src="/images/slider-scales.jpg" alt="" />
          </a>
        </Wrap>
      </Carousel>
    </div>
  );
};

export default ImgSlider;

const Carousel = styled(Slider)`
  padding: 0 50px;
  margin-top: 20px;

  @media (max-width: 768px) {
    padding: 0 10px;
  }

  
  & > button {
    opacity: 0;
    height: 100px;
    width: 5vw;
    z-index: 1;
    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }
  ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }
  li.slick-active button:before {
    color: white;
  }
  .slick-list {
    overflow: initial;
  }
  .slick-prev {
    left: 5px;
  }
  .slick-next {
    right: 5px;
  }
`;

const Wrap = styled.div`
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  a {
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    display: block;
    position: relative;
    padding: 4px;
    img {
      width: 100px;
      height: 100px;
    }
    &:hover {
      padding: 0;
      border: 4px solid rgba(249, 249, 249, 0.8);
      transition-duration: 300ms;
    }
  }
  @media (max-width: 768px) {
    a {
      img {
        height: 170px;

        object-fit: cover;
        object-position: 100%;
      }
    }
  }
`;