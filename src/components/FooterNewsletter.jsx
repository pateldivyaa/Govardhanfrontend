import React from "react";
import { Link } from "lucide-react";

export default function FooterNewsletter() {
  return (
    <footer className="bg-[#f5f7fa] pt-16 text-black relative overflow-hidden">

      <div className="bg-orange-600 rounded-2xl max-w-4xl mx-auto p-8 px-10 text-white shadow-md relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold">Subscribe Newsletter</h2>
        <p className="text-sm mt-2">
          Sign up for newsletter to receive special offers and exclusive news about Botanica products
        </p>

        <div className="mt-6 flex flex-col md:flex-row items-center gap-4">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="w-full md:w-2/3 p-3 rounded-full text-black outline-none"
          />
          <button className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition">
            SUBSCRIBE
          </button>
        </div>

        <img src="/images/newsletter.png" className="absolute top-6 right-10" alt="decor" />
      </div>

      <div className="mt-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        
        <div className="border-2 rounded-3xl py-2 px-3 bg-orange-600">
          <h3 className="font-bold  text-lg text-white">Govardhan</h3>
          <p className="mt-3 text-sm text-white">
            Tuesday – Saturday: 12:00pm – 23:00pm <br />
            <span className="text-white font-semibold">Closed on Sunday</span>
          </p>
          <p className="mt-3 text-sm text-white">
            5 star rated on TripAdvisor
          </p>
        </div>

        <div>
          <h4 className="font-bold text-md border-b-4 border-orange-600 inline-block mb-3">About</h4>
          <ul className="space-y-1 text-sm">
            <a href="/about"><li>› About</li></a>
            <a href="/menu"><li>› Menu</li></a>
            <a href="/order"><li>› Order</li></a>
            <a href="/contact"><li>› Contact</li></a>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-md border-b-4 border-orange-600 inline-block mb-3">Menu</h4>
          <ul className="space-y-1 text-sm">
            <a href="/menu"><li>› Lasshi</li></a>
            <a href="/menu"><li>› Milk Shake</li></a>
            <a href="/menu"><li>› Gujarati Chat</li></a>
            <a href="/menu"><li>› Sweets</li></a>
            <a href="/menu"><li>› Panjabi</li></a>
            <a href="/menu"><li>› Khatiyavadi</li></a>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-md border-b-4 border-orange-600 inline-block mb-3">Newsletter</h4>
          <p className="text-sm mb-2">Get recent news and updates.</p>
          <input
            type="text"
            placeholder="Email Address"
            className="w-full p-2 rounded-md border text-sm mb-2"
          />
          <button className="bg-orange-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-700 transition">
            Subscribe
          </button>

          <a href="/admin/adminlogin"><button className="ms-5 bg-orange-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-700 transition">
            Admin
          </button>

          </a>
        </div>
      </div>

      <div className="mt-12 border-t pt-4 border-gray-300 text-sm flex flex-col md:flex-row justify-between items-center px-6 text-gray-700">
        <p>© 2025 <span className="text-orange-600 font-semibold">TasteNest</span> | All shawanetc3 Themes</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:underline">Facebook</a>
          <a href="#" className="hover:underline">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
