import Banner from "@/components/Homepage/banner/Banner"
import FeaturedProducts from "@/components/Homepage/featuredProducts/FeaturedProducts"
import Gallery from "@/components/Homepage/Gallery/Gallery"
import Testimonials from "@/components/Homepage/Testimonials/Testimonials"
import Footer from "@/components/Shared/Footer/Footer"


const Homepage = () => {
  return (
    <div>
      <Banner />
      <FeaturedProducts />
      <Gallery />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default Homepage