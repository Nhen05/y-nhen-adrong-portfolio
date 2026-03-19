import { AiOutlineBook, AiFillTrophy, AiOutlineCalendar } from "react-icons/ai";
import './About.css';
const About = () => {
  const educationData = [
    {
      school: "Tay Nguyen Polytechnic College (TNPC)",
      major: "Information Technology",
      rank: "Excellent Student",
      gpa: "3.80/4.00",
      duration: "2023 - 2026", // 2005 + 18 tuổi vào năm 2023
      location: "Buon Ma Thuot, Dak Lak, VN",
      logo: "education-tnpc.png"
    },
    {
      school: "Cu M'gar High School",
      major: "General Education",
      rank: "Good Student",
      gpa: "8.5/10",
      duration: "2020 - 2023",
      location: "Cu M'gar, Dak Lak, VN",
      logo: "education-thpt.png" // Bạn thay tên file ảnh vào đây
    },
    {
      school: "Ea Tul Secondary School",
      major: "Secondary Education",
      rank: "Good Student",
      gpa: "8.0/10",
      duration: "2016 - 2020",
      location: "Ea Tul, Dak Lak, VN",
      logo: "education-thcs.png"
    },
    {
      school: "Phan Chu Trinh Primary School",
      major: "Primary Education",
      rank: "Excellent Student",
      gpa: "",
      duration: "2011 - 2016",
      location: "Dak Lak, VN",
      logo: "education-th.png"
    }
  ];
  const ageHandle = (birth) => {
    const birthDay = new Date(birth)
    const today = new Date();
    //  năm hiện tại trừ cho năm sinh
    let age = today.getFullYear() - birthDay.getFullYear()
    //  tháng hiện tại trừ cho tháng sinh
    const monthDiff = today.getMonth - birthDay.getMonth();
    //  nếu tháng sau khi từ lớn hơn 0 hoặc tháng sau khi tính bằng 0 và ngày hiện tại trừ cho ngày sinh nhập 
    if (monthDiff > 0 || monthDiff === 0 && today.getDate() < birthDate.getDate()) {
      --age;
    }
    return age;
  }

  return (
    <div className="about-page text-light">
      {/* Phần giới thiệu - Căn giữa trên mobile */}
      <div className="text-center text-lg-start">
        <h2 className="fw-bold">About Me</h2>
        <p className="text-muted mb-4">
          A brief introduction to who I am.
        </p>
        <hr style={{ border: '1px dashed', opacity: 0.3 }} />

        <div className="about-content lead text-muted">
          <p>
            Hello ! My name is <strong>Y Nhen Adrong</strong> but you can call me Hennry Nhut that my nickname. I'm {ageHandle("2005-02-17")} Years Old. I'm a Web Developer from Buon Ma Thuot City, Dak Lak, Vietnam.
            I’m passionate about building web applications and continuously learning new technologies.
          </p>
          <p>
            I enjoy turning ideas into real applications and solving problems through code.
          </p>
          <p>
            My goal is to keep learning, build meaningful products, and become a professional full-stack developer in the future.
          </p>
        </div>

        {/* Chữ ký - Căn giữa trên mobile */}
        <div className="my-4 about-signature-container mx-auto mx-lg-0" style={{ width: 180, height: 80 }}>
          <img src="signature.png" alt="signature" className="h-100 w-100 object-fit-contain" />
        </div>
      </div>

      <hr />

      {/* Section Education */}
      <div className="mt-5">
        <h3 className="fw-bold mb-3 d-flex align-items-center justify-content-center justify-content-lg-start gap-2">
          <AiOutlineBook /> Education
        </h3>
        <p className="text-muted text-center text-lg-start">
          My educational journey.
        </p>

        <div className="education-section mt-4">
          {educationData.map((edu, index) => (
            <div className="edu-card-custom shadow-sm mb-3" key={index}>
              {/* Logo */}
              <div className="edu-logo-box">
                <img
                  src={edu.logo}
                  alt={`${edu.school} Logo`}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/65'; }}
                />
              </div>

              {/* Nội dung text */}
              <div className="edu-text-content flex-grow-1 text-center text-md-start">
                <h5 className="edu-info-title mb-1">
                  {edu.school}
                </h5>

                <div className="edu-info-details justify-content-center justify-content-md-start">
                  <span>{edu.major}</span>
                  <span className="edu-dot d-none d-md-inline">•</span>
                  <span>{edu.rank}</span>
                  {edu.gpa && (
                    <>
                      <span className="edu-dot d-none d-md-inline">•</span>
                      <span>GPA: {edu.gpa}</span>
                    </>
                  )}
                </div>

                <div className="edu-info-sub justify-content-center justify-content-md-start">
                  <span>{edu.duration}</span>
                  <span className="mx-2 text-secondary">•</span>
                  <span>{edu.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;