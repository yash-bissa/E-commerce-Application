import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';


const Product = () => {

  const {productId} = useParams();
  const {products,currency} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('')

  const fetchProductData = async () => {
    products.map((item)=>{
      if (item._id == productId) {
        setProductData(item)
        setImage(item.image[0])
        return null
      }
    })
  }

  useEffect(()=>{
    fetchProductData()
  },[productId,products]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,index)=>(
                <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>

          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto' alt="" />
          </div>    

        </div>

        {/* --------Product Info------ */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className='pl-2'>(122)</p>
          </div>
            <p className='mt-5 text-xl font-medium'>{currency}{productData.price}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
            <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p>
              <div className='flex gap-2'>
                {productData.sizes.map((item,index)=>(
                  <button onClick={()=>setSize(item)} className={`border-2 py-2 px-4 bg-gray-200 ${item === size ? 'bg-orange-500' : ''}`} key={index}>{item}</button>
                ))}
              </div>
            </div>

            <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-600'>ADD TO CART</button>
            <hr className='mt-8 sm:w-4/5' />
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% original product</p>
              <p>Cash on delivery is available on this product </p>
              <p>Easy return and exchange policy within 7 days</p>
            </div>
        </div>

      </div>

      {/* -----Description & Review Section---------- */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 text-sm '>Description</b>
          <p className='border px-5 text-sm '>Reviews(122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Redefine your daily basics with our Essential Oversized Tee. Crafted from 100% premium organic cotton, this shirt offers a relaxed, breathable fit that holds its shape from your morning coffee to evening gatherings. Designed with a classic crew neck and drop-shoulder silhouette, it’s the ultimate foundation for any modern wardrobe.</p>
          <p>Model is 5'9" wearing a size Medium. Our clothing follows standard international sizing; if you prefer a tighter fit, we recommend sizing down. For detailed measurements, please refer to our Size Guide</p>
          <p>Upgrade your wardrobe today with this versatile piece. Bold fashion starts here with high-quality materials and a thoughtful fit that is easy to love. Refresh your look today with a design that reflects modern cultural attitudes and timeless style.</p>
        </div>
      </div>

      {/* -----Dispplay related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product