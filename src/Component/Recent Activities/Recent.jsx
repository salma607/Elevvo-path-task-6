import AccessTimeIcon from "@mui/icons-material/AccessTime";

// Example avatars/colors/icons (customize as needed)
const activities = [
  {
    avatar: <span className="w-7 h-7 rounded-full bg-lime-100 flex items-center justify-center"><img src="https://avatars.githubusercontent.com/u/1?v=4" alt="" className="w-5 h-5" /></span>,
    title: "Creative Corner",
    details: "1 Member | 2 Tasks",
    time: "8 Days"
  },
  {
    avatar: <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="" className="w-7 h-7 rounded-full object-cover" />,
    title: "Masendro Illustration",
    details: "3 Members | 14 Tasks",
    time: "8 Days"
  },
  {
    avatar: <span className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">ST</span>,
    title: "Space Template",
    details: "2 Members | 24 Tasks",
    time: "8 Days"
  },
  {
    avatar: <span className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold">MI</span>,
    title: "Milana Illustration",
    details: "3 Members | 14 Tasks",
    time: "8 Days"
  }
];

export default function Recent() {
  return (
    <div className="fixed right-2 m-5 ">
      <div className="bg-white rounded-xl shadow p-5 max-w-md w-80">
        <div className="flex justify-between items-center mb-3">
          <span className="font-semibold text-lg">Active Projects</span>
          <a href="#" className="text-blue-500 text-sm font-medium hover:underline">See All</a>
        </div>
        <div>
          {activities.map((item, idx) => (
            <div key={idx} className="flex items-center py-3 border-b last:border-b-0">
              {item.avatar}
              <div className="ml-3 flex-1">
                <div className="font-medium text-gray-900">{item.title}</div>
                <div className="text-xs text-gray-500">{item.details}</div>
              </div>
              <div className="flex items-center text-gray-400 text-xs">
                <AccessTimeIcon style={{ fontSize: 18, marginRight: 4 }} />
                {item.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}