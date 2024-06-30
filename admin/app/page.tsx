"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ArrowRightIcon, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="w-full min-h-screen flex flex-col py-5 md:py-5 lg:py-5 bg-gradient-to-r from-[#7F1945] to-[#FFBE58] text-white">
        <div>
          <Link href="/">
            <Image
              src="/logo-r.png"
              alt="Nicolas Green Logistics"
              width={200}
              height={50}
              className="justify-center mx-auto"
            />
          </Link>
        </div>
        <div className="container grid md:grid-cols-2  items-center flex-grow">
        <div className="lg:hidden md:hidden  p-6">
          <Image
            src="/Young woman making an order in the online store.svg"
            width={400}
            height={400}
            sizes="200"
            alt="Data Analytics"
            className="mx-auto"
          />
          </div>
          <div className="space-y-2">
            <div className="flex justify-start items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Be our customer
                </h2>
              </div>
              <div className="hidden md:block p-6">
                <Image
                  src="/Arrow 11.png"
                  alt="arrow"
                  height={10}
                  width={100}
                  className="pt-[-5] iterm-right"
                />
              </div>
            </div>
            <p className="max-w-[600px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Experience the best delivery service with Nicolas Green Logistics.
              Sign up now to enjoy hassle-free deliveries, real-time tracking,
              and valuable insights into your delivery performance. Our app is
              always at your fingertips, giving you complete control and
              visibility. Start today and discover a smarter way to deliver!
            </p>
            <p className="fontsize-semibold">
              Feel free to download our app on your favorite app store!
            </p>
            <div className="flex gap-4">
              <Image
                src="/App Store.png"
                height={30}
                width={150}
                alt="apple store"
              />
              <Image
                src="/Google Play.png"
                height={30}
                width={150}
                alt="apple store"
              />
            </div>
          </div>
          <Image
            src="/Young woman making an order in the online store.svg"
            width={400}
            height={400}
            alt="Data Analytics"
            className="mx-auto hidden md:block"
          />
        </div>
        <div className="container grid md:grid-cols-2 gap-8 items-center mt-12 mb-10 flex-grow">
          <Image
            src="/683ae719-bc41-4dc8-994e-a158b6004bff.png"
            width={400}
            height={400}
            alt="Admin Dashboard"
            className="mx-auto"
          />
          <div className="space-y-4">
            <div className="flex justify-start items-center">
              <div className="hidden md:block p-6">
                <Image
                  src="/Arrow 12.png"
                  alt="arrow"
                  height={10}
                  width={100}
                  className="pt-[-5] iterm-right"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Be A Carrier
                </h2>
              </div>
            </div>
            <h3 className="text-xl font-semibold">
              Hit the road and drive your way to success with Nicolas Green
              Logistics!
            </h3>
            <p className="max-w-[600px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join our team of elite drivers and carriers today and start
              earning like a pro! Our app makes it easy to manage your
              deliveries, track your performance, and optimize your routes for
              maximum efficiency.
            </p>
            <h3 className="text-xl font-semibold">
              Sign up now and get ready to:
            </h3>
            <div className="ml-5">
              <li>Boost your income with competitive rates</li>
              <li>Choose your own schedule and routes</li>
              <li>Enjoy the freedom of the open road</li>
              <li>Stay connected with our user-friendly app</li>
              <li>Grow your business with our support</li>
            </div>
            <p className="max-w-[600px] font-semibold text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              To Sign up as a carrier, download our app from your favorite store
              and start driving with Nicolas Green Logistics today!
            </p>

            <div className="flex gap-4">
              <Image
                src="/App Store.png"
                height={30}
                width={150}
                alt="apple store"
              />
              <Image
                src="/Google Play.png"
                height={30}
                width={150}
                alt="apple store"
              />
            </div>
          </div>
        </div>
      </section>
      <footer className="container p-5 flex flex-wrap justify-center items-center gap-5 bg-[#7F1945]/70 text-sm text-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 w-full">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <Link className="flex items-center" href="#">
              Faq <ChevronRight size={15} />
            </Link>
            <Link className="flex items-center" href="#">
              Terms <ChevronRight size={15} />
            </Link>
            <Link className="flex items-center" href="#">
              Privacy <ChevronRight size={15} />
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <h2>Are you an admin?</h2>
            <Link
              className=" bg-[#FFBE58] text-gray-100 rounded-xl px-4 hover:text-gray-200"
              href="/login"
            >
              {" "}
              Login As Admin
            </Link>
          </div>
        </div>
        <div className="flex flex-col w-full mt-4">
          <div className="text-center ">
            <p className="text-sm">
              {" "}
              Copyright © 2024 Nicolas Green Logistics All right reserved | made
              by <a href="inosoft.tech"></a>Inosoft.tech
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
