import React from "react";
import {
  MapPin,
  Phone,
  Clock,
  Mail,
} from "lucide-react";

export default function About() {
  return (
    <div className="bg-orange-50 min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-64 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/delicious-food-table_23-2150857814.jpg?ga=GA1.1.1086018748.1736231792&semt=ais_hybrid&w=740')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">About Us</h1>
          <p className="text-white">Discover the story behind Govardhan Thal</p>
        </div>
      </div>

      {/* Notice */}
      <div className="container-custom pt-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 text-center text-sm text-yellow-800">
          Please note: The images displayed alongside our menu items are for illustration and reference purposes only.
          Actual dishes may vary in appearance. We appreciate your understanding. Thank you!
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="md:w-1/2">
                <img
                  src="/images/about.png"
                  alt="Restaurant Founder"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>

              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  Govardhan Thal began as a humble dream in 1990 moved from Kadi, Gujarat (India) to Singapore. Bringing
                  generations-old recipes and a passion for authentic Gujarati cuisine, they established what has now
                  become one of the most beloved Gujarati restaurants in the area.
                </p>
                <p className="text-gray-700 mb-4">
                  The name "Govardhan" is inspired by the sacred Govardhan hill in India, symbolizing abundance and
                  nourishment—values we bring to every plate we serve.
                </p>
                <p className="text-gray-700">
                  Our mission is simple: to provide an authentic taste of Gujarat through carefully crafted dishes made
                  with traditional methods and the finest ingredients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Visit Us</h2>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Contact Info */}
              <div className="md:w-1/2 space-y-6">
                <div className="flex items-start">
                  <MapPin size={24} className="text-orange-600 mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Address</h3>
                    <p className="text-gray-700">470 Serangoon Road, Singapore 218143</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock size={24} className="text-orange-600 mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Opening Hours</h3>
                    <p className="text-gray-700">Every Day: 8 AM to 11 PM</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone size={24} className="text-orange-600 mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Phone</h3>
                    <p className="text-gray-700">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail size={24} className="text-orange-600 mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Email</h3>
                    <p className="text-gray-700">info@govardhanthal.com</p>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href="/booktable"
                    className="inline-block py-3 px-6 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                  >
                    Book a Table
                  </a>
                </div>
              </div>

              {/* Actual Map */}
              <div className="md:w-1/2">
                <div className="h-full w-full overflow-hidden rounded-lg shadow-md">
                  <iframe
                    title="Govardhan Thal Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.811107884424!2d103.85366227496595!3d1.3123671616707335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19a8bafdd7e3%3A0x6b40b5de65812e30!2s470%20Serangoon%20Rd%2C%20Singapore%20218143!5e0!3m2!1sen!2ssg!4v1694343421877!5m2!1sen!2ssg"
                    width="100%"
                    height="350"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
