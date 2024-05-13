import type { AppProps } from "next/app";
import { globalStyles } from "../styles/global";

import { Container, Header } from "../styles/pages/app";
import logoImg from '../assets/logo.svg'
import Image from "next/image";

globalStyles()
//o global styles fica fora do App para que os estilos globais não recarreguem a cada mudança/atualisação de página
export default function App({ Component, pageProps }: AppProps) {
  return(
    <Container>
      <Header>
        <Image src={logoImg} alt="" />
      </Header>
      <Component {...pageProps}/>
    </Container>  
  )
}
