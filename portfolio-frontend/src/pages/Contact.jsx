import React, { useState, useEffect } from "react";
import "./Contact.css";
import * as SiIcons from "react-icons/si";
import { FiArrowUpRight } from "react-icons/fi";
import { Toaster,toast } from "react-hot-toast";
import emailjs from "@emailjs/browser";

const Contact = () => {

  const SERVICE_ID = "service_i3ovium";
  const TEMPLATE_ID = "template_u45hlp6";
  const PUBLIC_KEY = "G-ZvenokD_Wc7z_dR";

  const socialData = [
    {
      id: 1,
      title: "Stay in Touch",
      desc: "Reach out via email for inquiries or collaborations.",
      label: "gmail",
      iconName: "SiGmail",
      link: "mailto:nhen.developer@gmail.com",
      class: "card-gmail",
    },
    {
      id: 2,
      title: "Connect with me",
      desc: "Let's be friends on social media.",
      label: "facebook",
      iconName: "SiFacebook",
      link: "https://facebook.com/hennrynhut",
      class: "card-facebook",
    },
    {
      id: 3,
      title: "Watch Content",
      desc: "Watch my latest videos and tutorials.",
      label: "youtube",
      iconName: "SiYoutube",
      link: "https://youtube.com/@sapauu4443",
      class: "card-youtube",
    },
    {
      id: 4,
      title: "Explore the Code",
      desc: "Explore my open-source work.",
      label: "github",
      iconName: "SiGithub",
      link: "https://github.com/Nhen05",
      class: "card-github",
    },
    {
      id: 5,
      title: "Join the Fun",
      desc: "Watch engaging and fun content.",
      label: "tiktok",
      iconName: "SiTiktok",
      link: "https://tiktok.com/@nhen2kar5gamer",
      class: "card-tiktok",
    },
  ];

  const LOCK_TIME = 24 * 60 * 60 * 1000;

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const lastSend = localStorage.getItem("contact_last_send");

    if (lastSend) {
      const diff = Date.now() - Number(lastSend);

      if (diff < LOCK_TIME) {
        setIsLocked(true);
      }
    }
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const errors = [];

  if (isLocked) {
    errors.push("You can send another message after 24 hours.");
  }

  if (!form.name.trim()) {
    errors.push("Please enter your name");
  }

  if (!form.email.trim()) {
    errors.push("Please enter your email");
  } else if (!validateEmail(form.email)) {
    errors.push("Invalid email format");
  }

  if (!form.message.trim()) {
    errors.push("Please enter your message");
  }

  // nếu có lỗi -> show tất cả
  if (errors.length > 0) {
    errors.forEach((err) => toast.error(err));
    return;
  }

  const templateParams = {
    name: form.name,
    email: form.email,
    message: form.message,
  };

  emailjs
    .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
    .then(() => {
      toast.success("Message sent successfully!");

      localStorage.setItem("contact_last_send", Date.now());
      setIsLocked(true);

      setForm({
        name: "",
        email: "",
        message: "",
      });
    })
    .catch(() => {
      toast.error("Failed to send message. Try again later.");
    });
};

  const RenderIcon = ({ name, size = 20 }) => {
    const IconComponent = SiIcons[name];
    if (!IconComponent) return null;
    return <IconComponent size={size} />;
  };

  return (
    <div className="contact-container container">
      <Toaster

        position="topLeft"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1e1e1e",
            color: "#fff",
            borderRadius: "10px",
            padding: "12px 16px",
          },
        }}
      />
      <h2 className="fw-bold mb-2">Contact</h2>
      <p className="section-desc">Let's get in touch.</p>
      <hr className="dashed-hr" />

      <h6 className="mb-4">Find me on social media</h6>

      <div className="row g-4">
        {socialData.map((item) => (
          <div key={item.id} className={item.id === 1 ? "col-12" : "col-md-6"}>
            <div className={`social-card ${item.class}`}>
              <div className="bg-icon-blur">
                <RenderIcon name={item.iconName} size={250} />
              </div>

              <div className="card-content">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>

                <a href={item.link} target="_blank" rel="noreferrer" className="btn-action">
                  Go to <span className="text-muted ms-1">{item.label}</span>{" "}
                  <FiArrowUpRight className="ms-1" />
                </a>
              </div>

              <div className="icon-badge">
                <RenderIcon name={item.iconName} size={30} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="contact-form-section mt-5 pt-4">
        <h5 className="mb-4">Or send me a message</h5>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="form-control custom-input text-muted"
                placeholder="Name"
                disabled={isLocked}
              />
            </div>

            <div className="col-md-6">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="form-control custom-input text-muted"
                placeholder="Email"
                disabled={isLocked}
              />
            </div>

            <div className="col-12">
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="form-control custom-input text-muted"
                rows="4"
                placeholder="Message"
                disabled={isLocked}
              />
            </div>

            <div className="col-12 text-end">
              <button type="submit" className="btn-send" disabled={isLocked}>
                {isLocked ? "Message Sent (Try again in 24h)" : "Send Message"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;