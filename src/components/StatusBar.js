import React from 'react'

const StatusBar = ({orders}) => {
    const orderTypeCounts = {
        "Cancelled": 0,
        "Pending": 0,
        "In Progress": 0,
        "Fulfilled": 0,
    };
    orders.forEach(order => {
        if (order.cancelled) {
            orderTypeCounts.Cancelled = orderTypeCounts.Cancelled + 1;
        } else {
            if (order.pending) orderTypeCounts.Pending = orderTypeCounts.Pending + 1;
            if (order.in_progress) orderTypeCounts['In Progress'] = orderTypeCounts['In Progress'] + 1; //TODO: unknown if this is correct
            if (order.fulfilled) orderTypeCounts.Fulfilled = orderTypeCounts.Fulfilled + 1; //TODO: unknown if this is correct
        }
    });
    return (
        <div className="status-bar">{
            Object.keys(orderTypeCounts).map(orderType => (
                <div className="status-bar__status" key={orderType}>
                    <span className="status-bar__status__type">{orderType}: </span>
                    <span className="status-bar__status__count">{orderTypeCounts[orderType]}</span>
                </div>
            ))
        }</div>
    );
}
export default StatusBar;