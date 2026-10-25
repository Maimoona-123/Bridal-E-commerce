
import { useState } from "react";
import { WHATSAPP_NUMBER } from "../../data/Product";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Dress Customization",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappNumber = String(WHATSAPP_NUMBER || "").replace(/\D/g, "");

    if (!whatsappNumber) {
      alert("Please configure your WhatsApp number in Product data.");
      return;
    }

    const message = `
Hello Chiffon! I have a new inquiry.

Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone || "Not provided"}
Inquiry Type: ${form.subject}

Message:
${form.message}
    `.trim();

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  };

  const whatsappNumber = String(WHATSAPP_NUMBER || "").replace(/\D/g, "");

  return (
    <main className="min-h-screen bg-[#fffaf4] text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#f9c92b]/20 via-white to-red-50 px-5 pt-36 pb-20 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-red-700">
          We're Here For You
        </p>

        <h1 className="font-serif text-4xl font-bold sm:text-6xl">
          Contact <span className="text-red-700">Chiffon</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-600">
          Have a question about an outfit or want a custom design?
          We'd love to help you find your perfect look.
        </p>
      </section>

      {/* Main Contact Section */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-2 lg:px-8">
        {/* Contact Information */}
        <div className="space-y-7">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-red-700">
              Get In Touch
            </p>

            <h2 className="mt-2 font-serif text-3xl font-bold">
              Let's Talk About Your Style
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              Contact us for dress inquiries, custom measurements,
              colors, embroidery, or order assistance.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* WhatsApp Card */}
            <a
              href={
                whatsappNumber
                  ? `https://wa.me/${whatsappNumber}`
                  : "#"
              }
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-red-300 hover:shadow-md"
            >
              <i className="ri-whatsapp-line text-2xl text-green-600" />

              <h3 className="mt-3 font-semibold">WhatsApp</h3>

              <p className="mt-1 text-sm text-gray-500">
                Chat with us about your order
              </p>
            </a>

            {/* Email Card */}
            <a
              href="mailto:your-email@example.com"
              className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-red-300 hover:shadow-md"
            >
              <i className="ri-mail-line text-2xl text-red-700" />

              <h3 className="mt-3 font-semibold">Email Us</h3>

              <p className="mt-1 break-words text-sm text-gray-500">
                your-email@example.com
              </p>
            </a>
          </div>

          {/* Google Map */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="p-5">
              <h3 className="font-semibold">
                <i className="ri-map-pin-line mr-2 text-red-700" />
                Find Us on the Map
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Find our location on Google Maps.
              </p>
            </div>

            <iframe
              title="Chiffon Boutique Location"
              src="https://maps.google.com/maps?q=Karachi%2C%20Pakistan&t=&z=12&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        {/* Contact Form */}
        <div className="h-fit rounded-3xl border border-gray-100 bg-white p-6 shadow-lg sm:p-9">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-700">
            Send An Inquiry
          </p>

          <h2 className="mt-2 font-serif text-3xl font-bold">
            We'd Love to Hear From You
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Fill out the form and your inquiry will open in WhatsApp,
            ready for you to send.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium"
              >
                Full Name *
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                required
                className="w-full rounded-xl border border-gray-200 bg-[#fffdf9] px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>

            {/* Email and Phone */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email Address *
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-[#fffdf9] px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+92..."
                  autoComplete="tel"
                  className="w-full rounded-xl border border-gray-200 bg-[#fffdf9] px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>
            </div>

            {/* Inquiry Type */}
            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium"
              >
                Inquiry Type *
              </label>

              <select
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-200 bg-[#fffdf9] px-4 py-3 outline-none transition focus:border-red-500"
              >
                <option>Dress Customization</option>
                <option>Order Inquiry</option>
                <option>Size and Measurements</option>
                <option>Delivery Information</option>
                <option>Other</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium"
              >
                Your Message *
              </label>

              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your requirements..."
                rows={5}
                required
                className="w-full resize-y rounded-xl border border-gray-200 bg-[#fffdf9] px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>

            {/* WhatsApp Submit */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-700 px-6 py-4 font-semibold text-white transition hover:bg-red-800"
            >
              <i className="ri-whatsapp-line text-xl" />
              Send Inquiry on WhatsApp
            </button>

            <p className="text-center text-xs leading-5 text-gray-500">
              Your message will open in WhatsApp. Press Send there to
              submit your inquiry.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
