const StatusBadge = ({ status }) => {
  const colorMap = {
    Pending: "bg-yellow-600",
    Shipped: "bg-blue-600",
    Delivered: "bg-green-600",
    Cancelled: "bg-red-600",
  };
  return (
    <span className={`px-2 py-1 text-xs rounded-full text-white ${colorMap[status]}`}>{status}</span>
  );
};
export default StatusBadge