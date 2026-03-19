export const iconSkills = [
  { name: "C++", className: "devicon-cplusplus-plain colored", color: "#004482" },
  { name: "C#", className: "devicon-csharp-plain colored", color: "#68217A" },
  { name: "Postman", className: "devicon-postman-plain colored", color: "#FF6C37" },
  { name: "Git", className: "devicon-git-plain colored", color: "#F05032" },
  { name: "GitHub", className: "devicon-github-plain colored", color: "#181717" },
  { name: "Ubuntu", className: "devicon-ubuntu-plain colored", color: "#DD4814" },
  { name: "MySQL", className: "devicon-mysql-plain colored", color: "#4479A1" },
  { name: "SQL Server", className: "devicon-microsoftsqlserver-plain colored", color: "#CC2927" },
  { name: "MongoDB", className: "devicon-mongodb-plain colored", color: "#47A248" },
  { name: "Node js", className: "devicon-nodejs-plain colored", color: "#68A063" },
  { name: "TypeScript", className: "devicon-typescript-plain colored", color: "#3178C6" },
  { name: "Next.js", className: "devicon-nextjs-plain colored", color: "#FFFFFF" },
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
  { name: "React js", className: "devicon-react-original colored", color: "#61DAFB" },
  { name: "Redux", className: "devicon-redux-plain colored", color: "#764ABC" },
  { name: "Laravel", className: "devicon-laravel-plain colored", color: "#FF2D20" },
  { name: "Go", className: "devicon-go-original-wordmark colored", color: "#00ADD8" },
  { name: "Firebase", className: "devicon-firebase-plain colored", color: "#FFCA28" },
  { name: "Docker", className: "devicon-docker-plain colored", color: "#2496ED" },
  { name: "Firebase", className: "devicon-firebase-plain colored", color: "#FFCA28" },
  { name: "Docker", className: "devicon-docker-plain colored", color: "#2496ED" },
  { name: "WordPress", className: "devicon-wordpress-plain colored", color: "#21759B" },
  { name: "PHP", className: "devicon-php-plain colored", color: "#777BB4" },
  { name: "CodeIgniter 4", className: "devicon-codeigniter-plain colored", color: "#EF4223" },
  { name: "CI4", className: "devicon-codeigniter-plain colored", color: "#EF4223" },
  { name: "Axios", className: "devicon-axios-plain colored", color: "#5A29E4" },
];

// Hàm helper để lấy thông tin icon dựa trên tên từ API
export const getIcon = (techName) => {
  return iconSkills.find(
    (icon) => icon.name.toLowerCase() === techName.toLowerCase()
  );
};