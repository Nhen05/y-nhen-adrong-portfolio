export default function AchievementCard({ data }) {
  return (
    <div className="card bg-dark text-light border-secondary">

      <img
        src={data.image}
        className="card-img-top"
        alt=""
      />

      <div className="card-body">

        <h5>{data.title}</h5>

        <p className="text-muted">
          {data.org}
        </p>

      </div>

    </div>
  )
}