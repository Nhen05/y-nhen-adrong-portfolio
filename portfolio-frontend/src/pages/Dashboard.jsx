import React from 'react';
import './Dashboard.css';
import { AiOutlineBarChart, AiOutlineGithub } from "react-icons/ai";
import { SiWakatime, SiMonkeytype } from "react-icons/si";
import Chart from 'react-apexcharts';
import { GitHubCalendar } from 'react-github-calendar'; // Import thư viện GitHub Calendar
import { motion } from "framer-motion";

export default function Dashboard() {
  // Cấu hình biểu đồ ApexCharts
  const chartConfig = {
    series: [{
      name: 'Views',
      data: [9400, 12000, 6300, 8700]
    }],
    options: {
      chart: {
        type: 'bar',
        toolbar: { show: false },
        background: 'transparent'
      },
      colors: ['#ffcc00'],
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '55%',
        }
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: ['Sep', 'Oct', 'Nov', 'Dec'],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { colors: '#777' } }
      },
      yaxis: {
        labels: { style: { colors: '#777' } }
      },
      grid: {
        borderColor: '#222',
        strokeDashArray: 4,
      },
      tooltip: { theme: 'dark' }
    }
  };

return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="text-center text-md-start">
        <h2 className="fw-bold mb-2">Dashboard</h2>
        <p className="section-desc">
          My personal dashboard built with Node.js API routes, visualizing development statistics and contributions in real-time.
        </p>
      </div>

      <div className="dashed-line"></div>

      {/* --- Section: Web Analytics --- */}
      <div className="dashboard-section">
        <div className="section-header justify-content-center justify-content-md-start">
          <AiOutlineBarChart size={24} color="#ffcc00" />
          <h4 className="mb-0 fw-bold">Web Analytics</h4>
        </div>
        <p className="section-desc text-center text-md-start">Monitor real-time traffic and interactions from my portfolio site.</p>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Page Views</div>
            <div className="stat-value">31.615</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Visitors</div>
            <div className="stat-value">4.907</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Visits</div>
            <div className="stat-value">7.269</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Countries</div>
            <div className="stat-value">84</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Events</div>
            <div className="stat-value">2.761</div>
          </div>
        </div>

        <div className="chart-wrapper p-2 p-md-3" style={{ borderRadius: '12px', border: '1px solid #222' }}>
          <Chart
            options={chartConfig.options}
            series={chartConfig.series}
            type="bar"
            height={300}
          />
        </div>
      </div>

      {/* --- Section: GitHub --- */}
      <div className="dashboard-section mt-5">
        <div className="section-header justify-content-center justify-content-md-start">
          <AiOutlineGithub size={24} color="#ffcc00" />
          <h4 className="mb-0 fw-bold">GitHub Contributions</h4>
        </div>
        <p className="section-desc text-center text-md-start">My GitHub activity over the past year.</p>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total</div>
            <div className="stat-value">602</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">This week</div>
            <div className="stat-value">0</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Best</div>
            <div className="stat-value">50</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Average</div>
            <div className="stat-value">2 / day</div>
          </div>
        </div>

        <div className="chart-wrapper mt-3 p-4 github-calendar-container" style={{
          borderRadius: '12px',
          border: '1px solid #222',
          overflowX: 'auto', 
          display: 'flex',
          justifyContent: 'center'
        }}>
          <GitHubCalendar
            username="nhen05"
            colorScheme="dark"
            blockSize={13}
            blockMargin={5}
            fontSize={14}
          />
        </div>
      </div>

      {/* --- Section: WakaTime --- */}
      <div className="dashboard-section mt-5 mb-5">
        <div className="section-header d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-3">
          <SiWakatime size={22} color="#ffcc00" />
          <h4 className="mb-0 fw-bold">WakaTime Stats</h4>
        </div>

        <div className="wakatime-grid mb-3">
          <div className="stat-card">
            <div className="stat-label">Start Date</div>
            <div className="stat-value" style={{ fontSize: '1.1rem' }}>March 04, 2026</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">End Date</div>
            <div className="stat-value" style={{ fontSize: '1.1rem' }}>March 10, 2026</div>
          </div>
        </div>

        <div className="stat-card mb-3">
          <div className="stat-label">Top Languages</div>
          <div className="mt-3 lang-grid-wrapper">
            {[
              { n: "Javascript", p: 79 },
              { n: "TypeScript", p: 87 },
              { n: "Java", p: 31 },
              { n: "Python", p: 52 },
              { n: "React JS", p: 100 },
              { n: "CSS", p: 59 },
              { n: "C++", p: 12 }
            ].map((lang) => (
              <div className="language-item" key={lang.n} style={{ marginBottom: '12px' }}>
                <div className="d-flex justify-content-between mb-1">
                  <span className="lang-name" style={{ fontSize: '0.85rem', fontWeight: '500' }}>{lang.n}</span>
                  <span className="lang-percent" style={{ fontSize: '0.85rem', color: '#666' }}>{lang.p}%</span>
                </div>
                <div className="progress-container" style={{ height: '13px', background: '#222', borderRadius: '4px', overflow: 'hidden' }}>
                  <motion.div
                    className="progress-fill"
                    style={{ height: '100%', background: '#ffcc00', borderRadius: '4px' }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.p}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Section: Monkeytype --- */}
      <div className="dashboard-section mt-5">
        <div className="section-header d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-3">
          <SiMonkeytype size={22} color="#ffcc00" />
          <h4 className="mb-0 fw-bold">Monkeytype Stats</h4>
        </div>

        <div className="monkey-container">
          <div className="monkey-main-card">
            <div className="monkey-profile-box flex-column flex-sm-row text-center text-sm-start">
              <div className="monkey-avatar-container mx-auto mx-sm-0">
                <img src="avatar.jpg" alt="avatar" className="monkey-img" />
              </div>
              <div className="monkey-user-details">
                <h3 className="monkey-name">NhenDev</h3>
                <p className="monkey-sub">Joined 05 Apr 2022</p>
                <p className="monkey-sub">Current Streak: 4 days</p>
                <div className="monkey-level-bar justify-content-center justify-content-sm-start">
                  <span className="level-num">93</span>
                  <div className="level-progress"><div className="level-fill" style={{ width: '40%' }}></div></div>
                  <span className="level-xp">1715/4657</span>
                </div>
              </div>
            </div>

            <div className="monkey-general-stats mt-4 mt-lg-0">
              <div className="m-stat">
                <span className="m-label">Tests Started</span>
                <span className="m-value">2560</span>
              </div>
              <div className="m-stat">
                <span className="m-label">Tests Completed</span>
                <span className="m-value">987</span>
              </div>
              <div className="m-stat">
                <span className="m-label">Total Typing Time</span>
                <span className="m-value">10:07:47</span>
              </div>
            </div>
          </div>

          <div className="monkey-leaderboard-card">
            <span className="leader-title">All-Time English Leaderboard</span>
            <div className="leader-items">
              <div className="leader-item">
                <span className="m-sub-label">15 seconds <br /> <small>top 31.72%</small></span>
                <span className="m-value">154192nd <small className="m-unit">th</small></span>
              </div>
              <div className="leader-item text-end">
                <span className="m-sub-label">60 seconds <br /> <small>top 43.48%</small></span>
                <span className="m-value">207745th <small className="m-unit">th</small></span>
              </div>
            </div>
          </div>

          <div className="monkey-details-grid">
            <div className="monkey-detail-card">
              <div className="detail-row">
                <div className="d-box"><span className="m-label">15 time</span><span className="m-value">124</span><span className="m-sub">98%</span></div>
                <div className="d-box"><span className="m-label">30 time</span><span className="m-value">116</span><span className="m-sub">97%</span></div>
                <div className="d-box"><span className="m-label">60 time</span><span className="m-value">93</span><span className="m-sub">95%</span></div>
                <div className="d-box"><span className="m-label">120 time</span><span className="m-value">55</span><span className="m-sub">92%</span></div>
              </div>
            </div>
            <div className="monkey-detail-card">
              <div className="detail-row">
                <div className="d-box"><span className="m-label">10 words</span><span className="m-value">136</span><span className="m-sub">100%</span></div>
                <div className="d-box"><span className="m-label">25 words</span><span className="m-value">114</span><span className="m-sub">100%</span></div>
                <div className="d-box"><span className="m-label">50 words</span><span className="m-value">90</span><span className="m-sub">96%</span></div>
                <div className="d-box"><span className="m-label">100 words</span><span className="m-value">87</span><span className="m-sub">96%</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}