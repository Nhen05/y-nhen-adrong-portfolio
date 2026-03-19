import React from 'react';
import 'devicon/devicon.min.css';  // Đảm bảo import local Devicon
import './Home.css'
const skills = [
  { name: "C++", className: "devicon-cplusplus-plain colored", color: "#004482" },
  { name: "C#", className: "devicon-csharp-plain colored", color: "#68217A" },
  { name: "Postman", className: "devicon-postman-plain colored", color: "#FF6C37" },
  { name: "Git", className: "devicon-git-plain colored", color: "#F05032" },
  { name: "GitHub", className: "devicon-github-plain colored", color: "#181717" },
  { name: "Ubuntu", className: "devicon-ubuntu-plain colored", color: "#DD4814" },
  { name: "MySQL", className: "devicon-mysql-plain colored", color: "#4479A1" },
  { name: "SQL Server", className: "devicon-microsoftsqlserver-plain colored", color: "#CC2927" },
  { name: "MongoDB", className: "devicon-mongodb-plain colored", color: "#47A248" },
  { name: "Node.js", className: "devicon-nodejs-plain colored", color: "#68A063" },
  { name: "TypeScript", className: "devicon-typescript-plain colored", color: "#3178C6" },
  { name: "Next.js", className: "devicon-nextjs-plain colored", color: "#000000" },
  { name: "HTML", className: "devicon-html5-plain colored", color: "#E34F26" },
  { name: "CSS", className: "devicon-css3-plain colored", color: "#1572B6" },
  { name: "JavaScript", className: "devicon-javascript-plain colored", color: "#F7DF1E" },
  { name: "Java", className: "devicon-java-plain colored", color: "#007396" },
  { name: "Bootstrap", className: "devicon-bootstrap-plain colored", color: "#7952B3" },
  { name: "Tailwind CSS", className: "devicon-tailwindcss-plain colored", color: "#38BDF8" },
  { name: "Python", className: "devicon-python-plain colored", color: "#3776AB" },
  { name: "Vue.js", className: "devicon-vuejs-plain colored", color: "#42B883" },
  { name: "Angular", className: "devicon-angularjs-plain colored", color: "#DD1B16" },
  { name: "Sass", className: "devicon-sass-plain colored", color: "#CC6699" },
  { name: "React.js", className: "devicon-react-plain colored", color: "#61DAFB" },
  { name: "npm", className: "devicon-npm-plain colored", color: "#CB3837" },
  { name: "AJAX", className: "devicon-javascript-plain colored", color: "#F7DF1E" },
  { name: "Redux", className: "devicon-redux-plain colored", color: "#764ABC" },
  { name: "Redux Toolkit", className: "devicon-redux-plain colored", color: "#764ABC" },
  { name: "MUI", className: "devicon-materialui-plain colored", color: "#0081CB" },
  { name: "CodeIgniter 4", className: "devicon-codeigniter-plain colored", color: "#EF4223" },
  { name: "Laravel", className: "devicon-laravel-plain colored", color: "#FF2D20" }
];

const SkillsSection = () => {
  return (
    <div className="home-content"> {/* Thêm class bao ngoài để dễ debug */}
      <div className="mb-5 text-center text-lg-start"> {/* Căn giữa trên mobile, căn trái trên desktop */}
        <h2 className="fw-bold display-5"> {/* Thêm display-5 cho tiêu đề nổi bật */}
          Hi, I'm Y Nhen Adrong
        </h2>

        <ul className="list-inline text-muted mb-3 justify-content-center justify-content-lg-start d-flex flex-wrap gap-2">
          <li className="list-inline-item">• Based in Dak Lak, Vietnam 🇻🇳</li>
          <li className="list-inline-item">• Open to onsite & remote opportunities</li>
        </ul>
        <p className="lead text-muted mx-auto mx-lg-0" style={{ maxWidth: '800px' }}>
          I am a web developer who works with both frontend and backend.
          I create modern and scalable web applications using React,
          Next.js, Node.js, CodeIgniter 4, Laravel, and TypeScript.
        </p>

        <p className="lead text-muted mx-auto mx-lg-0" style={{ maxWidth: '800px' }}>
          I also build websites with WordPress and develop desktop apps using C# WinForms.
          I create automation tools with Selenium and enjoy working with new technology,
          especially AI. I like creating images, making videos, and building useful tools
          to improve work and productivity.
        </p>
      </div>

      <hr />

      <div className="text-center text-lg-start mb-4 py-3">
        <h2 className="fw-bold mb-2">{'</>'} Skills</h2>
        <p className="text-muted small">
          My professional skills.
        </p>
      </div>

      {/* Căn giữa các icon skill trên mobile */}
      <div
        className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3 gap-md-4"
        style={{ maxWidth: '960px', margin: '0 auto' }}
      >
        {skills.map((skill, index) => (
          <div
            key={index}
            className="skill-item text-center position-relative"
          >
            <div
              className="skill-icon-circle rounded-circle d-flex align-items-center justify-content-center shadow mx-auto"
              style={{
                width: '60px',
                height: '60px',
                background: `linear-gradient(135deg, ${skill.color}55, ${skill.color}11)`,
                border: `2px solid ${skill.color}99`,
                transition: 'all 0.35s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.15) rotate(8deg)';
                e.currentTarget.style.boxShadow = `0 10px 25px ${skill.color}66`;
                e.currentTarget.parentElement.querySelector('p').style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
                e.currentTarget.parentElement.querySelector('p').style.opacity = '0';
              }}
            >
              <i className={skill.className} style={{ fontSize: '2rem' }} />
            </div>

            <p className="skill-name mt-2 mb-0 small fw-medium">
              {skill.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;