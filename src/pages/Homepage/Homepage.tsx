import Banner from "@/components/Homepage/banner/Banner"
import FeaturedProducts from "@/components/Homepage/featuredProducts/FeaturedProducts"
import Gallery from "@/components/Homepage/Gallery/Gallery"
import Footer from "@/components/Shared/Footer/Footer"


const Homepage = () => {
  return (
    <div>
      <Banner />
      <FeaturedProducts />
      <Gallery />
      <Footer />
    </div>
  )
}

export default Homepage