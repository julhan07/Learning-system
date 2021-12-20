function CardStatistic(props) {
    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">{props.icon}</div>
                    <div className="col-md-6 text-end">
                        <span class="badge bg-danger">{props.count}</span>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">{props.label}</div>
                </div>
            </div>
        </div>
    );
}

export default CardStatistic;
