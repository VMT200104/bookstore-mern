import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-center mb-12">About Us</h1>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-gray-600 leading-relaxed">
                Welcome to BookStore, your premier destination for literary treasures. 
                Founded with a passion for books and a commitment to spreading knowledge, 
                we've been serving book lovers since 2020. Our carefully curated collection 
                spans across all genres, ensuring there's something for every reader.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                We believe in the transformative power of reading. Our mission is to make 
                quality books accessible to everyone, foster a love for reading, and build 
                a community of passionate readers. We strive to provide not just books, 
                but gateways to new worlds and perspectives.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-12"
      >
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
                <p className="text-gray-600">Thousands of books across all genres</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Quality Service</h3>
                <p className="text-gray-600">Dedicated customer support team</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                <p className="text-gray-600">Quick and reliable shipping</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default About;
