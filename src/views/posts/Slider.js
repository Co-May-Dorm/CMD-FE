import React from 'react'
import { Carousel, Image } from 'react-bootstrap'

const Slider = () => {
    // Hàm lấy đường dẫn tất cả ảnh năm trong một folder
    const importAllImages = (r) => {
        let images = []
        r.keys().map(item => {
            images.push(r(item))
        })
        return images
    }
    const images = importAllImages(require.context('../../assets/images/cmd-images', false, /\.(png|jpe?g|svg)$/))
    return (
        <Carousel>
            {images.map((image, index) => (
                <Carousel.Item key={index}>
                    <Image
                        className="d-block w-100"
                        style={{
                            height: "50vh"
                        }}
                        src={image}
                        alt={"Image " + index}
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    )
}
export default Slider
