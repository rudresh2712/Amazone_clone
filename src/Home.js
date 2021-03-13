import React from 'react'
import './Home.css'
import Product from './Product.js'

// const url="https://inteng-storage.s3.amazonaws.com/img/iea/9lwjAzlK6E/sizes/amazon-hist-header_resize_md.jpg"
//Home page cover url
const url="https://www.wallpaperup.com/uploads/wallpapers/2014/10/30/499943/ee9b7385c0b153d5b5c3f17914752076-700.jpg"

const img_url="https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg"
//Remote image url

function Home() {
    return (
        <div className="home">
            
            <div className="home__container">
                <img 
                className="home__image"
                    src={url}
                    alt=""
                />
                {/* the image url was not working */}

                <div className="home__row">
                    <Product title="the lean startup" price={29.99}
                     img={img_url} rating={4}/>
                    <Product title="the lean startup" price={29.99}
                     img={img_url} rating={4}/>
                </div>

                
                <div className="home__row">
                <Product title="the lean startup" price={29.99}
                     img={img_url} raing={4}/>
                     <Product title="the lean startup" price={29.99}
                     img={img_url} rating={4}/>
                    <Product title="the lean startup" price={29.99}
                     img={img_url} rating={4}/>
                    
                </div>

                
                <div className="home__row">
                    <Product title="the lean startup" price={29.99}
                     img={img_url} rating={4}/>
                    
                </div>
            </div>
        </div>
    )
}

export default Home
