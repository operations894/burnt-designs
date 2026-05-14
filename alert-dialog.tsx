import Navigation from '../sections/Navigation'
import Hero from '../sections/Hero'
import Products from '../sections/Products'
import Configurator from '../sections/Configurator'
import Signs from '../sections/Signs'
import OrderForm from '../sections/OrderForm'
import CustomerService from '../sections/CustomerService'
import Footer from '../sections/Footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Products />
        <Signs />
        <Configurator />
        <OrderForm />
      </main>
      <Footer />
      <CustomerService />
    </>
  )
}