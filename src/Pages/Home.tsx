import { Link } from "react-router-dom"
import ProductCard from "../Components/ProductCard"
import macbook from "../assets/macbook.jpg"

const Home = () => {

  const addToCarthandler =()=>{}

  return (
    <div className="home">
      <section></section>

      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>

      <main>
        <ProductCard
          productId="sajsd"
          name="Macbook"
          price={60000}
          stock={300}
          photo={macbook}
          handler={addToCarthandler}/>
      </main>

    </div>
  )
}

export default Home