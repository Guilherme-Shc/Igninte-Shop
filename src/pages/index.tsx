import Image from "next/image"
import { HomeContainer, Product } from "../styles/pages/home"
import Head from 'next/head'

import {useKeenSlider} from 'keen-slider/react'

import camiseta1 from '../assets/camisetas/1.png'
import camiseta2 from '../assets/camisetas/2.png'
import camiseta3 from '../assets/camisetas/3.png'

import 'keen-slider/keen-slider.min.css'
import Stripe from "stripe"
import { stripe } from "../lib/stripe"
import { GetStaticProps } from "next"

interface HomeProps {
  products:{
    id: string
    name: string
    imageUrl: string
    price: string
  }[]//os colchetes são para transformar em array e o map funcionar
}


export default function Home({products}: HomeProps) {

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map(product => {
        return(
          <Product href={`/product/${product.id}`} key={product.id} className="keen-slider__slide" prefetch={false}>
            <Image src={product.imageUrl} width={520} height={480} alt=""/>

            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        )
      })}
    </HomeContainer>
    </>
  );
}

export const getStaticProps:GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;

    return{
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style:'currency',
        currency: 'BRL'
      }).format(price.unit_amount! / 100),
      //o preço vem em centavos por isso é dividido por 100
    }
  })


  return{
    props: {
      products
    },
    revalidate: 60*60*2,//=2horas
  }
}