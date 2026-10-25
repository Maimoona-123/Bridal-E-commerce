
import React, { useState } from "react";

const faqs = [
  {
    question: "How can I place an order?",
    answer:
      "You can explore our bridal collection, select your favorite outfit, and contact us through our available ordering options to place your order.",
  },
  {
    question: "Do you offer custom bridal dresses?",
    answer:
      "Customisation options depend on the design. Contact our team with your preferred style and requirements to discuss available options.",
  },
  {
    question: "How can I check the price of a dress?",
    answer:
      "Prices may vary depending on the design, fabric, and customisation. Contact us with the dress details to confirm its price.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery time depends on the outfit and your location. Please confirm the estimated delivery date with us before placing your order.",
  },
  {
    question: "Can I request changes to my order?",
    answer:
      "Please contact us as soon as possible if you need to change your order. Changes depend on the order's current preparation status.",
  },
  {
    question: "Can I return or exchange my outfit?",
    answer:
      "Return and exchange eligibility depends on our store policy and the type of order. Please contact us before ordering to confirm the applicable policy.",
  },
  {
    question: "How can I contact Chiffon?",
    answer:
      "You can visit our TikTok profile to explore our bridal inspiration and contact us through the available profile details.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-orange-50 to-white px-5 py-16 sm:px-8 sm:py-20">
      <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-red-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-4xl">
        {/* Heading */}
        <div className="mb-10 text-center sm:mb-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-white/80 px-4 py-2 text-sm font-semibold text-red-600">
            <i className="ri-question-answer-line text-lg" />
            We're Here to Help
          </span>

          <h2 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
            Frequently Asked{" "}
            <span className="text-red-600">Questions</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            Have questions about our bridal collection? Find answers to
            some of the most common questions below.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl border bg-white/90 transition-all duration-300 ${
                  isOpen
                    ? "border-red-200 shadow-lg shadow-red-100/40"
                    : "border-amber-100 shadow-sm hover:border-amber-200"
                }`}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(isOpen ? -1 : index)
                  }
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                        isOpen
                          ? "bg-red-50 text-red-600"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      <i className="ri-question-line text-lg" />
                    </span>

                    <span className="font-semibold text-gray-800 sm:text-lg">
                      {faq.question}
                    </span>
                  </span>

                  <i
                    className={`${
                      isOpen
                        ? "ri-subtract-line rotate-180 text-red-600"
                        : "ri-add-line text-gray-500"
                    } shrink-0 text-xl transition-transform duration-300`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:pl-[4.5rem] sm:pr-8">
                    <p className="border-l-2 border-red-200 pl-4 text-sm leading-7 text-gray-600 sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="mt-10 rounded-3xl border border-amber-100 bg-white/80 px-6 py-8 text-center sm:mt-12 sm:px-10">
          <i className="ri-chat-smile-3-line text-4xl text-red-600" />

          <h3 className="mt-3 text-xl font-bold text-gray-900 sm:text-2xl">
            Still Have Questions?
          </h3>

          <p className="mt-2 text-gray-600">
            Visit our TikTok profile for more bridal inspiration.
          </p>

          <a
            href="https://www.tiktok.com/@bridal175"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-red-700"
          >
            <i className="ri-tiktok-line text-xl" />
            Contact / Visit TikTok
            <i className="ri-arrow-right-line" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
